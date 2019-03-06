import Axios from "axios/index";
import React, { Component } from "react";

class Commitment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
    }

    componentDidMount() {
        Axios.get("/api/v1/commitment/commitment?commitment=" + this.props.match.params.value)
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
                <span className="block-title">Commitment</span>
                <span className="block-subtitle">Hash: {data.merkleproof.commitment}</span>
                <table className="main-second-position-block searchTable">
                    <tbody>
                    <tr>
                        <td>Position</td>
                        <td colSpan="2">{data.merkleproof.position}</td>
                    </tr>
                    <tr>
                        <td>TxID</td>
                        <td colSpan="2">{data.attestation.txid}</td>
                    </tr>
                    <tr>
                        <td>Confirmed</td>
                        <td colSpan="2"> {(data.attestation.confirmed) ? 'true' : 'false'}</td>
                    </tr>
                    <tr>
                        <td>Inserted at</td>
                        <td colSpan="2">{data.attestation.inserted_at}</td>
                    </tr>
                    <tr>
                        <td>MerkleRoot</td>
                        <td colSpan="2">{data.merkleproof.merkle_root}</td>
                    </tr>
                    <tr>
                        <td rowSpan={data.merkleproof.ops.length + 1} className="tabelOpsName">ops</td>
                    </tr>
                    {data.merkleproof.ops.map(op =>
                        <tr key={op.commitment}>
                            <td>{(op.append) ? 'true' : 'false'}</td>
                            <td>{op.commitment}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        ): 'Fail';
    }
}

export default Commitment;
