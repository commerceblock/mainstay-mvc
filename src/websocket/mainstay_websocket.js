var WebSocketServer = require('websocket').server;
var http = require('http');
const models = require('../models/models');

const CHANNEL_ATTESTATION = 'attestation';
const CHANNEL_ATTESTATION_INFO = 'attestationinfo';
const CHANNEL_MERKLE_COMMITMENT = 'merklecommitment';
const CHANNEL_MERKLE_PROOF = 'merkleproof';
const ERROR = 'error';
const ERROR_BINARY = "websocket support in binary is not support";
const ERROR_OPTION_NOT_VALID = "the argument is missing or wrong";
const EVENT_PING = "ping";
const EVENT_SUBSCRIBE = 'subscribe';
const EVENT_UNSUBSCRIBE = 'unsubscribe';
const NOT_SUBSCRIBED = 'Not Subscribed';
const SUBSCRIBE = 'subscribe';
const SUBSCRIBED = 'subscribed';
const UPDATE = 'change';
const UNSUBSCRIBE = 'unsubscribe';
const UNSUBSCRIBED = 'unsubscribed';
const UTF8 = 'utf8';

var channelAttestation = [];
var channelAttestationInfo = [];
var channelMerkleCommitment = [];
var channelMerkleProof = [];

function subscribe_channel_attestation(client) {
  for (var itr = 0; itr < channelAttestation.length; ++itr)
    if (channelAttestation[itr].client === client)
      return client.sendUTF(JSON.stringify({
        event: ERROR,
        msg: NOT_SUBSCRIBED
      }));
  channelAttestation.push({ client: client });
  client.sendUTF(JSON.stringify({
    event: SUBSCRIBED,
    channel: CHANNEL_ATTESTATION,
    id: 0
  }));
}

function subscribe_channel_attestationinfo(client) {
  for (var itr = 0; itr < channelAttestationInfo.length; ++itr)
    if (channelAttestationInfo[itr].client === client)
      return client.sendUTF(JSON.stringify({
        event: ERROR,
        msg: NOT_SUBSCRIBED
      }));
  channelAttestationInfo.push({ client: client });
  client.sendUTF(JSON.stringify({
    event: SUBSCRIBED,
    channel: CHANNEL_ATTESTATION_INFO,
    id: 1
  }));
}

function subscribe_channel_merklecommitment(client) {
  for (var itr = 0; itr < channelMerkleCommitment.length; ++itr)
    if (channelMerkleCommitment[itr].client === client)
      return client.sendUTF(JSON.stringify({
        event: ERROR,
        msg: NOT_SUBSCRIBED
      }));
  channelMerkleCommitment.push({ client: client });
  client.sendUTF(JSON.stringify({
    event: SUBSCRIBED,
    channel: CHANNEL_MERKLE_COMMITMENT,
    id: 2
  }));
}

function subscribe_channel_merkleproof(client) {
  for (var itr = 0; itr < channelMerkleProof.length; ++itr)
    if (channelMerkleProof[itr].client === client)
      return client.sendUTF(JSON.stringify({
        event: ERROR,
        msg: NOT_SUBSCRIBED
      }));
  channelMerkleProof.push({ client: client });
  client.sendUTF(JSON.stringify({
    event: SUBSCRIBED,
    channel: CHANNEL_MERKLE_PROOF,
    id: 3
  }));
}

function subscribe_channel_price_BTC(client) {

}

function subscribe_channel_price_CBT(client) {

}

function unsubscribe_channel_attestation(client) {
  for (var itr = 0; itr < channelAttestation.length; ++itr)
    if (channelAttestation[itr].client === client) {
      delete channelAttestation.splice(itr);
      return client.sendUTF(JSON.stringify({
        event: UNSUBSCRIBED,
        status: "OK",
        id: 0
      }));
    }
  client.sendUTF(JSON.stringify({
    event: ERROR,
    msg: NOT_SUBSCRIBED
  }));
}

function unsubscribe_channel_attestationinfo(client) {
  for (var itr = 0; itr < channelAttestationInfo.length; ++itr)
    if (channelAttestationInfo[itr].client === client) {
      delete channelAttestationInfo.splice(itr);
      return client.sendUTF(JSON.stringify({
        event: UNSUBSCRIBED,
        status: "OK",
        id: 1
      }));
    }
  client.sendUTF(JSON.stringify({
    event: ERROR,
    msg: NOT_SUBSCRIBED
  }));
}

function unsubscribe_channel_merklecommitment(client) {
  for (var itr = 0; itr < channelMerkleCommitment.length; ++itr)
    if (channelMerkleCommitment[itr].client === client) {
      delete channelMerkleCommitment.splice(itr);
      return client.sendUTF(JSON.stringify({
        event: UNSUBSCRIBED,
        status: "OK",
        id: 2
      }));
    }
  client.sendUTF(JSON.stringify({
    event: ERROR,
    msg: NOT_SUBSCRIBED
  }));
}

function unsubscribe_channel_merkleproof(client) {
  for (var itr = 0; itr < channelMerkleProof.length; ++itr)
    if (channelMerkleProof[itr].client === client) {
      delete channelMerkleProof.splice(itr);
      return client.sendUTF(JSON.stringify({
        event: UNSUBSCRIBED,
        status: "OK",
        id: 3
      }));
    }
  client.sendUTF(JSON.stringify({
    event: ERROR,
    msg: NOT_SUBSCRIBED
  }));
}

