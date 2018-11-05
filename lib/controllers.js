var models = require('./models')
var mongoose = require('mongoose');
// All Constants
const ARG_POSITION = 'position'
const ARG_COMMITMENT = 'commitment'
const ARG_MERKLE_ROOT = 'markle_root'
const BAD_LENGTH_COMMITMENT = 'commitment string parameter must contain 64 characters'
const BAD_LENGTH_MERKLE_ROOT = 'commitment string parameter must contain 64 characters'
const BAD_TYPE_POSITION = 'position expects a int'
const INTERNAL_ERROR_API = 'an error occurred in the API'
const MISSING_ARG_POSITION = 'missing position parameter'
const MISSING_ARG_COMMITMENT = 'missing commitment parameter'
const MISSING_ARG_MERKLE_ROOT = 'missing merkle_root parameter'
const NS_PER_SEC = 1000000000
const POSITION_UNKNOWN = 'your position is unknown to us'
const SIZE_COMMITMENT = 64

function get_commitment_arg(req, res, startTime) {
  const time = new Date();
  let paramCommitment = req.query[ARG_COMMITMENT];
  if (paramCommitment === undefined)
    return reply_err(res, MISSING_ARG_COMMITMENT, startTime);
  if (paramCommitment.length != SIZE_COMMITMENT)
    return reply_err(res, BAD_LENGTH_COMMITMENT, startTime);
  return paramCommitment;
}

function get_merkle_root_arg(req, res, startTime) {
  const time = new Date();
  let paramMerkelRoot = req.query[ARG_MERKLE_ROOT];
  if (paramMerkelRoot === undefined)
    return reply_err(res, MISSING_ARG_MERKLE_ROOT, startTime);
  if (paramMerkelRoot.length != SIZE_MERKLE_ROOT)
    return reply_err(res, BAD_LENGTH_MERKLE_ROOT, startTime);
  return paramMerkelRoot;
}

function get_position_arg(req, res, startTime) {
  const time = new Date();
  let paramPosition = req.query[ARG_POSITION];
  if (paramPosition === undefined)
    return reply_err(res, MISSING_ARG_POSITION, startTime);
  let position = parseInt(paramPosition);
  if (isNaN(position))
    return reply_err(res, BAD_TYPE_POSITION, startTime);
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
  res.json({error: message, timestamp: time.getTime(),
            allowance: { cost: endTime - startTime }});
}

function reply_msg(res, message, startTime) {
  const time = new Date();
  let endTime = process.hrtime();
  endTime = endTime[0] * NS_PER_SEC + endTime[1];
  res.json({response: message, timestamp: time.getTime(),
            allowance: { cost: endTime - startTime }});
}

module.exports = {
  // Function METHOD GET
  index: (req, res) => {
    startTime = start_time();
    reply_msg(res, 'Mainstay-API', startTime);
  },
  latest_attestation: (req, res) => {
    startTime = start_time();
    models.attestation.find().sort({id: -1}).limit(1).exec((error, data) => {
      if (error)
        return reply_err(res, INTERNAL_ERROR_API, startTime);
      return reply_msg(res, { txid: data[0].txid,
                              merkle_root: data[0].merkle_root,
                              confirmation: data[0].confirmation,
                              commit: data[0].commit }, startTime);
    });
  },
  latest_commitment: (req, res) => {
    startTime = start_time();
    let position = get_position_arg(req, res, startTime);
    if (position === undefined)
      return ;
    models.latestCommitment.find({position: position}, (error, data) => {
      if (error)
        return reply_err(res, INTERNAL_ERROR_API, startTime);
      return reply_msg(res, { data[0].commitment }, startTime);
    });
  },
  commitment_latest_proof: (req, res) => {
    startTime = start_time();
    let position = get_position_arg(req, res, startTime);
    if (position === undefined)
      return ;
    models.attestation.find().sort({id: -1}).limit(1).exec((error, data) => {
      if (error)
        return reply_err(res, INTERNAL_ERROR_API, startTime);
      models.merkleProof.find({ position: position,
                                merkle_root: data[0].merkle_root },
                                (error, data) => {
        if (error)
          return reply_err(res, INTERNAL_ERROR_API, startTime);
        if (data.length == 0)
          return reply_err(res, POSITION_UNKNOWN, startTime);
        return reply_msg(res, { proof: data[0].proof }, startTime);
      });
    });
  },
  commitment_verify: (req, res) => {
    startTime = start_time();
    let position = get_position_arg(req, res, startTime);
    if (position === undefined)
      return ;
    let commitment = get_commitment_arg(req, res, startTime);
    if (commitment === undefined)
      return ;
    //
    // TODO: Add Feature -------------------------------------------------------
    //
    reply_msg(res, 'commitment_verify' , startTime);
  },
  commitment_proof: (req, res) => {
    startTime = start_time();
    let position = get_position_arg(req, res, startTime);
    if (position === undefined)
      return ;
    let commitment = get_commitment_arg(req, res, startTime);
    if (commitment === undefined)
      return ;
    //
    // TODO: Add Feature -------------------------------------------------------
    //
    reply_msg(res, 'commitment_proof' , startTime);
  },
  // Function METHOD POST
  commitment_send: (req, res) => {
    startTime = start_time();
    //
    // TODO: Add Feature -------------------------------------------------------
    //
    reply_msg(res, 'commitment_send' , startTime);
  }
};
