import Axios from "axios";
import React, { Component } from "react";

class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }

    componentWillMount() {
        Axios.get("/api/v1/attestation?txid=" + this.props.match.params.value)
            .then(({ data, error }) => {
                if (data) {
                    this.setState({ data: data.response });
                }
            });
    }

    render() {
        const { data } = this.state;
        return data ? (
            <div className="row" data-controller="homepageMempool">
                <span className="block-title">Attestation Transaction</span>
                <span className="block-subtitle">TxID: {data.attestation.txid}</span>
                <table className="searchTable" width="100%">
                    <tbody>
                    <tr>
                        <td>Merkle_root</td>
                        <td>{data.attestation.merkle_root}</td>
                    </tr>
                    <tr>
                        <td>Confirmed</td>
                        <td>{(data.attestation.confirmed) ? 'true' : 'false'}</td>
                    </tr>
                    <tr>
                        <td>Inserted_at</td>
                        <td>{data.attestation.inserted_at}</td>
                    </tr>
                    <tr>
                        <td>Amount</td>
                        <td>{data.attestationInfo.amount}</td>
                    </tr>
                    <tr>
                        <td>Blockhash</td>
                        <td>{data.attestationInfo.blockhash}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        ) : 'Fail';
    }
}

export default Transaction;
