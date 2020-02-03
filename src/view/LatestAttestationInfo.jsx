import React, {Component} from 'react';
import {getRoute, routes} from './routes';
import {Link} from 'react-router-dom';
import apiService from '../helpers/api-service';
import PropTypes from 'prop-types';

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
        apiService.axiosClient.get('/ctrl/latestattestationinfo')
            .then(({data}) => {
                let feeSum = 0;
                data.forEach((d, i) => {
                    if (i < data.length - 1) {
                        const feeDiff = data[i + 1].amount - d.amount;
                        // check for diffs larger than zero so that fee sum
                        // is not negative when there is a topup transaction
                        if (feeDiff > 0) {
                            feeSum += feeDiff;
                        }
                    }
                });

                this.setState({
                    data: data[0],
                    fee: feeSum / (data.length - 1)
                });
            });
    };

    render() {
        const {data, fee} = this.state;

        if (!data) {
            return (
                <>
                    <div className="overview-item">
                        <div>
                            <p>Block Hash</p>
                            <Link to={'/'} className="truncate-hash">f072…e1c8</Link>
                        </div>
                    </div>
                    <div className="overview-item">
                        <div>
                            <p>Latest Txid</p>
                            <Link to={'/'} className="truncate-hash">f072…e1c8</Link>
                        </div>
                    </div>
                    <div className="overview-item">
                        <div>
                            <p>Average Fee (BTC)</p>
                            <strong>0.00003584 BTC</strong>
                        </div>
                    </div>
                    <div className="overview-item">
                        <div>
                            <p>Average Fee (USD)</p>
                            <strong>0.34 USD</strong>
                        </div>
                    </div>

                    <div className="overview-item overview-item--time">
                        <p>Time</p>
                        <p>10:28:05 10/29/2019 UTC</p>
                    </div>
                </>
            );
        }
        const {blockhash, txid, time, amount} = data;
        const amountUsd = ((amount / 100000000) * this.props.priceBTC).toFixed(2);
        const feeUsd = ((fee / 100000000) * this.props.priceBTC).toFixed(2);

        return (
            <>
                <div className="overview-item">
                    <div>
                        <p>Block Hash</p>
                        <Link to={getRoute(routes.block, {value: blockhash})}
                              className="truncate-hash">{blockhash.slice(0, 4)}...{blockhash.slice(-4)}</Link>
                    </div>
                </div>
                <div className="overview-item">
                    <div>
                        <p>Latest Txid</p>
                        <Link to={getRoute(routes.transation, {value: txid})}
                              className="truncate-hash">{txid.slice(0, 4)}...{txid.slice(-4)}</Link>
                    </div>
                </div>
                <div className="overview-item">
                    <div>
                        <p>Average Fee (BTC)</p>
                        <strong>{(fee / 100000000).toFixed(8)} BTC</strong>
                    </div>
                </div>
                <div className="overview-item">
                    <div>
                        <p>Average Fee (USD)</p>
                        <strong>{feeUsd} USD</strong>
                    </div>
                </div>
                <div className="overview-item">
                    <div>
                        <p>Time (UTC)</p>
                        <strong>{time}</strong>
                    </div>
                </div>

                {/*<div className="overview-item">*/}
                {/*    <div>*/}
                {/*        <p>BTC Price</p>*/}
                {/*        <strong>{(this.props.priceBTC).toFixed(2)} USD</strong>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="overview-item">*/}
                {/*    <div>*/}
                {/*        <p>Staychain Balance</p>*/}
                {/*        <strong>{amount / 100000000} BTC</strong>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </>
        );
    }
}

LatestAttestationInfo.propTypes = {
    priceBTC: PropTypes.number
};

export default LatestAttestationInfo;
