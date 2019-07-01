import Axios from "axios";
import React, { Component } from "react";
import NotFound from './NotFound';
import { routes, getRoute } from "./routes";
import Flag from "./Flag";


class MerkleRoot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isReady: false,
        };
    }

    componentDidMount() {
        Axios.get(`/api/v1/merkleroot?merkle_root=${this.props.match.params.value}`)
            .then(({ data, error }) => {
                if (data) {
                    this.setState({ data: data.response });
                }
                this.setState({ isReady: true });
            });
    }

    render() {
        const { isReady, data } = this.state;
        if (!isReady) {
            return null;
        }
        if (!data) {
            const errorMessage = `A merkle Root with ${this.props.match.params.value} id does not exist`;
            return <NotFound message={errorMessage} />;
        }
        const { attestation: { txid, merkle_root, confirmed, inserted_at }, merkle_commitment } = data;
        return (
            <div className="full-table" data-controller="homepageMempool">
                <h4 className="p-2 m-t-30 m-b-15 m-l-15">MerkleRoot</h4>
                <div className="flex-table col-md-7 col-sm-12">
                    <table width="100%">
                        <tbody>
                        <tr>
                            <th className="align-end">MerkleRoot</th>
                            <td colSpan="2">
                                <a href={getRoute(routes.merkle, {value: merkle_root})}>
                                    <span className="hash truncate-hash">{merkle_root}</span>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th className="align-end">TxID</th>
                            <td colSpan="2">
                                <a href={getRoute(routes.transation, {value: txid})}>
                                    <span className="hash truncate-hash">{txid}</span>
                                </a>
                                <Flag
                                    label={confirmed ? 'Confirmed' : 'Pending'}
                                    viewType={confirmed ? 'success': 'info'}
                                    className="m-l-15"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className="align-end">Time</th>
                            <td>{inserted_at}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="commitments_title">
                    <h5 className="align-items-center m-l-15">Commitments ({merkle_commitment.length})</h5>
                </div>
                <div className="mb-4 flex-table col-md-7 col-sm-12">
                    <table width="100%">
                        <thead>
                            <tr className="head-table-row">
                                <th className="lh2rem p-l-10">Position</th>
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
