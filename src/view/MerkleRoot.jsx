import Axios from "axios";
import React, { Component } from "react";
import { routes, getRoute } from "./routes";

class MerkleRoot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
    }

    componentDidMount() {
        Axios.get("/api/v1/merkleroot?merkle_root=" + this.props.match.params.value)
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
        const { attestation: { txid, merkle_root, confirmed, inserted_at }, merkle_commitment } = data;
        return (
            <div className="full-table" data-controller="homepageMempool">
                <span className="block-title">MerkleRoot</span>
                <span className="block-subtitle h3 hash truncate-hash"><strong>MerkleRoot:</strong> {merkle_root}</span>
                <div className="flex-table">
                    <table width="100%">
                        <tbody>
                        <tr>
                            <th>TxID</th>
                            <td><a href={getRoute(routes.transation, {value: txid})}>
                                <span className="hash truncate-hash">{txid}</span></a>
                            </td>
                        </tr>
                        <tr>
                            <th>Confirmed</th>
                            <td>{`${!!confirmed}`}</td>
                        </tr>
                        <tr>
                            <th>Inserted at</th>
                            <td>{inserted_at}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="commitments_title">
                    <h5 className="align-items-center">Commitments ({merkle_commitment.length})</h5>
                </div>
                <div className="mb-4 flex-table">
                    <table width="100%">
                        <thead>
                            <tr>
                                <th className="lh2rem">Position</th>
                                <th className="lh2rem">Commitment</th>
                            </tr>
                        </thead>
                        <tbody>
                        {merkle_commitment.map(({ position, commitment }) =>
                            <tr key={commitment}>
                                <td>{position}</td>
                                <td colSpan="2">
                                    <a href={getRoute(routes.commitment, { value: commitment })}>
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

export default MerkleRoot;