function unsubscribe_channel_price_BTC(client) {

}

function unsubscribe_channel_price_CBT(client) {

}


function subscribe(client, data) {
  if (data.channel === CHANNEL_ATTESTATION)
    subscribe_channel_attestation(client)
  else if (data.channel === CHANNEL_ATTESTATION_INFO)
    subscribe_channel_attestationinfo(client);
  else if (data.channel === CHANNEL_MERKLE_COMMITMENT)
    subscribe_channel_merklecommitment(client);
  else if (data.channel === CHANNEL_MERKLE_PROOF)
    subscribe_channel_merkleproof(client);
  else if (data.channel === CHANNEL_PRICE_BTC)
    subscribe_channel_price_BTC(client);
  else if (data.channel === CHANNEL_PRICE_CBT)
    subscribe_channel_price_CBT(client);
  else
    console.log("ERROR FDP");
}

function unsubscribe(client, data) {
  if (data.channel === CHANNEL_ATTESTATION)
    unsubscribe_channel_attestation(client, data.id);
  else if (data.channel === CHANNEL_ATTESTATION_INFO)
    unsubscribe_channel_attestationinfo(client, data.id);
  else if (data.channel === CHANNEL_MERKLE_COMMITMENT)
    unsubscribe_channel_merklecommitment(client, data.id);
  else if (data.channel === CHANNEL_MERKLE_PROOF)
    unsubscribe_channel_merkleproof(client, data.id);
  else if (data.channel === CHANNEL_PRICE_BTC)
    unsubscribe_channel_price_BTC(client);
  else if (data.channel === CHANNEL_PRICE_CBT)
    unsubscribe_channel_price_CBT(client);
  else
    console.log("ERROR FDP");
}

function listen(message) {
  if (message.type === UTF8) {
    var data = JSON.parse(message.utf8Data);
    if (data.event === EVENT_PING)
      return this.sendUTF(JSON.stringify({event: "pong"}));
    else if (data.event === EVENT_SUBSCRIBE)
      return subscribe(this, data);
    else if (data.event === EVENT_UNSUBSCRIBE)
      return unsubscribe(this, data);
    else
      return connection.sendUTF(JSON.stringify({event: "error"}));
  } else if (message.type === 'binary') {
    // message.binaryData.length
    // message.binaryData
    connection.sendBytes(JSON.stringify({error: ERROR_BINARY}));
  }
}

function close(reasonCode, description) {
  for (let itr = 0; itr < channelAttestation.length; ++itr)
    if (channelAttestation[itr].client === this)
      delete channelAttestation.splice(itr);
  for (let itr = 0; itr < channelAttestationInfo.length; ++itr)
    if (channelAttestationInfo[itr].client === this)
      delete channelAttestationInfo.splice(itr);
  for (let itr = 0; itr < channelMerkleCommitment.length; ++itr)
    if (channelMerkleCommitment[itr].client === this)
      delete channelMerkleCommitment.splice(itr);
  for (let itr = 0; itr < channelMerkleProof.length; ++itr)
    if (channelMerkleProof[itr].client === this)
      delete channelMerkleProof.splice(itr);
}

function watch_mongo() {
  const streamAttestation = models.attestation.watch();
  const streamAttestationInfo = models.attestationInfo.watch();
  const streamMerkleCommitment = models.merkleCommitment.watch();
  const streamMerkleProof = models.merkleProof.watch();
  streamAttestation.on(UPDATE, (data) => {
    let message = JSON.stringify([0, [
      data.fullDocument.merkle_root,
      data.fullDocument.txid,
      data.fullDocument.confirmed,
      data.fullDocument.inserted_at
    ]]);
    for (let itr = 0; itr < channelAttestation.length; ++itr)
      channelAttestation[itr].client.sendUTF(message);
  });
  streamAttestationInfo.on(UPDATE, (data) => {
    let message = JSON.stringify([1, [
      data.fullDocument.client_position,
      data.fullDocument.commitment
    ]]);
    for (let itr = 0; itr < channelAttestationInfo.length; ++itr)
      channelAttestationInfo[itr].client.sendUTF(message);
  });
  streamMerkleCommitment.on(UPDATE, (data) => {
    let message = JSON.stringify([2, [
      data.fullDocument.client_position,
      data.fullDocument.merkle_root,
      data.fullDocument.commitment
    ]]);
    for (let itr = 0; itr < channelAttestationInfo.length; ++itr)
      channelAttestationInfo[itr].client.sendUTF(message);
  });
  streamMerkleProof.on(UPDATE, (data) => {
    let message = JSON.stringify([3, [
      data.fullDocument.client_position,
      data.fullDocument.merkle_root,
      data.fullDocument.commitment,
      [
        [
          data.fullDocument.ops[0].append,
          data.fullDocument.ops[0].commitment
        ],
        [
          data.fullDocument.ops[1].append,
          data.fullDocument.ops[1].commitment
        ]
      ]
    ]]);
    for (let itr = 0; itr < channelMerkleProof.length; ++itr)
      channelMerkleProof[itr].client.sendUTF(message);
  });
}

function mainstay_websocket() {
  watch_mongo();
  var server = http.createServer((request, response) => {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
  });
  wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
  });
  wsServer.on('request', (request) => {
    const client = request.accept('', request.origin);
    client.on('message', listen);
    client.on('close', close);
  });
  server.listen(8080);
}

module.exports.mainstay_websocket = mainstay_websocket;
