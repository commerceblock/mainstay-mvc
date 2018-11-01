var models = require('./models')
var mongoose = require('mongoose');
// All Constants
const ARG_POSITION = 'position'
const ARG_COMMITMENT = 'commitment'
const BAD_LENGTH_COMMITMENT = 'commitment string parameter must contain 64 characters'
const BAD_TYPE_POSITION = 'position expects a int'
const INTERNAL_ERROR_API = 'an error occurred in the API'
const MISSING_ARG_POSITION = 'missing position parameter'
const MISSING_ARG_COMMITMENT = 'missing commitment parameter'
const NS_PER_SEC = 1000000000
const SIZE_COMMITMENT = 64

function get_commitment_arg(req, res, startTime) {
  const time = new Date();
  let paramCommitment = req.query[ARG_COMMITMENT];
  if (paramCommitment === undefined)
    return response_error(res, MISSING_ARG_COMMITMENT, startTime);
  if (paramCommitment.length != SIZE_COMMITMENT)
    return response_error(res, BAD_LENGTH_COMMITMENT, startTime);
  return paramCommitment;
}

function get_position_arg(req, res, startTime) {
  const time = new Date();
  let paramPosition = req.query[ARG_POSITION];
  if (paramPosition === undefined)
    return response_error(res, MISSING_ARG_POSITION, startTime);
  let position = parseInt(paramPosition);
  if (isNaN(position))
    return response_error(res, BAD_TYPE_POSITION, startTime);
  return position;
}

function start_time() {
  let startTime = process.hrtime();
  return startTime[0] * NS_PER_SEC + startTime[1];
}

function response_error(res, message, startTime) {
  const time = new Date();
  let endTime = process.hrtime();
  endTime = endTime[0] * NS_PER_SEC + endTime[1];
  res.json({error: message, timestamp: time.getTime(),
            allowance: { cost: endTime - startTime }});
}

function response_message(res, message, startTime) {
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
    response_message(res, 'Mainstay-API', startTime);
  },
  latest_attestation: (req, res) => {
    startTime = start_time();
    //
    // TODO: Add Feature -------------------------------------------------------
    //
    response_message(res, 'latest_attestation', startTime);
  },
  latest_commitment: (req, res) => {
    startTime = start_time();
    let position = get_position_arg(req, res, startTime);
    if (position === undefined)
      return response_error(res, MISSING_ARG_POSITION, startTime);
    //
    // TODO: Add Feature -------------------------------------------------------
    //
    response_message(res, 'latest_commitment', startTime);
  },
  commitment_latest_proof: (req, res) => {
    startTime = start_time();
    let position = get_position_arg(req, res, startTime);
    if (position === undefined)
      return response_error(res, MISSING_ARG_POSITION, startTime);
    models.merkleProof.find({position: position}, (error, data) => {
      if (error)
        return response_error(res, INTERNAL_ERROR_API, startTime);
      if (data.length == 0)
        return response_error(res, 'your position is unknown to us', startTime);
      //
      // TODO: Add Feature -----------------------------------------------------
      //
      response_message(res, 'commitment_latest_proof', startTime);
    });
  },
  commitment_verify: (req, res) => {
    startTime = start_time();
    let position = get_position_arg(req, res, startTime);
    if (position === undefined)
      return response_error(res, MISSING_ARG_POSITION, startTime);
    let commitment = get_commitment_arg(req, res, startTime);
    if (commitment === undefined)
      return response_error(res, MISSING_ARG_COMMITMENT, startTime);
    //
    // TODO: Add Feature -------------------------------------------------------
    //
    response_message(res, 'commitment_verify' , startTime);
  },
  commitment_proof: (req, res) => {
    startTime = start_time();
    let position = get_position_arg(req, res, startTime);
    if (position === undefined)
      return response_error(res, MISSING_ARG_POSITION, startTime);
    let commitment = get_commitment_arg(req, res, startTime);
    if (commitment === undefined)
      return response_error(res, MISSING_ARG_COMMITMENT, startTime);
    //
    // TODO: Add Feature -------------------------------------------------------
    //
    response_message(res, 'commitment_proof' , startTime);
  },
  // Function METHOD POST
  commitment_send: (req, res) => {
    startTime = start_time();
    //
    // TODO: Add Feature -------------------------------------------------------
    //
    response_message(res, 'commitment_send' , startTime);
  }
};
