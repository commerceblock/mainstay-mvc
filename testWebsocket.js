#!/usr/bin/env node
var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', (error) => {
  console.log('Connect Error: ' + error.toString());
});

client.on('connect', (connection) => {
  console.log('> Connected');
  connection.on('error', (error) => {
    console.log("> Connection Error: " + error.toString());
  });
  connection.on('close', () => {
    console.log('> Connection Closed');
  });
  connection.on('message', (message) => {
    if (message.type === 'utf8')
      console.log("Received: '" + message.utf8Data + "'");
  });

  //////////////////////////////////////////////////////////////////////////////
  ///
  //////////////////////////////////////////////////////////////////////////////

  function ping(connection) {
    if (connection.connected) {
      connection.sendUTF(JSON.stringify({event: "ping"}));
    }
  }

  function channel_subscribe_attestation(connection) {
    if (connection.connected) {
      connection.sendUTF(JSON.stringify({event: "subscribe", channel: "attestation"}));
    }
  }

  function channel_subscribe_attestationinfo(connection) {
    if (connection.connected) {
      connection.sendUTF(JSON.stringify({event: "subscribe", channel: "attestationinfo"}));
    }
  }

  function channel_subscribe_merklecommitment(connection) {
    if (connection.connected) {
      connection.sendUTF(JSON.stringify({event: "subscribe", channel: "merklecommitment"}));
    }
  }

  function channel_subscribe_merkleproof(connection) {
    if (connection.connected) {
      connection.sendUTF(JSON.stringify({event: "subscribe", channel: "merkleproof"}));
    }
  }

  ping(connection);
  channel_subscribe_attestation(connection);
  channel_subscribe_attestation(connection);

  channel_subscribe_attestationinfo(connection);
  channel_subscribe_merklecommitment(connection);
  channel_subscribe_merkleproof(connection);

  //////////////////////////////////////////////////////////////////////////////
});

client.connect('ws://localhost:8080');
