var WebSocketClient = require('websocket').client;

const CONNECT = 'connect';
const ERROR = 'error';
const CLOSE = 'close';
const MESSAGE = 'message';

function live_price_token() {


  var client = new WebSocketClient();

  client.on(CONNECT, (sock) => {

    sock.on(CLOSE, () => {});
    sock.on(ERROR, (error) => {});
    sock.on(MESSAGE, (data) => {
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
