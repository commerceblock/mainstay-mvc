const elliptic = require('elliptic');
const dateFormat = require('dateformat');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const fs = require('fs');
const nodemailer = require("nodemailer");
const fileType = require('file-type');

const models = require('../models/models');
const {isValidEmail} = require('../utils/validators');

const ec = new elliptic.ec('secp256k1');

const {
    VALUE,
    PARAM_UNDEFINED,
    TYPE_ERROR,
    INTERNAL_ERROR_API,
    TYPE_UNKNOWN
} = require('../utils/constants');

const {
    start_time,
    reply_err,
    reply_msg,
} = require('../utils/controller_helpers');

module.exports = {
    ctrl_latest_attestation: async (req, res) => {

        res.header('Access-Control-Allow-Origin', '*');

        const response = {'data': []};

        const page = parseInt(req.query.page, 10) || 1;
        const limit = 20;
        const start = !page ? 0 : limit * (page - 1);

        // set confirmed only filter unless failed flag is set to true
        const confirmedFilter = req.query.failed ? (req.query.failed === 'true' ? {} : {confirmed: true}) : {confirmed: true};

        try {
            const [count, data] = await Promise.all([
                models.attestation.countDocuments({confirmed: true}),
                models.attestation
                    .find(confirmedFilter)
                    .sort({inserted_at: -1})
                    .limit(limit)
                    .skip(start)
                    .exec(),
            ]);

            response['total'] = count;
            response['pages'] = Math.ceil(count / limit);
            response['limit'] = limit;

            const now = new Date();

            response['data'] = data.map(item => ({
                    txid: item.txid,
                    merkle_root: item.merkle_root,
                    confirmed: item.confirmed,
                    age: (now.toDateString() === item.inserted_at.toDateString()) ? dateFormat(item.inserted_at, 'HH:MM:ss') : dateFormat(item.inserted_at, 'HH:MM:ss dd/mm/yy')
                }
            ));

            res.json(response);

        } catch (error) {
            res.json({error: 'api', message: error.message});
        }
    },

    ctrl_latest_attestation_info: async (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');


        try {
            const data = await models.attestationInfo
                .find()
                .sort({time: -1})
                .limit(10)
                .exec();

            const response = data.map(item => ({
                txid: item.txid,
                blockhash: item.blockhash,
                amount: item.amount,
                time: item.time
            }));

            res.json(response);
        } catch (error) {
            res.json({error: 'api', message: error.message});
        }
    },

    ctrl_latest_commitment: async (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');

        const response = [];

        try {
            const data = await models.attestation
                .find({confirmed: true})
                .sort({inserted_at: -1})
                .limit(1)
                .exec();

            if (data.length === 0) {
                return res.json(response);
            }

            const merkleCommitmentData = await models.merkleCommitment
                .find({merkle_root: data[0].merkle_root})
                .exec();

            for (let itr = 0; itr < merkleCommitmentData.length; ++itr) {
                response.push({
                    position: merkleCommitmentData[itr].client_position,
                    merkle_root: merkleCommitmentData[itr].merkle_root,
                    commitment: merkleCommitmentData[itr].commitment,
                });
            }
            res.json(response);
        } catch (error) {
            res.json({error: 'api', message: error.message});
        }
    },

    ctrl_send_commitment: (req, res) => {
        let rawRequestData = '';
        req.on('data', chunk => {
            rawRequestData += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const payload = JSON.parse(rawRequestData);
                if (payload.position === undefined) {
                    return res.json({error: 'position'});
                }
                if (payload.token === undefined) {
                    return res.json({error: 'token'});
                }
                if (payload.commitment === undefined) {
                    return res.json({error: 'commitment'});
                }

                const data = await models.clientDetails.find({client_position: payload.position});
                if (data.length === 0) {
                    return res.json({error: 'position'});
                }
                if (data[0].auth_token !== payload.token) {
                    return res.json({error: 'token'});
                }
                if (data[0].pubkey && data[0].pubkey != "") {
                    if (payload.signature === undefined) {
                        return res.json({error: 'signature'});
                    }
                    try {
                        // get pubkey hex
                        const pubkey = ec.keyFromPublic(data[0].pubkey, 'hex');

                        // get base64 signature
                        const sig = Buffer.from(payload.signature, 'base64');

                        if (!ec.verify(payload.commitment, sig, pubkey)) {
                            return res.json({error: 'signature'});
                        }
                    } catch (error) {
                        return res.json({error: 'signature', message: error.message});
                    }
                }
                await models.clientCommitment.findOneAndUpdate({client_position: payload.position}, {commitment: payload.commitment}, {upsert: true});
                return res.send();

            } catch (error) {
                res.json({error: 'api', message: error.message});
            }
        });
    },

    ctrl_client_signup: async (req, res) => {

        const payload = req.body;

        if (!payload.full_name || !payload.full_name.trim()) {
            return res.status(400).json({error: 'full_name'});
        }
        if (!payload.address || !payload.address.trim()) {
            return res.status(400).json({error: 'address'});
        }
        if (!payload.email || !payload.email.trim() && !isValidEmail(payload.email.trim())) {
            return res.status(400).json({error: 'email'});
        }
        if (!payload.pubkey || !payload.pubkey.trim()) {
            return res.status(400).json({error: 'pubkey'});
        }
        if (!req.file) {
            return res.status(400).json({error: 'image'});
        }

        payload.full_name = payload.full_name.trim();
        payload.address = payload.address.trim();
        payload.email = payload.email.trim();
        payload.pubkey = payload.pubkey.trim();

        try {
            const pubkey = ec.keyFromPublic(payload.pubkey, 'hex');
            const {result, reason} = pubkey.validate();
            if (!result) {
                return res.status(400).json({
                    error: 'pubkey',
                    message: reason
                });
            }

            // check true file type using magic number
            const fileTypeStream = await fileType.stream(fs.createReadStream(req.file.path));
            if (!['image/jpeg', 'image/png'].includes(fileTypeStream.fileType.mime)) {
                return res.status(400).json({
                    error: 'img',
                    message: 'Wrong file type. Only jpeg and png files allowed.'
                });
            }

            // get user by emil to check if user already logged in
            const userByEmail = await models.clientSignup.findOne({email: payload.email});
            if (userByEmail) {
                return res.status(400).json({
                    error: 'api',
                    message: 'User already exists with this email.'
                });
            }

            // upload image to grid-fs
            const image = await saveFileInGridFs(req.file.path, {
                content_type: fileTypeStream.fileType.mime,
                filename: req.file.filename,
                metadata: {
                    ext: fileTypeStream.fileType.ext
                }
            });
            // save user
            const user = await models.clientSignup.create({
                full_name: payload.full_name,
                address: payload.address,
                email: payload.email,
                public_key: payload.pubkey,
                img: image._id,
            });

            sendNewSignUpEmail(user, image, req.file.path);
            // send the response
            res.status(201).send({user});
        } catch (error) {
            res.status(500).json({error: 'api', message: error.message});
        }
    },


    ctrl_type: (req, res) => {
        const startTime = start_time();
        const paramValue = req.query[VALUE];
        if (paramValue === undefined) {
            return reply_err(res, PARAM_UNDEFINED, startTime);
        } else if (/[0-9A-Fa-f]{64}/g.test(paramValue)) {
            return find_type_hash(res, paramValue, startTime);
        } else if (/^\d+$/.test(paramValue)) {
            return find_type_number(res, paramValue, startTime);
        }
        reply_err(res, TYPE_ERROR, startTime);
    },

};

