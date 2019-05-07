const models = require('../models/models');
const elliptic = require('elliptic');
const dateFormat = require('dateformat');

const ec = new elliptic.ec('secp256k1');

const {
    SIGNATURE_INVALID,
    VALUE,
    PARAM_UNDEFINED,
    TYPE_ERROR
} = require('../utils/constants');

const {
    start_time,
    reply_err,
    find_type_hash,
    find_type_number
} = require('../utils/controller_helpers');

module.exports = {
    ctrl_latest_attestation: (req, res) => {
        let response = {'data': []};

        let page = parseInt(req.query.page, 10);
        let limit = 20;
        let start = limit * (page - 1);

        if (!page) {
            start = 0;
        }

        // set confirmed only filter unless failed flag is set to true
        const confirmedFilter = req.query.failed ? (req.query.failed === 'true' ? {} : {confirmed: true}) : {confirmed: true}

        models.attestation.countDocuments({confirmed: true}, function (error, count) {
            response['total'] = count;
            response['pages'] = count / limit;
            response['limit'] = limit;

            models.attestation
                .find(confirmedFilter)
                .sort({inserted_at: -1})
                .limit(limit)
                .skip(start)
                .exec((error, data) => {
                    if (error) {
                        return; // TODO Add message error
                    }
                    res.header('Access-Control-Allow-Origin', '*');

                    const now = new Date();

                    for (let itr = 0; itr < data.length; ++itr) {
                        response['data'].push({
                            txid: data[itr].txid,
                            merkle_root: data[itr].merkle_root,
                            confirmed: data[itr].confirmed,
                            age: (now.toDateString() === data[itr].inserted_at.toDateString()) ?
                                dateFormat(data[itr].inserted_at, 'HH:MM:ss') : dateFormat(data[itr].inserted_at, 'HH:MM:ss dd/mm/yy')
                        });
                    }
                    res.json(response);
                });
        });

    },

    ctrl_latest_attestation_info: (req, res) => {
        const response = [];
        models.attestationInfo
            .find()
            .sort({time: -1})
            .limit(10)
            .exec((error, data) => {
                if (error) {
                    return; // TODO Add message error
                }
                res.header('Access-Control-Allow-Origin', '*');
                for (let itr = 0; itr < data.length; ++itr) {
                    response.push({
                        txid: data[itr].txid,
                        blockhash: data[itr].blockhash,
                        amount: data[itr].amount,
                        time: data[itr].time
                    });
                }
                res.json(response);
            });
    },

    ctrl_latest_commitment: (req, res) => {
        const response = [];
        models.attestation
            .find()
            .sort({inserted_at: -1})
            .limit(1)
            .exec((error, data) => {
                if (error) {
                    return; // TODO Add message error
                }
                if (data.length > 0) {
                    models.merkleCommitment
                        .find({merkle_root: data[0].merkle_root})
                        .exec((error, data) => {
                            if (error) {
                                return; // TODO Add message error
                            }
                            res.header('Access-Control-Allow-Origin', '*');
                            for (let itr = 0; itr < data.length; ++itr) {
                                response.push({
                                    position: data[itr].client_position,
                                    merkle_root: data[itr].merkle_root,
                                    commitment: data[itr].commitment,
                                });
                            }
                            res.json(response);
                        });
                }
            });
    },

    ctrl_send_commitment: (req, res) => {
        let rawRequestData = '';
        req.on('data', chunk => {
            rawRequestData += chunk.toString();
        });

        req.on('end', () => {
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
            if (payload.signature === undefined) {
                return res.json({error: 'signature'});
            }

            models.clientDetails.find({client_position: payload.position}, (error, data) => {
                if (data === undefined || data.length === 0) {
                    return res.json({error: 'position'});
                }
                if (error) {
                    return res.json({error: 'api'});
                }
                if (data[0].auth_token !== payload.token) {
                    return res.json({error: 'token'});
                }
                try {
                    // get pubkey hex
                    let pubkey = ec.keyFromPublic(data[0].pubkey, 'hex');

                    // get base64 signature
                    let sig = Buffer.from(payload.signature, 'base64')

                    if (!ec.verify(payload.commitment, sig, pubkey)) {
                        return res.json({error: 'signature'});
                    }

                    models.clientCommitment.findOneAndUpdate({client_position: payload.position}, {commitment: payload.commitment}, {upsert: true}, (error) => {
                        if (error) {
                            return res.json({error: 'api'});
                        }
                        return res.send();
                    });
                } catch (e) {
                    return res.json({error: SIGNATURE_INVALID});
                }
            });
        });
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