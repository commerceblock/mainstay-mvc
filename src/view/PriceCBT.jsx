import React, { Component } from 'react';
import Sockette from 'sockette'

class PriceCBT extends Component {
  constructor() {
    super();
    this.state = {
      channel: 0,
      priceCBT: 0,
      ws: new Sockette('wss://api.ethfinex.com/ws/2', {
        timeout: 5e3,
        maxAttempts: 10,
        onopen: e => console.log('Connected!', e),
        onmessage: e => this.message(e.data),
        onreconnect: e => console.log('Reconnecting...', e),
        onmaximum: e => console.log('Stop Attempting!', e),
        onclose: e => console.log('Closed!', e),
        onerror: e => console.log('Error:', e)
      })
    }
  }

  message(data) {
    data = JSON.parse(data);
    if (data.event === "info")
      this.state.ws.send('{"event":"subscribe","channel":"trades","symbol":"tBTCUSD"}');
    if (data.event === "subscribed" && data.channel === "trades")
      this.setState({channel: data.chanId});
    if (Array.isArray(data)) {
      if (Array.isArray(data[1])) {
        if (data[0] === this.state.channel)
          this.setState({priceCBT: data[1][0][3]});
      } else if (data[1] === 'te' || data[1] === 'tu')
        if (data[0] === this.state.channel)
          this.setState({priceCBT: data[2][3]});
    }
  }

  render() {
    return (
      <div className="mb-3 flex-table">
          <div className="d-flex justify-content-end header">
              <span className="lh1rem mr-auto">Price</span>
              <span className="lh1rem text-right ml-1">{this.state.priceCBT} $</span>
          </div>
      </div>
    );
  }
}

export default PriceCBT;
