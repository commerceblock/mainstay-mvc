import Axios from "axios/index";
import React, { Component } from "react";
import { getRoute, routes } from "./routes";

class Commitment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
    }

    componentDidMount() {
        Axios.get("/api/v1/commitment/commitment?commitment=" + this.props.match.params.value)
            .then(({ data }) => {
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
        const { 
            merkleproof: { commitment, position, merkle_root, ops },
            attestation: { txid, confirmed, inserted_at }
        } = data;
        return (
            <div className="full-table" data-controller="homepageMempool">
                <span className="block-title">Commitment</span>
                <span className="block-subtitle hash truncate-hash h3"><strong>Hash:</strong> {commitment}</span>
                <div className="flex-table">
                    <table className="main-second-position-block" width="100%">
                        <tbody>
                        <tr>
                            <th>Position</th>
                            <td colSpan="2"><span className="hash truncate-hash">{position}</span></td>
                        </tr>
                        <tr>
                            <th>TxID</th>
                            <td colSpan="2">
                                <a href={getRoute(routes.transation, {value: txid})}>
                                    <span className="hash truncate-hash">{txid}</span>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th>Confirmed</th>
                            <td colSpan="2"> {`${!!confirmed}`}</td>
                        </tr>
                        <tr>
                            <th>Inserted at</th>
                            <td colSpan="2">{inserted_at}</td>
                        </tr>
                        <tr>
                            <th>MerkleRoot</th>
                            <td colSpan="2">
                                <a href={getRoute(routes.merkle, {value: merkle_root})}>
                                    <span className="hash truncate-hash">{merkle_root}</span>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th rowSpan={ops.length + 1} className="tabelOpsName">ops</th>
                        </tr>
                        {ops.map(({ commitment, append }) =>
                            <tr key={commitment}>
                                <td>{`${!!append}`}</td>
                                <td>
                                    <a href={getRoute(routes.commitment, {value: commitment})}>
                                        <span className="hash truncate-hash">{commitment}</span>
                                    </a>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Commitment;