/**
 * save file in the monogdb gridfs
 * @param path
 * @param data
 * @returns {Promise<any>}
 */
function saveFileInGridFs(path, data) {
    Grid.mongo = mongoose.mongo;
    const gridFs = Grid(mongoose.connection.db);

    const fileData = {
        mode: 'w',
        ...data
    };

    return new Promise((resolve, reject) => {
        const writeStream = gridFs.createWriteStream(fileData);
        fs.createReadStream(path).pipe(writeStream);
        writeStream.on('close', resolve);
        writeStream.on("error", reject);
    });
}

/**
 * create email transport
 * @param service transport service. i.e. gmail, sendmail
 * work in progress
 *
 * @returns {*}
 */
function getMailTransport(service) {
    let transporter;
    transporter = nodemailer.createTransport({
        sendmail: true,
        newline: 'unix',
        path: '/usr/sbin/sendmail'
    });

    return transporter;
}

function sendNewSignUpEmail(user, image, imagePath) {
    const env = require('../../src/env');

    const transporter = getMailTransport('gmail');

    const html = `
        <b>Full Name</b>: ${user.full_name},<br>
        <b>Email</b>: ${user.email},<br>
        <b>Address</b>: ${user.address},<br>
        <b>Image</b>: <img src="cid:${image.md5}"/>
    `;

    return new Promise((resolve, reject) => {
        transporter.sendMail({
            from: {
                name: user.full_name,
                address: user.email
            },
            to: env.sign_up.admin_email,
            subject: 'New SignUp',
            html: html,
            attachments: [{
                filename: image.filename,
                path: imagePath,
                cid: image.md5,
                contentType: image.contentType
            }],
        }, (error, info) => {
            if (error) {
                return reject(error);
            }
            resolve(info);
        });
    });
}

async function find_type_hash(res, paramValue, startTime) {
    try {
        let data;
        data = await models.merkleProof.find({commitment: paramValue});
        if (data.length !== 0) {
            return reply_msg(res, 'commitment', startTime);
        }
        data = await models.merkleProof.find({merkle_root: paramValue});
        if (data.length !== 0) {
            return reply_msg(res, 'merkle_root', startTime);
        }
        data = await models.attestationInfo.find({txid: paramValue});
        if (data.length !== 0) {
            return reply_msg(res, 'txid', startTime);
        }
        data = await models.attestationInfo.find({blockhash: paramValue});
        if (data.length !== 0) {
            return reply_msg(res, 'blockhash', startTime);
        }
        reply_err(res, TYPE_UNKNOWN, startTime);
    } catch (error) {
        return reply_err(res, INTERNAL_ERROR_API, startTime);
    }
}

async function find_type_number(res, paramValue, startTime) {
    try {
        const data = await models.clientDetails.find({client_position: paramValue});
        if (data.length !== 0) {
            return reply_msg(res, 'position', startTime);
        }
        reply_err(res, 'Not found', startTime);
    } catch (error) {
        return reply_err(res, INTERNAL_ERROR_API, startTime);
    }
}
