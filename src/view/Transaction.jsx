import Axios from "axios";
import React, {Component} from "react";
import NotFound from './NotFound';
import Flag from './Flag';
import {getRoute, routes} from "./routes";


class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isReady: false,
        }
    }

    componentWillMount() {
        Axios.get("/api/v1/attestation?txid=" + this.props.match.params.value)
            .then(({data, error}) => {
                if (data?.response) {
                    this.setState({data: data.response, isReady: true});
                }
                this.setState({isReady: true});
            });
    }

    render() {
        const {isReady, data} = this.state;
        if (!isReady) {
            return null;
        }
        if (!data) {
            const errorMessage = `An attestation with ${this.props.match.params.value} id does not exist`;
            return <NotFound message={errorMessage}/>;
        }
        const {attestation: {txid, merkle_root, confirmed, inserted_at}, attestationInfo: {amount, blockhash}} = data;
        return (
            <div className="row" data-controller="homepageMempool">
                <div className="col-lg-6 col-sm-12">
                    <h4 className="p-2 m-t-30 m-b-15 m-l-15">Attestation Transaction</h4>
                    <div className="flex-table">
                        <table className="main-second-position-block" width="100%">
                            <tbody>
                            <tr>
                                <th className="align-end">TxID</th>
                                <td colSpan="2">
                                    <a href={getRoute(routes.transation, {value: txid})}>
                                        <span className="hash truncate-hash">{txid}</span>
                                    </a>
                                    <Flag
                                        label={confirmed ? 'Confirmed' : 'Pending'}
                                        viewType={confirmed ? 'success' : 'info'}
                                        className="m-l-15"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th className="align-end">Merkle_root</th>
                                <td colSpan="2">
                                    <a href={getRoute(routes.merkle, {value: merkle_root})}>
                                        <span className="hash truncate-hash">{merkle_root}</span>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th className="align-end">Inserted at</th>
                                <td colSpan="2">{inserted_at}</td>
                            </tr>
                            <tr>
                                <th className="align-end">Amount at</th>
                                <td>{amount}</td>
                            </tr>
                            <tr>
                                <th className="align-end">Blockhash</th>
                                {blockhash && blockhash !== "" ? (
                                    <td colSpan="2">
                                        <a href={getRoute(routes.block, {value: blockhash})}>
                                            <span className="hash truncate-hash">{blockhash}</span>
                                        </a>
                                    </td>
                                ) : (
                                    <td colSpan="2">
                                        <span className="hash truncate-hash"></span>
                                    </td>
                                )}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Transaction;
