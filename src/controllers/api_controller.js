const models = require('../models/models');
const elliptic = require('elliptic');
const {base64decode} = require('nodejs-base64');
const dateFormat = require('dateformat');

const ec = new elliptic.ec('secp256k1');

const {
    VERSION_API_V1,
    INTERNAL_ERROR_API,
    POSITION_UNKNOWN,
    COMMITMENT_POSITION_UNKNOWN,
    MERKLEROOT_UNKNOWN,
    BAD_ARG_PAYLOAD,
    MISSING_ARG_PAYLOAD,
    MAINSTAY_PAYLOAD,
    MAINSTAY_SIGNATURE,
    MISSING_PAYLOAD_COMMITMENT,
    MISSING_PAYLOAD_POSITION,
    MISSING_ARG_SIGNATURE,
    MISSING_PAYLOAD_TOKEN,
    PAYLOAD_TOKEN_ERROR,
    SIGNATURE_INVALID,
} = require('../utils/constants');

const {
    get_hash_arg,
    get_txid_arg,
    get_commitment_arg,
    get_merkle_root_arg,
    get_position_arg,
    start_time,
    reply_err,
    reply_msg,
} = require('../utils/controller_helpers');

const DATE_FORMAT = 'HH:MM:ss dd/mm/yy';

module.exports = {
    index: (req, res) => {
        let startTime = start_time();
        reply_msg(res, VERSION_API_V1, startTime);
        console.log("qaq");
    },

    latest_attestation: (req, res) => {
        let startTime = start_time();
        models.attestation
            .find()
            .sort({inserted_at: -1})
            .limit(1)
            .exec((error, data) => {
                if (error) {
                    return reply_err(res, INTERNAL_ERROR_API, startTime);
                }
                if (data.length === 0) {
                    return reply_msg(res, {}, startTime);
                }
                reply_msg(res, {merkle_root: data[0].merkle_root, txid: data[0].txid}, startTime);
            });
    },

    latest_commitment: (req, res) => {
        let startTime = start_time();
        let position = get_position_arg(req, res, startTime);
        if (position === undefined) {
            return;
        }

        models.attestation
            .find()
            .sort({inserted_at: -1}).limit(1)
            .exec((error, data) => {
                if (error) {
                    return reply_err(res, INTERNAL_ERROR_API, startTime);
                }
                if (data.length === 0) {
                    return reply_msg(res, {}, startTime);
                }
                const txid = data[0].txid;
                const merkle_root = data[0].merkle_root;
                models.merkleCommitment.find({
                    client_position: position,
                    merkle_root: merkle_root
                }, (error, data) => {
                    if (error) {
                        return reply_err(res, INTERNAL_ERROR_API, startTime);
                    }
                    if (data.length === 0) {
                        return reply_err(res, POSITION_UNKNOWN, startTime);
                    }
                    reply_msg(res, {
                        commitment: data[0].commitment,
                        merkle_root: merkle_root,
                        txid: txid
                    }, startTime);
                });
            });
    },

    commitment: (req, res) => {
        let startTime = start_time();
        const position = get_position_arg(req, res, startTime);
        if (position === undefined) {
            return;
        }

        const merkle_root = get_merkle_root_arg(req, res, startTime);
        if (merkle_root === undefined) {
            return;
        }

        models.merkleCommitment.find({
            client_position: position,
            merkle_root: merkle_root
        }, (error, data) => {
            if (error) {
                return reply_err(res, INTERNAL_ERROR_API, startTime);
            }
            if (data.length === 0) {
                return reply_err(res, COMMITMENT_POSITION_UNKNOWN, startTime);
            }
            reply_msg(res, {
                commitment: data[0].commitment,
                merkle_root: merkle_root
            }, startTime);
        });
    },

    commitment_latest_proof: (req, res) => {
        let startTime = start_time();
        let position = get_position_arg(req, res, startTime);
        if (position === undefined) {
            return;
        }

        models.attestation
            .find()
            .sort({inserted_at: -1}).limit(1)
            .exec((error, data) => {
                let merkle_root = data[0].merkle_root;
                let txid = data[0].txid;
                models.merkleProof.find({
                    client_position: position,
                    merkle_root: merkle_root
                }, (error, data) => {
                    if (error) {
                        return reply_err(res, INTERNAL_ERROR_API, startTime);
                    }
                    if (data.length === 0) {
                        return reply_err(res, POSITION_UNKNOWN, startTime);
                    }
                    reply_msg(res, {
                        txid: txid,
                        commitment: data[0].commitment,
                        merkle_root: merkle_root,
                        ops: data[0].ops
                    }, startTime);
                });
            });
    },

    commitment_verify: (req, res) => {
        let startTime = start_time();
        let position = get_position_arg(req, res, startTime);
        if (position === undefined) {
            return;
        }

        let commitment = get_commitment_arg(req, res, startTime);
        if (commitment === undefined) {
            return;
        }

        models.merkleCommitment.find({
            client_position: position,
            commitment: commitment
        }, (error, data) => {
            if (error) {
                return reply_err(res, INTERNAL_ERROR_API, startTime);
            }
            if (data.length === 0) {
                return reply_err(res, COMMITMENT_POSITION_UNKNOWN, startTime);
            }
            models.attestation.find({merkle_root: data[data.length - 1].merkle_root}, (error, data) => {
                if (error) {
                    return reply_err(res, INTERNAL_ERROR_API, startTime);
                }
                if (data.length === 0) {
                    return reply_err(res, MERKLEROOT_UNKNOWN, startTime);
                }
                reply_msg(res, {confirmed: data[0].confirmed}, startTime);
            });
        });
    },

    commitment_proof: (req, res) => {
        let startTime = start_time();
        let position = get_position_arg(req, res, startTime);
        if (position === undefined) {
            return;
        }

        let merkle_root = get_merkle_root_arg(req, res, startTime);
        if (merkle_root === undefined) {
            return;
        }
        models.merkleProof.find({
            client_position: position,
            merkle_root: merkle_root
        }, (error, data) => {
            if (error) {
                return reply_err(res, INTERNAL_ERROR_API, startTime);
            }
            if (data.length === 0) {
                return reply_err(res, POSITION_UNKNOWN, startTime);
            }
            reply_msg(res, {
                merkle_root: merkle_root,
                commitment: data[0].commitment,
                ops: data[0].ops
            }, startTime);
        });
    },

    commitment_send: (req, res) => {
        let startTime = start_time();
        let rawRequestData = '';
        req.on('data', chunk => {
            rawRequestData += chunk.toString();
        });

        req.on('end', () => {
            // test payload in base64 format and defined
            let data;
            let payload;
            try {
                data = JSON.parse(rawRequestData);
                payload = JSON.parse(base64decode(data[MAINSTAY_PAYLOAD]));
            } catch (e) {
                return reply_err(res, BAD_ARG_PAYLOAD, startTime);
            }

            if (payload === undefined) {
                return reply_err(res, MISSING_ARG_PAYLOAD, startTime);
            }

            // check payload components are defined
            const signatureCommitment = data[MAINSTAY_SIGNATURE];
            if (signatureCommitment === undefined) {
                return reply_err(res, MISSING_ARG_SIGNATURE, startTime);
            }
            if (payload.commitment === undefined) {
                return reply_err(res, MISSING_PAYLOAD_COMMITMENT, startTime);
            }
            if (payload.position === undefined) {
                return reply_err(res, MISSING_PAYLOAD_POSITION, startTime);
            }
            if (payload.token === undefined) {
                return reply_err(res, MISSING_PAYLOAD_TOKEN, startTime);
            }
            // try get client details
            models.clientDetails.find({client_position: payload.position}, (error, data) => {
                if (error) {
                    return reply_err(res, INTERNAL_ERROR_API, startTime);
                }
                if (data.length === 0) {
                    return reply_err(res, POSITION_UNKNOWN, startTime);
                }
                if (data[0].auth_token !== payload.token) {
                    return reply_err(res, PAYLOAD_TOKEN_ERROR, startTime);
                }
                try {
                    // get pubkey hex
                    const pubkey = ec.keyFromPublic(data[0].pubkey, 'hex');

                    // get base64 signature
                    let sig = Buffer.from(signatureCommitment, 'base64')

                    if (!ec.verify(payload.commitment, sig, pubkey)) {
                        return reply_err(res, SIGNATURE_INVALID, startTime);
                    }

                    models.clientCommitment.findOneAndUpdate({client_position: payload.position}, {commitment: payload.commitment}, {upsert: true}, (error) => {
                        if (error) {
                            return reply_err(res, INTERNAL_ERROR_API, startTime);
                        }
                        reply_msg(res, 'feedback', startTime);
                    });
                } catch (e) {
                    return reply_err(res, SIGNATURE_INVALID, startTime);
                }
            });
        });
    },

    commitment_commitment: (req, res) => {
        let startTime = start_time();
        let commitment = get_commitment_arg(req, res, startTime);
        if (commitment === undefined) {
            return;
        }

        models.merkleProof.find({commitment: commitment}, (error, data) => {
            if (error) {
                return reply_err(res, INTERNAL_ERROR_API, startTime);
            }
            if (data.length === 0) {
                return reply_err(res, 'Not found', startTime);
            }
            const response = data[data.length - 1]; // get latest
            models.attestation.find({merkle_root: response.merkle_root}, (error, data) => {
                if (error) {
                    return reply_err(res, INTERNAL_ERROR_API, startTime);
                }
                if (data.length === 0) {
                    return reply_err(res, 'Not found', startTime);
                }
                reply_msg(res, {
                    attestation: {
                        merkle_root: data[0].merkle_root,
                        txid: data[0].txid,
                        confirmed: data[0].confirmed,
                        inserted_at: dateFormat(data[0].inserted_at, DATE_FORMAT)
                    },
                    merkleproof: {
                        position: response.client_position,
                        merkle_root: response.merkle_root,
                        commitment: response.commitment,
                        ops: response.ops
                    }
                }, startTime);
            });
        });
    },

    merkleroot: (req, res) => {
        let startTime = start_time();
        let merkle_root = get_merkle_root_arg(req, res, startTime);
        if (merkle_root === undefined) {
            return;
        }
        models.merkleCommitment.find({merkle_root: merkle_root}, (error, data) => {
            if (error) {
                return reply_err(res, INTERNAL_ERROR_API, startTime);
            }
            if (data.length === 0) {
                return reply_err(res, 'Commitments not found for merkle_root provided', startTime);
            }

            const array = [];
            for (let index in data) {
                array.push({
                    position: data[index].client_position,
                    commitment: data[index].commitment
                });
            }

            const response = data[0];
            models.attestation.find({merkle_root: response.merkle_root}, (error, data) => {
                if (error) {
                    return reply_err(res, INTERNAL_ERROR_API, startTime);
                }
                if (data.length === 0) {
                    return reply_err(res, 'No attestation found for merkle_root provided', startTime);
                }
                reply_msg(res, {
                    attestation: {
                        merkle_root: data[0].merkle_root,
                        txid: data[0].txid,
                        confirmed: data[0].confirmed,
                        inserted_at: dateFormat(data[0].inserted_at, DATE_FORMAT)
                    },
                    merkle_commitment: array
                }, startTime);
            });
        });
    },

    position: (req, res) => {
        let startTime = start_time();
        let position = get_position_arg(req, res, startTime);
        if (position === undefined) {
            return; // TODO add message error
        }

        const response = {
            'position': position,
            'data': []
        };

        let page = parseInt(req.query.page);
        let limit = 10;
        let start = limit * (page - 1);

        if (!page) {
            start = 0;
        }

        models.merkleProof.countDocuments({client_position: position}, function (error, count) {
            response['total'] = count;
            response['pages'] = count / limit;
            response['limit'] = limit;

            models.merkleProof
                .find({client_position: position})
                .sort({_id: -1}).limit(limit)
                .skip(start)
                .exec(async (error, data) => {
                    if (error) {
                        return reply_err(res, INTERNAL_ERROR_API, startTime);
                    }
                    if (data.length === 0) {
                        return reply_err(res, 'No data found for position provided', startTime);
                    }

                    for (let itr = 0; itr < data.length; ++itr) {
                        await models.attestation.findOne({merkle_root: data[itr].merkle_root}, (error, attestation) => {
                            if (error) {
                                return reply_err(res, INTERNAL_ERROR_API, startTime);
                            }
                            if (!attestation) {
                                response['data'].push({
                                    commitment: data[itr].commitment,
                                    date: ''
                                });
                            } else {
                                response['data'].push({
                                    commitment: data[itr].commitment,
                                    date: dateFormat(attestation.inserted_at, DATE_FORMAT)
                                });
                            }
                        });
                    }

                    models.clientDetails.findOne({client_position: position}, (error, client) => {
                        if (error) {
                            return reply_err(res, INTERNAL_ERROR_API, startTime);
                        }
                        if (!client) {
                            return reply_err(res, 'No client details found for position provided', startTime);
                        }
                        response['client_name'] = client.client_name;
                        res.json(response);
                    });
                });
        });
    },

    attestation: (req, res) => {
        let startTime = start_time();
        let hash = get_txid_arg(req, res, startTime);
        if (hash === undefined) {
            return; // TODO add message error
        }
        models.attestation.find({txid: hash}, (error, data) => {
            if (error) {
                return reply_err(res, INTERNAL_ERROR_API, startTime);
            }
            if (data.length === 0) {
                return reply_err(res, 'No attestation found', startTime);
            }
            let response = data[0];
            models.attestationInfo.find({txid: hash}, (error, data) => {
                if (error) {
                    return reply_err(res, INTERNAL_ERROR_API, startTime);
                }

                if (data.length === 0) {
                    reply_msg(res, {
                        attestation: {
                            merkle_root: response.merkle_root,
                            txid: response.txid,
                            confirmed: response.confirmed,
                            inserted_at: dateFormat(response.inserted_at, DATE_FORMAT)
                        },
                        attestationInfo: {
                            txid: response.txid,
                            amount: '',
                            blockhash: '',
                            time: ''
                        }
                    }, startTime);
                } else {
                    reply_msg(res, {
                        attestation: {
                            merkle_root: response.merkle_root,
                            txid: response.txid,
                            confirmed: response.confirmed,
                            inserted_at: dateFormat(response.inserted_at, DATE_FORMAT)
                        },
                        attestationInfo: {
                            txid: data[0].txid,
                            amount: data[0].amount / 100000000,
                            blockhash: data[0].blockhash,
                            time: data[0].time
                        }
                    }, startTime);
                }
            });
        });
    },

    blockhash: (req, res) => {
        let startTime = start_time();
        let hash = get_hash_arg(req, res, startTime);
        if (hash === undefined) {
            return; // TODO add message error
        }

        models.attestationInfo.find({blockhash: hash}, (error, data) => {
            if (error) {
                return reply_err(res, INTERNAL_ERROR_API, startTime);
            }
            if (data.length === 0) {
                return reply_err(res, 'No attestations found for blockhash provided', startTime);
            }
            reply_msg(res, {
                blockhash: {
                    txid: data[0].txid,
                    amount: data[0].amount / 100000000,
                    blockhash: data[0].blockhash,
                    time: dateFormat(data[0].time * 1000, DATE_FORMAT)
                }
            }, startTime);
        });
    },

    clients: (req, res) => {
        const response = [];

        models.attestation
            .find()
            .sort({inserted_at: -1})
            .limit(1)
            .exec((error, data) => {
                if (error) {
                    return;
                }
                if (data.length > 0) {
                    const merkle_root = data[0].merkle_root;

                    models.clientDetails.find().exec(async (err, data) => {
                        for (let itr = 0; itr < data.length; ++itr) {

                            await models.merkleCommitment.findOne({
                                client_position: data[itr].client_position,
                                merkle_root: merkle_root
                            }).exec().then(function (client) {
                                if (client) {
                                    response.push({
                                        position: data[itr].client_position,
                                        client_name: data[itr].client_name,
                                        commitment: client.commitment
                                    });
                                } else {
                                    response.push({
                                        position: data[itr].client_position,
                                        client_name: data[itr].client_name
                                    });
                                }
                            });
                        }

                        res.json(response);
                    });
                }
            });
    },
};