import Axios from "axios";
import React, { Component } from "react";
import { getRoute, routes } from "./routes";

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
        if (!data) {
            return 'Fail';
        }
        const { attestation: { txid, merkle_root, confirmed, inserted_at }, attestationInfo: { amount, blockhash }  } = data;
        return (
            <div className="column" data-controller="homepageMempool">
                <span className="block-title">Attestation Transaction</span>
                <span className="block-subtitle">TxID: {txid}</span>
                <div className="flex-table">
                    <table width="100%">
                        <tbody>
                        <tr>
                            <th>Merkle_root</th>
                            <td>{merkle_root}</td>
                        </tr>
                        <tr>
                            <th>Confirmed</th>
                            <td>{`${!!confirmed}`}</td>
                        </tr>
                        <tr>
                            <th>Inserted at</th>
                            <td>{inserted_at}</td>
                        </tr>
                        <tr>
                            <th>Amount at</th>
                            <td>{amount}</td>
                        </tr>
                        <tr>
                            <th>Blockhash</th>
                            <td>{blockhash}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Transaction;
