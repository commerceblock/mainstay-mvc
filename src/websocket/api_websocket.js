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

function subscribe(data) {

  if (data.channel === 'attestation')
    ;
  else if (data.channel === 'attestationinfo')
    ;
  else if (data.channel === 'merklecommitment')
    ;
  else if (data.channel === 'merkleproof')
    ;
  else
    ;
}

function api_websocket(message) {
  if (message.type === 'utf8') {
    var data = JSON.parse(message.utf8Data);
    if (data.event === 'ping')
      return connection.sendUTF("pong");
    else if (data.event === 'subscribe')
      return subscribe();
    else
      return connection.sendUTF({error: ERROR_OPTION_NOT_VALID});
  } else if (message.type === 'binary') {
    // message.binaryData.length
    // message.binaryData
    connection.sendBytes({error: ERROR_BINARY});
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
