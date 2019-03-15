import Axios from "axios/index";
import React, { Component } from "react";

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
            <div className="row" data-controller="homepageMempool">
                <table className="main-firts-position searchTable">
                    <tbody>
                    <tr>
                        <td>Client Name: {client_name}</td>
                    </tr>
                    <tr>
                        <td>Position: {position[0].position}</td>
                    </tr>
                    </tbody>
                </table>

                <div className="commitments_title">
                    <h6 className="align-items-center">Commitments({position.length})</h6>
                </div>
                <table className="main-second-position searchTable">
                    <tbody>
                    {position.map((data) =>

                        <tr className="main-second-position-block">
                            <tr>
                                <td>Commitment</td>
                                <td colSpan="2">{data.commitment}</td>
                            </tr>
                            <tr>
                                <td>MerkleRoot</td>
                                <td colSpan="2">{data.merkle_root}</td>
                            </tr>
                            <tr>
                                <td rowSpan={data.ops.length + 1} className="tabelOpsName">ops</td>
                            </tr>
                            {data.ops.map((op, i) =>
                                <tr>
                                    <td>{(op.append) ? 'true' : 'false'}</td>
                                    <td>{op.commitment}</td>
                                </tr>
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Position;