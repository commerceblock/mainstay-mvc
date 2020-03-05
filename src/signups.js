#!/usr/bin/env node
const fs = require('fs');
const nodemailer = require('nodemailer');
const axios = require('axios');
const mongoose = require('mongoose');
const env = require('../src/env');
const models = require('../src/models/models');

function connect_mongo() {
    let url = 'mongodb://';
    if (env.db.user && env.db.password) {
        url += env.db.user + ':' + env.db.password;
    }
    url = url + '@' + env.db.address + ':' + env.db.port + '/' + env.db.database;
    mongoose.connect(url, {useNewUrlParser: true});
    return mongoose.connection;
}

async function send_kyc(signup) {
    const new_kyc = await axios.post(env.kyc.url,
        {
            first_name: signup.first_name,
            last_name: signup.last_name,
            email: signup.email,
        }, {
            headers: {
                'Authorization': 'Token token=' + env.kyc.token,
                'Content-Type': 'application/json'
            },
        });

    const id = new_kyc.data.id;

    await axios.post(env.kyc.url + id + '/checks',
        {
            type: 'standard',
            reports: [
                {
                    name: 'document'
                },
                {
                    name: 'facial_similarity',
                    variant: 'standard'
                }
            ]
        }, {
            headers: {
                'Authorization': 'Token token=' + env.kyc.token,
                'Content-Type': 'application/json'
            },
        });

    return id;
}

/**
 * send email
 * @param signup
 * @returns {Promise<unknown>}
 */
function send_signup_email(signup) {
    return new Promise((resolve, reject) => {
        fs.readFile('./src/view/emails/sugnup/index.html', (error, html) => {
            if (error) {
                reject(error);
            } else {
                resolve(html);
            }
        });
    }).then((html) => {
        return html.replace('$$NAME$$', signup.first_name + ' ' + signup.last_name);
    }).then((html) => {
        return new Promise((resolve, reject) => {
            nodemailer.createTransport(env.mail_server.smtp).sendMail({
                from: {
                    name: 'Mainstay Support',
                    address: 'support@mainstay.xyz'
                },
                to: signup.email,
                subject: 'MainStay - Thank you for signing up! Here are the next steps',
                html: html,
            }, (error, info) => {
                if (error) {
                    return reject(error);
                }
                console.log('email sent to ' + signup.email);
                resolve(info);
            });
        });
    }).catch(error=>{
        console.log('error while sending an email to ' + signup.email);
        console.error(error);
    });
}

async function do_work() {
    const db = connect_mongo();
    mongoose.set('debug', false);

    db.on('disconnected', (ref) => {
        console.log('Connection with database lost');
        process.exit(1);
    });
    db.on('error', console.error.bind(console, 'Connection Error:'));
    db.once('open', () => {
        // First process and client signups stuck on "start_kyc"
        // TODO - Can do this on the UI for now

        // Then poll the clientSignup collection for new signups
        setInterval(async () => {
            try {
                const signup = await models.clientSignup.findOneAndUpdate({status: 'new'}, {status: 'start_kyc'});

                if (signup) {
                    console.log('New signup found: ' + signup.first_name + ' ' + signup.last_name);

                    // send email
                    await send_signup_email(signup);

                    const kyc_id = await send_kyc(signup);
                    console.log('KYC id: ' + kyc_id);

                    signup.status = 'sent_kyc';
                    signup.kyc_id = kyc_id;
                    await signup.save();
                }
            } catch (error) {
                console.error(error);
                process.exit(1);
            }

        }, 1000);
    });
}

do_work();
