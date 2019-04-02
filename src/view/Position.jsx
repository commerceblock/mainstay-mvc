import Axios from 'axios';
import React, {Component} from 'react';
import NotFound from './NotFound';
import {getRoute, routes} from "./routes";

class Position extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isReady: false,
        };
    }

    componentWillMount() {
        Axios.get("/api/v1/position?position=" + this.props.match.params.value)
            .then(({data}) => {
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
            const errorMessage = `A position with ${this.props.match.params.value} id does not exist`;
            return <NotFound message={errorMessage}/>;
        }
        const {position, client_name} = data;
        return (
            <div className="full-table" data-controller="homepageMempool">
                <span className="block-title">Client</span>
                <span className="block-subtitle h3 hash truncate-hash"><strong>Name:</strong> {client_name}</span>
                <span className="block-subtitle h3 hash truncate-hash"><strong>Position:</strong> {position[0].position}</span>
                <div className="commitments_title">
                    <h5 className="align-items-center">Commitments({position.length})</h5>
                </div>
                {position.map((data, index) =>
                    <table
                        key={`position-${index}-${data.position}`}
                        className="main-second-position flex-table"
                        width="100%"
                    >
                        <tbody>
                        <tr>
                            <th colSpan="2">Commitment</th>
                            <td colSpan="3">
                                <a href={getRoute(routes.commitment, {value: data.commitment})}>
                                    <span className="hash truncate-hash">{data.commitment}</span>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th colSpan="2">MerkleRoot</th>
                            <td colSpan="3">
                                <a href={getRoute(routes.merkle, {value: data.merkle_root})}>
                                    <span className="hash truncate-hash">{data.merkle_root}</span>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th rowSpan={data.ops.length + 1} className="tabelOpsName">ops</th>
                        </tr>
                        {data.ops.map((op, i) =>
                            <tr key={`ops${i}`}>
                                <td>{(op.append) ? 'true' : 'false'}</td>
                                <td>
                                    <a href={getRoute(routes.commitment, {value: op.commitment})}>
                                        <span className="hash truncate-hash">{op.commitment}</span>
                                    </a>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default Position;