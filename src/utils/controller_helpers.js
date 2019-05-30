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
} = require('./constants');

function get_hash_arg(req, res, startTime) {
    const paramTxid = req.query[ARG_HASH];
    if (paramTxid === undefined) {
        return reply_err(res, MISSING_ARG_HASH, startTime);
    }
    if (paramTxid.length !== SIZE_TXID) {
        return reply_err(res, BAD_LENGTH_TXID, startTime);
    }
    return paramTxid;
}

function get_txid_arg(req, res, startTime) {
    const paramTxid = req.query[ARG_TXID];
    if (paramTxid === undefined) {
        return reply_err(res, MISSING_ARG_TXID, startTime);
    }
    if (paramTxid.length !== SIZE_TXID) {
        return reply_err(res, BAD_LENGTH_TXID, startTime);
    }
    return paramTxid;
}

function get_commitment_arg(req, res, startTime) {
    const paramCommitment = req.query[ARG_COMMITMENT];
    if (paramCommitment === undefined) {
        return reply_err(res, MISSING_ARG_COMMITMENT, startTime);
    }
    if (paramCommitment.length !== SIZE_COMMITMENT) {
        return reply_err(res, BAD_LENGTH_COMMITMENT, startTime);
    }
    return paramCommitment;
}

function get_merkle_root_arg(req, res, startTime) {
    const paramMerkelRoot = req.query[ARG_MERKLE_ROOT];
    if (paramMerkelRoot === undefined) {
        return reply_err(res, MISSING_ARG_MERKLE_ROOT, startTime);
    }
    if (paramMerkelRoot.length !== SIZE_MERKLE_ROOT) {
        return reply_err(res, BAD_LENGTH_MERKLE_ROOT, startTime);
    }
    return paramMerkelRoot;
}

function get_position_arg(req, res, startTime) {
    const paramPosition = req.query[ARG_POSITION];
    if (paramPosition === undefined) {
        return reply_err(res, MISSING_ARG_POSITION, startTime);
    }
    const position = parseInt(paramPosition, 10);
    if (isNaN(position)) {
        return reply_err(res, BAD_TYPE_POSITION, startTime);
    }
    return position;
}

/**
 * @see https://nodejs.org/docs/latest-v10.x/api/process.html#process_process_hrtime_time
 *
 * @returns {[number, number]}
 */
function start_time() {
    return process.hrtime();
}

function reply_err(res, message, startTime) {
    const time = new Date();
    const timeDiff = process.hrtime(startTime);
    const cost = timeDiff[0] * NS_PER_SEC + timeDiff[1];
    res.json({
        error: message,
        timestamp: time.getTime(),
        allowance: {cost}
    });
}

function reply_msg(res, message, startTime) {
    const time = new Date();
    const timeDiff = process.hrtime(startTime);
    const cost = timeDiff[0] * NS_PER_SEC + timeDiff[1];
    res.json({
        response: message,
        timestamp: time.getTime(),
        allowance: {cost}
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
};