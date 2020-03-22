#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const axios = require('axios');
const mongoose = require('mongoose');
const env = require('../src/env');
const models = require('../src/models/models');

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('debug', false);

const ONFIDO_REQUEST_HEADERS = {
    'Authorization': 'Token token=' + env.kyc.token,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};
const ONFIDO_URL = env.kyc.url;
const CHECKS_INTERVAL = 1000;

const getDb = (function() {
    let db = connect_mongo();
    return () => {
        return db;
    };
})();

/**
 * np need to wait db-connection open
 * as mongoose adds queries in the queue and starts execute on open
 */
function connect_mongo() {
    let url = 'mongodb://';
    if (env.db.user && env.db.password) {
        url += env.db.user + ':' + env.db.password;
    }
    url = url + '@' + env.db.address + ':' + env.db.port + '/' + env.db.database;
    mongoose.connect(url, {useNewUrlParser: true});
    const db = mongoose.connection;
    db.on('disconnected', (ref) => {
        console.log('Connection with database lost');
        process.exit(1);
    });
    db.on('error', () => {
        console.error.bind(console, 'Connection Error:');
        process.exit(1);
    });
    db.once('open', async () => {
        console.log('MongoDB Connection opened.');
    });
    return db;
}

async function send_kyc(signup) {
    const applicantResponse = await axios.post(ONFIDO_URL,
        {
            first_name: signup.first_name,
            last_name: signup.last_name,
            email: signup.email,
        }, {
            headers: ONFIDO_REQUEST_HEADERS,
        });

    const applicant = applicantResponse.data;

    await axios.post(ONFIDO_URL + applicant.id + '/checks',
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
            ],
            // consider: ['document', 'facial_similarity']
        }, {
            headers: ONFIDO_REQUEST_HEADERS,
        });

    return applicant;
}

async function check_kyc_status(signup) {
    // make onfido request to check status
    const checkResponse = await axios.get(`${ONFIDO_URL}/${signup.kyc_id}/checks`,
        {
            headers: ONFIDO_REQUEST_HEADERS,
        });

    let check = checkResponse.data;
    if (checkResponse.data.checks !== undefined) {
        check = checkResponse.data.checks[0];
    }

    if (check.status !== 'complete') {
        return null;
    }

    if (check.result === 'clear') {
        signup.status = 'kyc_ok';
    }
    if (check.result === 'consider') {
        signup.status = 'kyc_fail';
    }
    return await signup.save();
}

/**
 * create email transport
 * @returns {*}
 */
function get_mail_transport() {
    return nodemailer.createTransport(env.mail_server.smtp);
}

/**
 * send email
 * @param signup
 * @returns {Promise<unknown>}
 */
function send_signup_email(signup) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, './view/emails/signup/client.html'), 'utf8', (error, html) => {
            if (error) {
                reject(error);
            } else {
                resolve(html);
            }
        });
    }).then((html) => {

        const cbLogo = {
            filename: 'logo-commerce-block',
            path: path.resolve(__dirname, '../public/logo-commerce-block.png'),
            cid: 'logo-commerce-block.png',
            contentType: 'image/png'
        };
        const msLogo = {
            filename: 'logo-main-stay',
            path: path.resolve(__dirname, '../public/logo-main-stay.png'),
            cid: 'logo-main-stay.png',
            contentType: 'image/png'
        };

        html = html.replace('$$NAME$$', signup.first_name + ' ' + signup.last_name);
        html = html.replace('$$COMMERCE-BLOCK-LOGO-URL$$', `cid:${cbLogo.cid}`);
        html = html.replace('$$MAIN-STAY-LOGO-URL$$', `cid:${msLogo.cid}`);

        return new Promise((resolve, reject) => {
            get_mail_transport().sendMail({
                from: {
                    name: 'Mainstay Support',
                    address: 'support@mainstay.xyz'
                },
                to: signup.email,
                subject: 'MainStay - Thank you for signing up! Here are the next steps',
                html: html,
                attachments: [cbLogo, msLogo],
            }, (error, info) => {
                if (error) {
                    return reject(error);
                }
                console.log('email sent to ' + signup.email);
                resolve(info);
            });
        });
    }).catch(error => {
        console.log('error while sending an email to ' + signup.email);
        console.error(error);
    });
}

/**
 * send email
 * @param user
 * @returns {Promise<unknown>}
 */
function send_new_signup_mail(user) {
    const html = `
        <b>First Name</b>: ${user.first_name}<br>
        <b>Last Name</b>: ${user.last_name}<br>
        <b>Email</b>: ${user.email}<br>
        ${user.company ? `<b>Company</b>: ${user.company}<br>` : ''}
        ${user.pubkey ? `<b>Public Key</b>: ${user.pubkey}<br>` : ''}
    `;

    return new Promise((resolve, reject) => {
        get_mail_transport().sendMail({
            from: {
                name: env.mail_server.smtp.from_name,
                address: env.mail_server.smtp.from_address
            },
            to: env.sign_up.admin_email,
            subject: 'New SignUp',
            html: html,
        }, (error, info) => {
            if (error) {
                return reject(error);
            }
            resolve(info);
        });
    });
}

async function start_kyc(signup) {
    console.log('New signup found: ' + signup.first_name + ' ' + signup.last_name);

    // send email to admin
    await send_new_signup_mail(signup);
    // send email
    await send_signup_email(signup);

    const applicant = await send_kyc(signup);
    const kycId = applicant.id;

    console.log('KYC id: ' + kycId);

    signup.status = 'sent_kyc';
    signup.kyc_id = kycId;
    await signup.save();
}

async function do_work() {
    // First process and client signups stuck on "start_kyc"
    // TODO - Can do this on the UI for now

    // Then poll the clientSignup collection for new signups
    setInterval(async () => {
        try {
            const signup = await models.clientSignup.findOneAndUpdate({status: 'new'}, {status: 'start_kyc'});

            if (signup) {
                await start_kyc(signup);
            }
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }, 1000);
}

async function do_applicant_checks() {
    setInterval(async () => {
        try {
            const signups = await models.clientSignup.find({status: 'sent_kyc'});
            for (const signup of signups) {
                if (signup.kyc_id) {
                    await check_kyc_status(signup);
                } else {
                    console.log(`${signup._id} has no kyc_id.`);
                }
            }
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }, CHECKS_INTERVAL);
}

do_work();
// do_applicant_checks();
