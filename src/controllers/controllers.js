const models = require('../models/models');
const mongoose = require('mongoose');
const elliptic = require('elliptic');
const { base64encode, base64decode } = require('nodejs-base64');
//
const ec = new elliptic.ec('secp256k1');
//
// All Constants
const ARG_TXID = 'txid';
const ARG_POSITION = 'position';
const ARG_COMMITMENT = 'commitment';
const ARG_MERKLE_ROOT = 'merkle_root';
const BAD_LENGTH_TXID =
    'txid string parameter must contain 64 characters';
const BAD_LENGTH_COMMITMENT =
    'commitment string parameter must contain 64 characters';
const BAD_LENGTH_MERKLE_ROOT = BAD_LENGTH_COMMITMENT;
const BAD_TYPE_POSITION = 'position expects a int';
const COMMITMENT_POSITION_UNKNOWN =
    'your commitment or position is unknown to us';
const INTERNAL_ERROR_API = 'an error occurred in the API';
const MERKLEROOT_UNKNOWN = 'your merkle root is unknown to us';
const MISSING_ARG_TXID = 'missing txid parameter';
const MISSING_ARG_APIKEY = 'missing X-MAINSTAY-APIKEY';
const MISSING_ARG_COMMITMENT = 'missing commitment parameter';
const MISSING_ARG_MERKLE_ROOT = 'missing merkle_root parameter';
const MISSING_ARG_PAYLOAD = 'missing X-MAINSTAY-PAYLOAD';
const MISSING_ARG_POSITION = 'missing position parameter';
const MISSING_ARG_SIGNATURE_APIKEY = 'missing X-MAINSTAY-SIGNATURE-APIKEY';
const MISSING_ARG_SIGNATURE = 'missing X-MAINSTAY-SIGNATURE';
const MISSING_PAYLOAD_TOKEN = 'missing token parameter in payload';
const NS_PER_SEC = 1000000000;
const PARAM_UNDEFINED = 'parameter undefined';
const PAYLOAD_TOKEN_ERROR = 'your token is wrong';
const POSITION_UNKNOWN = 'your position is unknown to us';
const SIGNATURE_INVALID = 'your signature is incorrect';
const SIZE_TXID = 64;
const SIZE_COMMITMENT = 64;
const SIZE_MERKLE_ROOT = 64;
const TXID_UNKNOWN = 'attestation could not be found for the txid provided';
const TYPE_ERROR = 'an error is present in your type';
const TYPE_UNKNOWN = 'type unknown';
const VERSION_API_V1 = 'Mainstay-API-v1';

const MAINSTAY_PAYLOAD = 'X-MAINSTAY-PAYLOAD';
const MAINSTAY_SIGNATURE = 'X-MAINSTAY-SIGNATURE';
const DATA = 'data';
const VALUE = 'value';

function get_hash_arg(req, res, startTime) {
  const time = new Date();
  let paramTxid = req.query['hash'];
  if (paramTxid === undefined)
    return reply_err(res, MISSING_ARG_TXID, startTime);
  if (paramTxid.length != SIZE_TXID)
    return reply_err(res, BAD_LENGTH_TXID, startTime);
  return paramTxid;
}

function get_txid_arg(req, res, startTime) {
  const time = new Date();
  let paramTxid = req.query[ARG_TXID];
  if (paramTxid === undefined)
    return reply_err(res, MISSING_ARG_TXID, startTime);
  if (paramTxid.length != SIZE_TXID)
    return reply_err(res, BAD_LENGTH_TXID, startTime);
  return paramTxid;
}

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

var dateFormat = require('dateformat');
var now = new Date();

function find_type_hash(res, paramValue, startTime) {
  models.merkleProof.find({ commitment: paramValue }, (error, data) => {
    if (error)
      return reply_err(res, INTERNAL_ERROR_API, startTime);
    if (data.length != 0)
      return reply_msg(res, 'commitment', startTime);
    models.merkleProof.find({ merkle_root: paramValue }, (error, data) => {
      if (error)
        return reply_err(res, INTERNAL_ERROR_API, startTime);
      if (data.length != 0)
        return reply_msg(res, 'merkle_root', startTime);
      models.attestationInfo.find({ txid: paramValue }, (error, data) => {
        if (error)
          return reply_err(res, INTERNAL_ERROR_API, startTime);
        if (data.length != 0)
          return reply_msg(res, 'txid', startTime);
        models.attestationInfo.find({ blockhash: paramValue },
            (error, data) => {
          if (error)
            return reply_err(res, INTERNAL_ERROR_API, startTime);
          if (data.length != 0)
            return reply_msg(res, 'blockhash', startTime);
          reply_err(res, TYPE_UNKNOWN, startTime);
        });
      });
    });
  });
}

