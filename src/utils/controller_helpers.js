const models = require('../models/models');
const {
    ARG_HASH,
    MISSING_ARG_HASH,
    SIZE_TXID,
    ARG_TXID,
    MISSING_ARG_TXID,
    BAD_LENGTH_TXID,
    ARG_COMMITMENT,
    MISSING_ARG_COMMITMENT,
    SIZE_COMMITMENT,
    BAD_LENGTH_COMMITMENT,
    ARG_MERKLE_ROOT,
    MISSING_ARG_MERKLE_ROOT,
    SIZE_MERKLE_ROOT,
    BAD_LENGTH_MERKLE_ROOT,
    ARG_POSITION,
    MISSING_ARG_POSITION,
    BAD_TYPE_POSITION,
    NS_PER_SEC,
    INTERNAL_ERROR_API,
    TYPE_UNKNOWN
} = require('./constants');

function get_hash_arg(req, res, startTime) {
    let paramTxid = req.query[ARG_HASH];
    if (paramTxid === undefined) {
        return reply_err(res, MISSING_ARG_HASH, startTime);
    }
    if (paramTxid.length !== SIZE_TXID) {
        return reply_err(res, BAD_LENGTH_TXID, startTime);
    }
    return paramTxid;
}

function get_txid_arg(req, res, startTime) {
    let paramTxid = req.query[ARG_TXID];
    if (paramTxid === undefined) {
        return reply_err(res, MISSING_ARG_TXID, startTime);
    }
    if (paramTxid.length !== SIZE_TXID) {
        return reply_err(res, BAD_LENGTH_TXID, startTime);
    }
    return paramTxid;
}

function get_commitment_arg(req, res, startTime) {
    let paramCommitment = req.query[ARG_COMMITMENT];
    if (paramCommitment === undefined) {
        return reply_err(res, MISSING_ARG_COMMITMENT, startTime);
    }
    if (paramCommitment.length !== SIZE_COMMITMENT) {
        return reply_err(res, BAD_LENGTH_COMMITMENT, startTime);
    }
    return paramCommitment;
}

function get_merkle_root_arg(req, res, startTime) {
    let paramMerkelRoot = req.query[ARG_MERKLE_ROOT];
    if (paramMerkelRoot === undefined) {
        return reply_err(res, MISSING_ARG_MERKLE_ROOT, startTime);
    }
    if (paramMerkelRoot.length !== SIZE_MERKLE_ROOT) {
        return reply_err(res, BAD_LENGTH_MERKLE_ROOT, startTime);
    }
    return paramMerkelRoot;
}

function get_position_arg(req, res, startTime) {
    let paramPosition = req.query[ARG_POSITION];
    if (paramPosition === undefined) {
        return reply_err(res, MISSING_ARG_POSITION, startTime);
    }
    let position = parseInt(paramPosition, 10);
    if (isNaN(position)) {
        return reply_err(res, BAD_TYPE_POSITION, startTime);
    }
    return position;
}

function start_time() {
    let startTime = process.hrtime();
    return startTime[0] * NS_PER_SEC + startTime[1];
}

function reply_err(res, message, startTime) {
    const time = new Date();
    let endTime = process.hrtime();
    endTime = endTime[0] * NS_PER_SEC + endTime[1];
    res.json({
        error: message,
        timestamp: time.getTime(),
        allowance: {cost: endTime - startTime}
    });
}

function reply_msg(res, message, startTime) {
    const time = new Date();
    let endTime = process.hrtime();
    endTime = endTime[0] * NS_PER_SEC + endTime[1];
    res.json({
        response: message,
        timestamp: time.getTime(),
        allowance: {cost: endTime - startTime}
    });
}

function find_type_hash(res, paramValue, startTime) {
    models.merkleProof.find({commitment: paramValue}, (error, data) => {
        if (error) {
            return reply_err(res, INTERNAL_ERROR_API, startTime);
        }
        if (data.length !== 0) {
            return reply_msg(res, 'commitment', startTime);
        }
        models.merkleProof.find({merkle_root: paramValue}, (error, data) => {
            if (error) {
                return reply_err(res, INTERNAL_ERROR_API, startTime);
            }
            if (data.length !== 0) {
                return reply_msg(res, 'merkle_root', startTime);
            }
            models.attestationInfo.find({txid: paramValue}, (error, data) => {
                if (error) {
                    return reply_err(res, INTERNAL_ERROR_API, startTime);
                }
                if (data.length !== 0) {
                    return reply_msg(res, 'txid', startTime);
                }
                models.attestationInfo.find({blockhash: paramValue}, (error, data) => {
                    if (error) {
                        return reply_err(res, INTERNAL_ERROR_API, startTime);
                    }
                    if (data.length !== 0) {
                        return reply_msg(res, 'blockhash', startTime);
                    }
                    reply_err(res, TYPE_UNKNOWN, startTime);
                });
            });
        });
    });
}

function find_type_number(res, paramValue, startTime) {
    models.clientDetails.find({client_position: paramValue}, (error, data) => {
        if (error) {
            return reply_err(res, INTERNAL_ERROR_API, startTime);
        }
        if (data.length !== 0) {
            return reply_msg(res, 'position', startTime);
        }
        reply_err(res, 'Not found', startTime);
    });
}

module.exports = {
    get_hash_arg,
    get_txid_arg,
    get_commitment_arg,
    get_merkle_root_arg,
    get_position_arg,
    start_time,
    reply_err,
    reply_msg,
    find_type_hash,
    find_type_number,
};