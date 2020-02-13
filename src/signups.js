#!/usr/bin/env node
const axios = require('axios')
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
    new_kyc =  await axios.post(env.kyc.url,
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

    id = new_kyc.data.id;

    await axios.post(env.kyc.url + id + '/checks',
        {
            type: "standard",
            reports: [
                {
                    name: "document"
                },
                {
                    name: "facial_similarity",
                    variant: "standard"
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

async function do_work() {
    const db = connect_mongo();
    mongoose.set('debug', false);
    db.on('disconnected', function (ref) {
        console.log('Connection with database lost');
        process.exit(1);
    });
    db.on('error', console.error.bind(console, 'Connection Error:'));
    db.once('open', () => {
        // First process and client signups stuck on "start_kyc"
        // TODO - Can do this on the UI for now

        // Then poll the clientSignup collection for new signups
        setInterval(async function() {
            try {
                signup = await models.clientSignup.findOneAndUpdate(
                    { status: 'new' }, { status: 'start_kyc'});
                if (signup) {
                    console.log('New signup found: ' + signup.first_name
                        + ' ' + signup.last_name);

                    kyc_id = await send_kyc(signup);
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
