#!/usr/bin/env node
const axios = require('axios');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const env = require('../src/env');
const models = require('../src/models/models');
const EmailHelper = require('./helpers/email-helper');

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('debug', false);

const ONFIDO_REQUEST_HEADERS = {
    'Authorization': 'Token token=' + env.kyc.token,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};
const ONFIDO_URL = env.kyc.url;
const START_KYC_INTERVAL = 1000;
const PAYMENT_OK_WORK_INTERVAL = 1000;
const CHECKS_INTERVAL = 60000; // one minute

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
        signup.code = uuidv4();
        // send verification success email
        await EmailHelper.sendOnfidoVerificationSuccessEmail(signup);
    }
    if (check.result === 'consider') {
        signup.status = 'kyc_fail';
    }
    return await signup.save();
}

async function start_kyc(signup) {
    console.log('New signup found: ' + signup.first_name + ' ' + signup.last_name);

    // send email to admin
    await EmailHelper.sendNewSignupMail(signup);
    // send email
    await EmailHelper.sendSignupEmail(signup);

    const applicant = await send_kyc(signup);
    const kycId = applicant.id;

    console.log('KYC id: ' + kycId);

    signup.status = 'sent_kyc';
    signup.kyc_id = kycId;
    await signup.save();
}

async function create_slot(signup) {
    // fetch item with max client_position
    const maxPositionClientDetails = await models.clientDetails
        .findOne()
        .sort({client_position: -1})
        .limit(1);

    let nextClientPosition;
    if (maxPositionClientDetails === null) {
        nextClientPosition = 0;
    } else {
        nextClientPosition = maxPositionClientDetails.client_position + 1;
    }
    const publicKey = '';
    const level = '';
    // create new client-detail
    const clientDetailsData = {
        client_position: nextClientPosition,
        auth_token: uuidv4(),
        client_name: `${signup.first_name} ${signup.last_name}`,
        pubkey: publicKey,
        service_level: level
    };
    const clientDetails = new models.clientDetails(clientDetailsData);
    await clientDetails.save();

    // create client-commitment
    const clientCommitmentData = {
        client_position: clientDetails.client_position,
        commitment: '0000000000000000000000000000000000000000000000000000000000000000',
        count: 0
    };
    const clientCommitment = new models.clientCommitment(clientCommitmentData);
    await clientCommitment.save();

    signup.status = 'slot_ok';
    await signup.save();

    await EmailHelper.sendPaymentOkEmail(signup, clientCommitment, clientDetails);
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
    }, START_KYC_INTERVAL);
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

async function do_payment_ok_work() {
    setInterval(async () => {
        try {
            const signup = await models.clientSignup.findOneAndUpdate({status: 'payment_ok'}, {status: 'start_slot'});
            if (signup) {
                await create_slot(signup);
            }
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }, PAYMENT_OK_WORK_INTERVAL);
}

do_work();
do_applicant_checks();
do_payment_ok_work();
