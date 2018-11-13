const message = require('bitcore-message');
const models = require('./models')
const mongoose = require('mongoose');
const { base64encode, base64decode } = require('nodejs-base64');
// All Constants
const ARG_POSITION = 'position'
const ARG_COMMITMENT = 'commitment'
const ARG_MERKLE_ROOT = 'markle_root'
const BAD_LENGTH_COMMITMENT =
    'commitment string parameter must contain 64 characters'
const BAD_LENGTH_MERKLE_ROOT = BAD_LENGTH_COMMITMENT
const BAD_TYPE_POSITION = 'position expects a int'
const COMMITMENT_POSITION_UNKNOWN =
    'your commitment or position is unknown to us'
const INTERNAL_ERROR_API = 'an error occurred in the API'
const MERKLEROOT_UNKNOWN = 'your merkle root is unknown to us'
const MISSING_ARG_APIKEY = 'missing X-MAINSTAY-APIKEY'
const MISSING_ARG_COMMITMENT = 'missing commitment parameter'
const MISSING_ARG_MERKLE_ROOT = 'missing merkle_root parameter'
const MISSING_ARG_PAYLOAD = 'missing X-MAINSTAY-PAYLOAD'
const MISSING_ARG_POSITION = 'missing position parameter'
const MISSING_ARG_SIGNATURE_APIKEY = 'missing X-MAINSTAY-SIGNATURE-APIKEY'
const MISSING_ARG_SIGNATURE = 'missing X-MAINSTAY-SIGNATURE'
const MISSING_PAYLOAD_TOKEN = 'missing token parameter in payload'
const NS_PER_SEC = 1000000000
const PAYLOAD_TOKEN_ERROR = 'your token is wrong'
const POSITION_UNKNOWN = 'your position is unknown to us'
const SIZE_COMMITMENT = 64
const VERSION_API_V1 = 'Mainstay-API-v1'

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
  res.json({ error: message, timestamp: time.getTime(),
             allowance: { cost: endTime - startTime }});
}

function reply_msg(res, message, startTime) {
  const time = new Date();
  let endTime = process.hrtime();
  endTime = endTime[0] * NS_PER_SEC + endTime[1];
  res.json({ response: message, timestamp: time.getTime(),
             allowance: { cost: endTime - startTime }});
}

module.exports = {
  // Function METHOD GET
  index: (req, res) => {
    startTime = start_time();
    reply_msg(res, VERSION_API_V1, startTime);
  },
  latest_attestation: (req, res) => {
    startTime = start_time();
    models.attestation.find().sort({ inserted_at: -1 }).limit(1)
                      .exec((error, data) => {
      if (error)
        return reply_err(res, INTERNAL_ERROR_API, startTime);
      reply_msg(res, { merkle_root: data[0].merkle_root, txid: data[0].txid },
                startTime);
    });
  },
  latest_commitment: (req, res) => {
    startTime = start_time();
    let position = get_position_arg(req, res, startTime);
    if (position === undefined)
      return ;
    models.attestation.find().sort({ inserted_at: -1 }).limit(1)
                      .exec((error, data) => {
      if (error)
        return reply_err(res, INTERNAL_ERROR_API, startTime);
      const txid = data[0].txid;
      const merkle_root = data[0].merkle_root;
      models.merkleCommitment.find({ client_position: position,
                                     merkle_root: merkle_root },
                                   (error, data) => {
        if (error)
          return reply_err(res, INTERNAL_ERROR_API, startTime);
        if (data.length == 0)
          return reply_err(res, POSITION_UNKNOWN, startTime);
        reply_msg(res, { commitment: data[0].commitment,
                         merkle_root: merkle_root, txid: txid },
                  startTime);
      });
    });
  },
  commitment_latest_proof: (req, res) => {
    startTime = start_time();
    let position = get_position_arg(req, res, startTime);
    if (position === undefined)
      return ;
    models.attestation.find().sort({ inserted_at: -1 }).limit(1)
                      .exec((error, data) => {
      let merkle_root = data[0].merkle_root;
      models.merkleProof.find({ client_position: position,
                                merkle_root: merkle_root }, (error, data) => {
        if (error)
          return reply_err(res, INTERNAL_ERROR_API, startTime);
        if (data.length == 0)
          return reply_err(res, POSITION_UNKNOWN, startTime);
        reply_msg(res, { commitment: data[0].commitment,
                         merkle_root: merkle_root, ops: data[0].ops },
                  startTime);
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
    models.merkleCommitment.find({ client_position: position,
                                   commitment: commitment },
                                 (error, data) => {
      if (error)
        return reply_err(res, INTERNAL_ERROR_API, startTime);
      if (data.length == 0)
        return reply_err(res, COMMITMENT_POSITION_UNKNOWN, startTime);
      models.attestation.find({ merkle_root: data[0].merkle_root },
                              (error, data) => {
        if (error)
          return reply_err(res, INTERNAL_ERROR_API, startTime);
        if (data.length == 0)
          return reply_err(res, MERKLEROOT_UNKNOWN, startTime);
        reply_msg(res, { confirmed: data[0].confirmed }, startTime);
      });
    });
  },
  commitment_proof: (req, res) => {
    startTime = start_time();
    let position = get_position_arg(req, res, startTime);
    if (position === undefined)
      return ;
    let commitment = get_commitment_arg(req, res, startTime);
    if (commitment === undefined)
      return ;
    models.merkleCommitment.find({ client_position: position,
                                   commitment: commitment},
                                 (error, data) => {
      if (error)
        return reply_err(res, INTERNAL_ERROR_API, startTime);
      if (data.length == 0)
        return reply_err(res, COMMITMENT_POSITION_UNKNOWN, startTime);
      let merkle_root = data[0].merkle_root;
      models.merkleProof.find({ client_position: position,
                                merkle_root: merkle_root },
                              (error, data) => {
        if (error)
          return reply_err(res, INTERNAL_ERROR_API, startTime);
        reply_msg(res, { merkle_root: merkle_root, ops: data[0].ops },
                  startTime);
      });
    });
  },
  // Function METHOD POST
  commitment_send: (req, res) => {
    startTime = start_time();
    req.on('data', chunk => {
      let data = JSON.parse(chunk.toString());
      let payload = JSON.parse(base64decode(data['X-MAINSTAY-PAYLOAD']));
      if (payload === undefined)
        return reply_err(res, MISSING_ARG_PAYLOAD, startTime);
      signatureCommitment = data['X-MAINSTAY-SIGNATURE'];
      if (signatureCommitment === undefined)
        return reply_err(res, MISSING_ARG_SIGNATURE, startTime);
      if (payload.commitment === undefined)
        return reply_err(res, MISSING_PAYLOAD_COMMITMENT, startTime);
      if (payload.position === undefined)
        return reply_err(res, MISSING_PAYLOAD_POSITION, startTime);
      if (payload.token === undefined)
        return reply_err(res, MISSING_PAYLOAD_TOKEN, startTime);
      models.clientDetails.find({ client_position: payload.position },
                                (error, data) => {
        if (error)
          return reply_err(res, INTERNAL_ERROR_API, startTime);
        if (data[0].auth_token != payload.token)
          return reply_err(res, PAYLOAD_TOKEN_ERROR, startTime);
        let msg = new message(payload.commitment);
        if (msg.verify(data[0].pubkey, signatureCommitment)) {
          let clientCommitment = new models.clientCommitment({
            client_position: payload.position,
            commitment: payload.commitment
          });
          clientCommitment.save();
          reply_msg(res, 'feedback', startTime);
        }
      });
    });
  }
};
