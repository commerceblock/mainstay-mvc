var WebSocketServer = require('websocket').server;
var http = require('http');

const ERROR_BINARY = "websocket support in binary is not support";
const ERROR_OPTION_NOT_VALID = "the argument is missing or wrong"

var server = http.createServer((request, response) => {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(404);
  response.end();
});

server.listen(8080);


function originIsAllowed(origin) {
  return true;
}

////////////////////////////////////////////////////////////////////////////////

var connection = undefined;

function unsubscribe_channel_attestation() {
  connection.sendUTF(JSON.stringify({
    event: "unsubscribed",
    id: 0
  }));
}

function unsubscribe_channel_attestationinfo() {
  connection.sendUTF(JSON.stringify({
    event: "unsubscribed",
    id: 0
  }));
}

function unsubscribe_channel_merklecommitment() {
  connection.sendUTF(JSON.stringify({
    event: "unsubscribed",
    id: 0
  }));
}

function unsubscribe_channel_merkleproof() {
  connection.sendUTF(JSON.stringify({
    event: "unsubscribed",
    id: 0
  }));
}

function subscribe_channel_attestation() {
  connection.sendUTF(JSON.stringify({
    event: "subscribed",
    channel: "attestation",
    id: 0
  }));
}

function subscribe_channel_attestationinfo() {
  connection.sendUTF(JSON.stringify({
    event: "subscribed",
    channel: "attestationinfo",
    id: 0
  }));
}

function subscribe_channel_merklecommitment() {
  connection.sendUTF(JSON.stringify({
    event: "subscribed",
    channel: "merklecommitment",
    id: 0
  }));
}

function subscribe_channel_merkleproof() {
  connection.sendUTF(JSON.stringify({
    event: "subscribed",
    channel: "merkleproof",
    id: 0
  }));
}

function unsubscribe(data) {
  if (data.channel === 'attestation')
    channel_attestation();
  else if (data.channel === 'attestationinfo')
    channel_attestationinfo();
  else if (data.channel === 'merklecommitment')
    channel_merklecommitment();
  else if (data.channel === 'merkleproof')
    channel_merkleproof();
  else
    console.log("ERROR FDP");
}

function subscribe(data) {
  if (data.channel === 'attestation')
    console.log('attestation');
  else if (data.channel === 'attestationinfo')
    console.log('attestationinfo');
  else if (data.channel === 'merklecommitment')
    console.log('merklecommitment');
  else if (data.channel === 'merkleproof')
    console.log('merkleproof');
  else
    console.log("ERROR FDP");
}

function api_websocket(message) {
  if (message.type === 'utf8') {
    var data = JSON.parse(message.utf8Data);
    if (data.event === 'ping')
      return connection.sendUTF(JSON.stringify({event: "pong"}));
    else if (data.event === 'subscribe')
      return subscribe(data);
    else if (data.event === 'unsubscribe')
      return subscribe(data);
    else
      return connection.sendUTF(JSON.stringify({event: "error"}));
  } else if (message.type === 'binary') {
    // message.binaryData.length
    // message.binaryData
    connection.sendBytes(JSON.stringify({error: ERROR_BINARY}));
  }
}

function close_websocket(reasonCode, description) {
  console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
}

////////////////////////////////////////////////////////////////////////////////

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

wsServer.on('request', (request) => {
  if (!originIsAllowed(request.origin))
    return request.reject();
  connection = request.accept('', request.origin);
  connection.on('message', api_websocket);
  connection.on('close', close_websocket);
});
