import Axios from "axios";
import React, { Component } from "react";
import { getRoute, routes } from "./routes";
import NotFound from "./NotFound";
import Flag from './Flag';

class Commitment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isReady: false,
        };
    }

    componentDidMount() {
        Axios.get(`/api/v1/commitment/commitment?commitment=${this.props.match.params.value}`)
            .then(({ data }) => {
                if (data?.response) {
                    this.setState({ data: data.response, isReady: true });
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
            const errorMessage = `A commitment with ${this.props.match.params.value} id does not exist`;
            return <NotFound message={errorMessage} />;
        }
        const { 
            merkleproof: { commitment, position, merkle_root, ops },
            attestation: { txid, confirmed, inserted_at }
        } = data;
        return (
            <div className="row">
                <div className="col-lg-6 col-sm-12" data-controller="homepageMempool">
                    <h4 className="p-2 m-t-30 m-b-15 m-l-15">Commitment</h4>
                    <div className="flex-table">
                        <table className="main-second-position-block" width="100%">
                            <tbody>
                            <tr>
                                <th className="align-end">Position</th>
                                <td colSpan="2"><span className="hash truncate-hash">{position}</span></td>
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
                                <th className="align-end">Inserted at</th>
                                <td colSpan="2">{inserted_at}</td>
                            </tr>
                            <tr>
                                <th className="align-end">MerkleRoot</th>
                                <td colSpan="2">
                                    <a href={getRoute(routes.merkle, {value: merkle_root})}>
                                        <span className="hash truncate-hash">{merkle_root}</span>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th rowSpan={ops.length + 1} className="align-end">Ops</th>
                            </tr>
                            {ops.map(({ commitment, append }) =>
                                <tr key={commitment}>
                                    <td><Flag label={`${!!append}`} viewType={!!append ? 'success' : 'danger'}/></td>
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
            </div>
        );
    }
}

export default Commitment;
