import Axios from 'axios';
import React, { Component } from 'react';

class LatestAttestationInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            fee: 0
        };
    }

    componentDidMount() {
        this.fetchInfo();
    }

    fetchInfo = () => {
        Axios.get('/ctrl/latestattestationinfo')
            .then(({ data }) => {
                let feeSum = 0;
                data.forEach((d, i) => {
                    if (i < data.length - 1) {
                        const feeDiff = data[i + 1].amount - d.amount;
                        // check for diffs larger than zero so that fee sum
                        // is not negative when there is a topup transaction
                        if (feeDiff > 0)
                            feeSum += feeDiff;
                    }
                });

                this.setState({ data: data[0], fee: feeSum / (data.length - 1) });
            });
    };

    render() {
        const { data, fee } = this.state;

        if (!data) {
            return (
                <div className="mb-3 flex-table">
                    <div className="d-flex justify-content-end header">
                        <span className="lh1rem mr-auto">Blockhash</span>
                        <span className="lh1rem text-right ml-1"></span>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <div className="mb-3 flex-table">
                    <div className="d-flex justify-content-end header">
                        <span className="lh1rem mr-auto">Blockhash</span>
                        <span className="lh1rem text-right ml-1">{this.state.data.blockhash}</span>
                    </div>
                </div>
                <div className="mb-3 flex-table">
                    <div className="d-flex justify-content-end header">
                        <span className="lh1rem mr-auto">Latest Txid</span>
                        <span className="lh1rem text-right ml-1">{this.state.data.txid}</span>
                    </div>
                </div>
                <div className="mb-3 flex-table">
                    <div className="d-flex justify-content-end header">
                        <span className="lh1rem mr-auto">Time</span>
                        <span className="lh1rem text-right ml-1">{this.state.data.time}</span>
                    </div>
                </div>
                <div className="mb-3 flex-table">
                    <div className="d-flex justify-content-end header">
                        <span className="lh1rem mr-auto">Amount</span>
                        <span className="lh1rem text-right ml-1">{this.state.data.amount / 100000000} BTC</span>
                    </div>
                </div>
                <div className="mb-3 flex-table">
                    <div className="d-flex justify-content-end header">
                        <span className="lh1rem mr-auto">Average Fee</span>
                        <span className="lh1rem text-right ml-1">{this.state.fee / 100000000} BTC</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default LatestAttestationInfo;
