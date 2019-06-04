const WebSocketClient = require('websocket').client;

function live_price_token() {

  const client = new WebSocketClient();

  client.on('connect', (sock) => {

    sock.on('close', () => {});
    sock.on('error', console.error);
    sock.on('message', (data) => {
      console.log(data.utf8Data);
    });


    sock.sendUTF(JSON.stringify({
      op: 'subscribe',
      args: ['chat']
    }));

  });

  // client.connect('wss://api.ethfinex.com/ws/2');
  client.connect('wss://www.bitmex.com/realtime');
}

module.exports.live_price_token = live_price_token;
