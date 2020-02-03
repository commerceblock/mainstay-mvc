import React from 'react';
import LatestAttestationInfo from './LatestAttestationInfo';
import Sockette from 'sockette';

class MainstayInfo extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            channel: 0,
            priceBTC: 0,
        };

        this.ws = new Sockette('wss://api-pub.bitfinex.com/ws/2', {
            timeout: 5e3,
            maxAttempts: 10,
            onopen: e => console.log('Connected!', e),
            onmessage: e => this.message(e.data),
            onreconnect: e => console.log('Reconnecting...', e),
            onmaximum: e => console.log('Stop Attempting!', e),
            onclose: e => console.log('Closed!', e),
            onerror: e => console.log('Error:', e)
        });
    }

    message(data) {
        data = JSON.parse(data);
        if (data.event === 'info') {
            this.ws.send('{"event":"subscribe","channel":"trades","symbol":"tBTCUSD"}');
        }
        if (data.event === 'subscribed' && data.channel === 'trades') {
            this.setState({channel: data.chanId});
        }
        if (Array.isArray(data)) {
            if (Array.isArray(data[1])) {
                if (data[0] === this.state.channel) {
                    this.setState({priceBTC: data[1][0][3]});
                }
            } else if (data[1] === 'te' || data[1] === 'tu') {
                if (data[0] === this.state.channel) {
                    this.setState({priceBTC: data[2][3]});
                }
            }
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <h4 className="table-title customTitleStyle">Overview</h4>
                </div>
                <div className="col-12">
                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                        <LatestAttestationInfo priceBTC={this.state.priceBTC} />
                    </div>
                </div>
            </div>
        );
    }
}

export default MainstayInfo;