function find_type_number(res, paramValue, startTime) {
  models.clientDetails.find({ client_position: paramValue }, (error, data) => {
    if (error)
      return reply_err(res, INTERNAL_ERROR_API, startTime);
    if (data.length != 0)
      return reply_msg(res, 'position', startTime);
    reply_err(res, 'BLA BLA', startTime);
  });
}

module.exports = {
  blockhash: (req, res) => {
    let startTime = start_time();
    let hash = get_hash_arg(req, res, startTime);
    if (hash === undefined)
      return ; // TODO add message error
    models.attestationInfo.find({blockhash: hash}, (error, data) => {
      if (error)
        return reply_err(res, INTERNAL_ERROR_API, startTime);
      if (data.length == 0)
        return reply_err(res, 'Bla Bla', startTime);
      reply_msg(res, { blockhash: { txid: data[0].txid, amount: data[0].amount,
        blockhash: data[0].blockhash, time: data[0].time }}, startTime);
    });
  },

  ctrl_latest_attestation: (req, res) => {

    let response = {};
    models.attestation.find().sort({inserted_at: -1})
        .exec((error, data) => {

          let page = parseInt(req.query.page);
          let limit = 20;
          let start = limit * (page - 1);

          if (!page) {
              limit = 10;
              start = 0;
          }

          let end = start + limit;
          if (end > data.length) {
            end = data.length;
          }

          response['total'] = data.length;
          response['pages'] = data.length / limit;
          response['data'] = [];

          if (error)
            return; // TODO Add message error
          res.header("Access-Control-Allow-Origin", "*");

          for (let itr = start; itr < end; ++itr)
            response['data'].push({
              txid: data[itr].txid,
              merkle_root: data[itr].merkle_root,
              confirmed: data[itr].confirmed,
              age: (now.toDateString() === data[itr].inserted_at.toDateString())
                  ? dateFormat(data[itr].inserted_at, "HH:MM:ss")
                  : dateFormat(data[itr].inserted_at, "HH:MM:ss dd/mm/yy")
            });
          res.json(response);
        });
  },
  ctrl_latest_attestation_info: (req, res) => {
    let response = [];
    models.attestationInfo.find().sort({ time: -1 }).limit(10)
                      .exec((error, data) => {
      if (error)
        return ; // TODO Add message error
      res.header("Access-Control-Allow-Origin", "*");
      for (let itr = 0; itr < data.length; ++itr)
        response.push({
          txid: data[itr].txid,
          blockhash: data[itr].blockhash,
          amount: data[itr].amount,
          time: data[itr].time
        });
      res.json(response);
    });
  },
  ctrl_latest_commitment: (req, res) => {
    let response = [];
    models.attestation.find().sort({ inserted_at: -1 }).limit(1)
                      .exec((error, data) => {
      if (error)
        return ; // TODO Add message error
      if (data.length > 0) {
        models.merkleCommitment.find({ merkle_root: data[0].merkle_root })
                             .exec((error, data) => {
          if (error)
            return ; // TODO Add message error
          res.header("Access-Control-Allow-Origin", "*");
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
    req.on('data', chunk => {
      const payload = JSON.parse(chunk.toString());
      if (payload.position === undefined)
        return res.json({error: 'position'});
      if (payload.token === undefined)
        return res.json({error: 'token'});
      if (payload.commitment === undefined)
        return res.json({error: 'commitment'});
      if (payload.signature === undefined ||
          !/[0-9A-Fa-f]{75}/g.test(payload.signature))
        return res.json({error: 'signature'});
      models.clientDetails.find({client_position: payload.position},
                                (error, data) => {
        if (data === undefined || data.length == 0)
          return res.json({error: 'undefined'});
        if (error)
          return res.json({error: 'api'});
        if (data[0].auth_token != payload.token)
          return res.json({error: 'token'});
        let pubkey = ec.keyFromPublic(data[0].pubkey, 'hex');
        if (!ec.verify(payload.commitment, payload.signature, pubkey))
          return res.json({error: 'signature'});
        models.clientCommitment.findOneAndUpdate(
          { client_position: payload.position },
          { commitment: payload.commitment }, { upsert: true }, (error) => {
          if (error)
            return res.json({error: 'api'});
          return res.send();
        });
      });
    });
  },
  index: (req, res) => {
    let startTime = start_time();
    reply_msg(res, VERSION_API_V1, startTime);
  },
  latest_attestation: (req, res) => {
    let startTime = start_time();
    models.attestation.find().sort({ inserted_at: -1 }).limit(1)
                      .exec((error, data) => {
      if (error)
        return reply_err(res, INTERNAL_ERROR_API, startTime);
      reply_msg(res, { merkle_root: data[0].merkle_root, txid: data[0].txid },
                startTime);
    });
  },
  attestation: (req, res) => {
    let startTime = start_time();
    let txid = get_txid_arg(req, res, startTime);
    if (txid === undefined)
        return ;
    models.attestation.find({txid: txid})
                      .exec((error, data) => {
      if (error)
        return reply_err(res, INTERNAL_ERROR_API, startTime);
      if (data.length == 0)
        return reply_err(res, TXID_UNKNOWN, startTime)
      reply_msg(res, { merkle_root: data[0].merkle_root, txid: data[0].txid },
                startTime);
    });
  },
  latest_commitment: (req, res) => {
    let startTime = start_time();
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
                         merkle_root: merkle_root, txid: txid }, startTime);
      });
    });
  },
  commitment: (req, res) => {
    let startTime = start_time();
    let position = get_position_arg(req, res, startTime);
    if (position === undefined)
      return ;
    let merkle_root = get_merkle_root_arg(req, res, startTime);
    if (merkle_root === undefined)
      return ;
    models.merkleCommitment.find({ client_position: position,
                                   merkle_root: merkle_root },
                                 (error, data) => {
      if (error)
        return reply_err(res, INTERNAL_ERROR_API, startTime);
      if (data.length == 0)
        return reply_err(res, COMMITMENT_POSITION_UNKNOWN, startTime);
      reply_msg(res, { commitment: data[0].commitment,
                       merkle_root: merkle_root}, startTime);
    });
  },
  commitment_commitment: (req, res) => {
    let startTime = start_time();
    let commitment = get_commitment_arg(req, res, startTime);
    if (commitment === undefined)
      return ;
    models.merkleProof.find({ commitment:  commitment }, (error, data) => {
      if (error)
        return reply_err(res, INTERNAL_ERROR_API, startTime);
      if (data.length == 0)
        return reply_err(res, 'BLA BLA', startTime);
      let response = data[0];
      models.attestation.find({ merkle_root: response.merkle_root },
                              (error, data) => {
        if (error)
          return reply_err(res, INTERNAL_ERROR_API, startTime);
        if (data.length == 0)
          return reply_err(res, 'BLA BLA', startTime);
        reply_msg(res, { attestation: { merkle_root: data[0].merkle_root,
          txid: data[0].txid, confirmed: data[0].confirmed,
          inserted_at: data[0].inserted_at }, merkleproof: {
          position: response.client_position, merkle_root: response.merkle_root,
          commitment: response.commitment, ops: response.ops }}, startTime);
      });
    });
  },
  commitment_latest_proof: (req, res) => {
    let startTime = start_time();
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
    let startTime = start_time();
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
    let startTime = start_time();
    let position = get_position_arg(req, res, startTime);
    if (position === undefined)
      return ;
    let merkle_root = get_merkle_root_arg(req, res, startTime);
    if (merkle_root === undefined)
      return ;
    models.merkleProof.find({ client_position: position,
                              merkle_root: merkle_root },
                            (error, data) => {
      if (error)
        return reply_err(res, INTERNAL_ERROR_API, startTime);
      if (data.length == 0)
        return reply_err(res, POSITION_UNKNOWN, startTime);
      reply_msg(res, { merkle_root: merkle_root,
                       commitment: data[0].commitment, ops: data[0].ops },
                startTime);
  });
  },
  commitment_send: (req, res) => {
    let startTime = start_time();
    req.on(DATA, chunk => {
      let data = JSON.parse(chunk.toString());
      let payload = JSON.parse(base64decode(data[MAINSTAY_PAYLOAD]));
      if (payload === undefined)
        return reply_err(res, MISSING_ARG_PAYLOAD, startTime);
      signatureCommitment = data[MAINSTAY_SIGNATURE];
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
        if (msg.verify(data[0].pubkey, signatureCommitment) != true)
          return reply_err(res, SIGNATURE_INVALID, startTime);
        models.clientCommitment.findOneAndUpdate(
            { client_position: payload.position },
            { commitment: payload.commitment }, { upsert: true }, (error) => {
          if (error)
            return reply_err(res, INTERNAL_ERROR_API, startTime);
          reply_msg(res, 'feedback', startTime);
        });
      });
    });
  },
  merkleroot: (req, res) => {
    let startTime = start_time();
    let merkle_root = get_merkle_root_arg(req, res, startTime);
    if (merkle_root === undefined)
      return ;
    models.merkleCommitment.find({ merkle_root: merkle_root },
                                 (error, data) => {
      if (error)
        return reply_err(res, INTERNAL_ERROR_API, startTime);
      if (data.length == 0)
        return reply_err(res, 'BLA BLA', startTime);
      let response = data[0];
      models.attestation.find({ merkle_root: response.merkle_root },
                              (error, data) => {
        if (error)
          return reply_err(res, INTERNAL_ERROR_API, startTime);
        if (data.length == 0)
          return reply_err(res, 'BLA BLA', startTime);
        reply_msg(res, { attestation: { merkle_root: data[0].merkle_root,
          txid: data[0].txid, confirmed: data[0].confirmed,
          inserted_at: data[0].inserted_at }, merkle_commitment: {
          position: response.client_position, merkle_root: response.merkle_root,
          commitment: response.commitment}}, startTime);
      });
    });
  },
  position: (req, res) => {
    let startTime = start_time();
    let position = get_position_arg(req, res, startTime);
    if (position === undefined)
      return ; // TODO add message error
    models.merkleProof.find({client_position: position}).limit(5)
                      .exec((error, data) => {
      if (error)
        return reply_err(res, INTERNAL_ERROR_API, startTime);
      if (data.length == 0)
        return reply_err(res, 'BLA BLA', startTime);
      let array = [];
      for (let index in data)
        array.push({ position: data[index].client_position,
          merkle_root: data[index].merkle_root,
          commitment: data[index].commitment, ops: data[index].ops});

      models.clientDetails.findOne({ client_position: position }, (error, client) => {
        if (error)
          return reply_err(res, INTERNAL_ERROR_API, startTime);
        if (client.length == 0)
          return reply_err(res, 'BLA BLA', startTime);

        reply_msg(res, { position: array, client_name: client.client_name }, startTime);
      });
    });
  },
  transaction: (req, res) => {
    let startTime = start_time();
    let hash = get_hash_arg(req, res, startTime);
    if (hash === undefined)
      return ; // TODO add message error
    models.attestation.find({txid: hash}, (error, data) => {
      if (error)
        return reply_err(res, INTERNAL_ERROR_API, startTime);
      if (data.length == 0)
        return reply_err(res, 'BLA BLA', startTime);
      let response = data[0];
      models.attestationInfo.find({}, (error, data) => {
        if (error)
          return reply_err(res, INTERNAL_ERROR_API, startTime);
        if (data.length == 0)
          return reply_err(res, 'BLA BLA', startTime);
        reply_msg(res, { attestation: { merkle_root: response.merkle_root,
          txid: response.txid, confirmed: response.confirmed,
          inserted_at: response.inserted_at }, attestationInfo: {
          txid: data[0].txid, amount: data[0].amount,
          blockhash: data[0].blockhash, time: data[0].time }}, startTime);
      });
    });
  },
  type: (req, res) => {
    let startTime = start_time();
    let paramValue = req.query[VALUE];
    if (paramValue === undefined)
      return reply_err(res, PARAM_UNDEFINED, startTime);
    else if (/[0-9A-Fa-f]{64}/g.test(paramValue))
      return find_type_hash(res, paramValue, startTime);
    else if (/^\d+$/.test(paramValue))
      return find_type_number(res, paramValue, startTime);
    reply_err(res, TYPE_ERROR, startTime);
  }
};
