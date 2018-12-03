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

  function ping(connection) {
    if (connection.connected) {
      connection.sendUTF(JSON.stringify({event: "ping"}));
    }
  }

  ping(connection);
  ping(connection);
  ping(connection);
  ping(connection);
  ping(connection);
  ping(connection);

});

client.connect('ws://localhost:8080');
