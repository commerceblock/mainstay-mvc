var WebSocketServer = require('websocket').server;
var http = require('http');
const models = require('../models/models');

const CHANNEL_ATTESTATION = 'attestation';
const CHANNEL_ATTESTATION_INFO = 'attestationinfo';
const CHANNEL_MERKLE_COMMITMENT = 'merklecommitment';
const CHANNEL_MERKLE_PROOF = 'merkleproof';
const ERROR_BINARY = "websocket support in binary is not support";
const ERROR_OPTION_NOT_VALID = "the argument is missing or wrong";
const EVENT_PING = "ping";
const EVENT_SUBSCRIBE = 'subscribe';
const EVENT_UNSUBSCRIBE = 'unsubscribe';
const SUBSCRIBE = 'subscribe';
const SUBSCRIBED = 'subscribed';
const UTF8 = 'utf8';
const UNSUBSCRIBE = 'unsubscribe';
const UNSUBSCRIBED = 'unsubscribed';

var channelAll = [];
var channelAttestation = [];
var channelAttestationInfo = [];
var channelMerkleCommitment = [];
var channelMerkleProof = [];

function subscribe_channel_attestation(client) {
  const id = channelAll.push(client);
  channelAttestation.push(client);

  client.sendUTF(JSON.stringify({
    event: SUBSCRIBED,
    channel: CHANNEL_ATTESTATION,
    id: 0
  }));
}

function subscribe_channel_attestationinfo(client) {
  const id = channelAll.push(client);
  channelAttestationInfo.push(client);


  client.sendUTF(JSON.stringify({
    event: SUBSCRIBED,
    channel: CHANNEL_ATTESTATION_INFO,
    id: 0
  }));
}

function subscribe_channel_merklecommitment(client) {
  const id = channelAll.push(client);
  channelMerkleCommitment.push(client);

  client.sendUTF(JSON.stringify({
    event: SUBSCRIBED,
    channel: CHANNEL_MERKLE_COMMITMENT,
    id: 0
  }));
}

function subscribe_channel_merkleproof(client) {
  const id = channelAll.push(client);
  channelMerkleProof.push(client);

  client.sendUTF(JSON.stringify({
    event: SUBSCRIBED,
    channel: CHANNEL_MERKLE_PROOF,
    id: 0
  }));
}

function unsubscribe_channel_attestation(client) {

  client.sendUTF(JSON.stringify({
    event: UNSUBSCRIBED,
    id: 0
  }));
}

function unsubscribe_channel_attestationinfo(client) {

  client.sendUTF(JSON.stringify({
    event: UNSUBSCRIBED,
    id: 0
  }));
}

function unsubscribe_channel_merklecommitment(client) {

  client.sendUTF(JSON.stringify({
    event: UNSUBSCRIBED,
    id: 0
  }));
}

function unsubscribe_channel_merkleproof(client) {

  client.sendUTF(JSON.stringify({
    event: UNSUBSCRIBED,
    id: 0
  }));
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
  else
    console.log("ERROR FDP");
}

function unsubscribe(client, data) {
  if (data.channel === CHANNEL_ATTESTATION)
    unsubscribe_channel_attestation(client);
  else if (data.channel === CHANNEL_ATTESTATION_INFO)
    unsubscribe_channel_attestationinfo(client);
  else if (data.channel === CHANNEL_MERKLE_COMMITMENT)
    unsubscribe_channel_merklecommitment(client);
  else if (data.channel === CHANNEL_MERKLE_PROOF)
    unsubscribe_channel_merkleproof(client);
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
      return subscribe(this, data);
    else
      return connection.sendUTF(JSON.stringify({event: "error"}));
  } else if (message.type === 'binary') {
    // message.binaryData.length
    // message.binaryData
    connection.sendBytes(JSON.stringify({error: ERROR_BINARY}));
  }
}

function close(reasonCode, description) {
  console.log(
    (new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function watch_mongo() {
  const streamAttestation = models.attestation.watch();
  const streamAttestationInfo = models.attestationInfo.watch();
  const streamMerkleCommitment = models.merkleCommitment.watch();
  const streamMerkleProof = models.merkleProof.watch();

  streamAttestation.on('change', (change) => {

  });

  streamAttestationInfo.on('change', (change) => {

  });

  streamMerkleCommitment.on('change', (change) => {

  });

  streamMerkleProof.on('change', (change) => {

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
