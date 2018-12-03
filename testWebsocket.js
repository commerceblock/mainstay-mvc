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

  function channel_attestation(connection) {
    if (connection.connected) {
      connection.sendUTF(JSON.stringify({event: "subscribe", channel: "attestation"}));
    }
  }

  function channel_attestationinfo(connection) {
    if (connection.connected) {
      connection.sendUTF(JSON.stringify({event: "subscribe", channel: "attestationinfo"}));
    }
  }

  function channel_merklecommitment(connection) {
    if (connection.connected) {
      connection.sendUTF(JSON.stringify({event: "subscribe", channel: "merklecommitment"}));
    }
  }

  function channel_merkleproof(connection) {
    if (connection.connected) {
      connection.sendUTF(JSON.stringify({event: "subscribe", channel: "merkleproof"}));
    }
  }

  ping(connection);
  channel_attestation(connection);
  channel_attestationinfo(connection);
  channel_merklecommitment(connection);
  channel_merkleproof(connection);

  //////////////////////////////////////////////////////////////////////////////
});

client.connect('ws://localhost:8080');
