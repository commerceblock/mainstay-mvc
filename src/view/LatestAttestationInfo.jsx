import Axios from 'axios';
import React, {Component} from 'react';
import {getRoute, routes} from "./routes";
import {Link} from 'react-router-dom';

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
            .then(({data}) => {
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

                this.setState({data: data[0], fee: feeSum / (data.length - 1)});
            });
    };

    render() {
        const {data, fee} = this.state;

        if (!data) {
            return (
                <>
                    <tr>
                        <td>
                            <div className="mb-3 flex-table">
                                <div className="d-flex justify-content-end header">
                                    <span className="lh1rem mr-auto">Block Hash</span>
                                    <span className="lh1rem text-right ml-1"></span>
                                </div>
                            </div>
                        </td>
                    </tr>
                </>
            );
        }
        const {blockhash, txid, time, amount} = data;
        return (
            <>
                <tr>
                    <th className="align-end">Block Hash</th>
                    <td colSpan="2">
                        <Link to={getRoute(routes.block, {value: blockhash})}>
                            <span className="hash truncate-hash">{blockhash}</span>
                        </Link>
                    </td>
                </tr>
                <tr>
                    <th className="align-end">Latest Txid</th>
                    <td colSpan="2">
                        <Link to={getRoute(routes.transation, {value: txid})}>
                            <span className="hash truncate-hash">{txid}</span>
                        </Link>
                    </td>
                </tr>
                <tr>
                    <th className="align-end">Time</th>
                    <td colSpan="2">{time}</td>
                </tr>
                <tr>
                    <th className="align-end">Amount</th>
                    <td colSpan="2">{amount / 100000000} BTC</td>
                </tr>
                <tr>
                    <th className="align-end">Average Fee</th>
                    <td colSpan="2">{(fee / 100000000).toFixed(8)} BTC</td>
                </tr>
            </>
        );
    }
}

export default LatestAttestationInfo;
