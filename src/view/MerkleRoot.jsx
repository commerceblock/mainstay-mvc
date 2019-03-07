import Axios from "axios";
import React, { Component } from "react";

class MerkleRoot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: null,
        };
    }

    componentDidMount() {
        Axios.get("/api/v1/merkleroot?merkle_root=" + this.props.match.params.value)
            .then(({ data, error }) => {
                if (data) {
                    this.setState({ response: data.response });
                }
            });
    }

    render() {
        const { response } = this.state;
        if (!this.state.response) {
            return 'Fail';
        }
        const { attestation, merkle_commitment } = response;
        return (
            <div className="row" data-controller="homepageMempool">
                <span className="block-title">MerkleRoot</span>
                <span className="block-subtitle">MerkleRoot: {attestation.merkle_root}</span>
                <table className="searchTable ">
                    <tbody>
                    <tr>
                        <td>TxID</td>
                        <td>{attestation.txid}</td>
                    </tr>
                    <tr>
                        <td>Confirmed</td>
                        <td>{(attestation.confirmed) ? 'true' : 'false'}</td>
                    </tr>
                    <tr>
                        <td>Inserted at</td>
                        <td>{attestation.inserted_at}</td>
                    </tr>
                    </tbody>
                </table>

                <div className="commitments_title">
                    <h6 className="align-items-center">Commitments({merkle_commitment.length})</h6>
                </div>

                <table className="main-second-position searchTable MerkleRootTable">
                    {merkle_commitment.map((data) =>
                        <tbody>
                        <tr>
                            <td className="positionField">Position</td>
                            <td>{data.position}</td>
                        </tr>
                        <tr>
                            <td>Commitment</td>
                            <td colSpan="2">{data.commitment}</td>
                        </tr>
                        </tbody>
                    )}
                </table>
            </div>
        );
    }
}

export default MerkleRoot;
