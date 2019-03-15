import React, { Component } from 'react';
import Axios from 'axios';

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
            return 'Empty';
        }
        const { blockhash, txid, time, amount } = data;
        return (
            <div className="flex-table mb-4">
                <table width="100%">
                    <tbody className="fs14 lh2rem ">
                        <tr>
                            <th>Blockhash</th>
                            <td className="text-right">{blockhash}</td>
                        </tr>
                        <tr>
                            <th>Latest Txid</th>
                            <td className="text-right">{txid}</td>
                        </tr>
                        <tr>
                            <th>Time</th>
                            <td className="text-right">{time}</td>
                        </tr>
                        <tr>
                            <th>Amount</th>
                            <td className="text-right">{amount / 100000000} BTC</td>
                        </tr>
                        <tr>
                            <th>Fee</th>
                            <td className="text-right">{fee} BTC</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}


export default LatestAttestationInfo;
