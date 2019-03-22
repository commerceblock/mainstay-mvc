import Axios from "axios/index";
import React, { Component } from "react";
import { getRoute, routes } from "./routes";

class Position extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
    }

    componentWillMount() {
        Axios.get("/api/v1/position?position=" + this.props.match.params.value)
            .then(({data}) => {
                this.setState({data: data.response})
            });
    }

    render() {
        const { data } = this.state;
        if (!data) {
            return 'Fail';
        }
        const { position, client_name } = data;
        return (
            <div className="full-table" data-controller="homepageMempool">
                <table className="main-firts-position searchTable">
                    <tbody>
                    <tr>
                        <th>Client Name: {client_name}</th>
                    </tr>
                    <tr>
                        <th>Position: {position[0].position}</th>
                    </tr>
                    </tbody>
                </table>
                <div className="commitments_title">
                    <h6 className="align-items-center">Commitments({position.length})</h6>
                </div>
                {position.map((data) =>
                    <table className="main-second-position flex-table" width="100%">
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
                            <tr>
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