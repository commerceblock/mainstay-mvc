import Axios from "axios";
import React, {Component} from "react";
import NotFound from './NotFound';
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
            <div className="full-table" data-controller="homepageMempool">
                <span className="block-title">Attestation Transaction</span>
                <span className="block-subtitle hash truncate-hash h3"><strong>TxID:</strong> {txid}</span>
                <div className="flex-table">
                    <table className="main-second-position-block" width="100%">
                        <tbody>
                        <tr>
                            <th>Merkle_root</th>
                            <td colSpan="2">
                                <a href={getRoute(routes.merkle, {value: merkle_root})}>
                                    <span className="hash truncate-hash">{merkle_root}</span>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th>Confirmed</th>
                            <td colSpan="2"><span className="hash truncate-hash">{`${!!confirmed}`}</span></td>
                        </tr>
                        <tr>
                            <th>Inserted at</th>
                            <td colSpan="2">{inserted_at}</td>
                        </tr>
                        <tr>
                            <th>Amount at</th>
                            <td>{amount}</td>
                        </tr>
                        <tr>
                            <th>Blockhash</th>
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
        );
    }
}

export default Transaction;
