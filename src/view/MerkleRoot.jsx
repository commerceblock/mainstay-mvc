import React, {Component} from "react";
import NotFound from './NotFound';
import {routes, getRoute} from "./routes";
import Flag from "./Flag";
import {Link} from 'react-router-dom';
import apiService from '../helpers/api-service';

class MerkleRoot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isReady: false,
        };
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.value !== prevProps.match.params.value) {
            this.fetchData()
        }
    };

    fetchData = () => {
        apiService.axiosClient.get(`/api/v1/merkleroot?merkle_root=${this.props.match.params.value}`)
            .then(({data, error}) => {
                if (data) {
                    this.setState({data: data.response});
                }
                this.setState({isReady: true});
            });
    };

    render() {
        const {isReady, data} = this.state;
        if (!isReady) {
            return null;
        }
        if (!data) {
            const errorMessage = `A merkle Root with ${this.props.match.params.value} id does not exist`;
            return <NotFound message={errorMessage}/>;
        }
        const {attestation: {txid, merkle_root, confirmed, inserted_at}, merkle_commitment} = data;
        return (
            <>
                <div className="row">
                    <div className="col-lg-7 col-sm-12 markleRoot" data-controller="homepageMempool">
                        <h4 className="p-2 m-t-30 m-b-15 m-l-15">Merkle Root</h4>
                        <div className="flex-table m-l-15">
                            <table width="100%" className="fw-500">
                                <tbody>
                                <tr>
                                    <th className="align-end">Merkle Root</th>
                                    <td colSpan="2">
                                        <Link to={getRoute(routes.merkle, {value: merkle_root})}>
                                            <span className="hash truncate-hash">{merkle_root}</span>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="align-end">Txid</th>
                                    <td colSpan="2">
                                        <Link to={getRoute(routes.transation, {value: txid})}>
                                            <span className="hash truncate-hash with-status">{txid}</span>
                                        </Link>
                                        <Flag
                                            label={confirmed ? 'Confirmed' : 'Pending'}
                                            viewType={confirmed ? 'success' : 'info'}
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
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-md-6 col-sm-12">
                        <div className="commitments_title">
                            <h4 className="p-2 m-t-30 m-b-15 m-l-15">Commitments ({merkle_commitment.length})</h4>
                        </div>
                        <div className="mb-4 flex-table m-l-15">
                            <table width="100%">
                                <thead>
                                <tr className="head-table-row">
                                    <th className="lh2rem p-l-10">Pos.</th>
                                    <th className="lh2rem p-l-10">Commitment</th>
                                </tr>
                                </thead>
                                <tbody>
                                {merkle_commitment.map(({position, commitment}) =>
                                    <tr key={commitment}>
                                        <td>
                                            <Link
                                                to={getRoute(routes.position, {value: position})}
                                                title={position}>{position}
                                            </Link>
                                        </td>
                                        <td colSpan="2">
                                            <Link to={getRoute(routes.commitment, {value: commitment})}>
                                                <span className="hash truncate-hash">{commitment}</span>
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

export default MerkleRoot;
