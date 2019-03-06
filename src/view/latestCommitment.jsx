import Axios from 'axios';
import React, { Component } from 'react';
import { routes, getRoute } from "./routes";

class LatestCommitment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        Axios.get('/ctrl/latestcommitment')
            .then(response => this.setState({ data: response.data }));
    }

    render() {
        return (
            <div className="column">
                <div className="d-flex align-items-center">
                    <h4>Latest Commitment</h4>
                    <a href={routes.client} className="pl-2 keyboard-target" data-keynav-priority>
                        <small>see more ...</small>
                    </a>
                </div>
                <div className="mb-3 flex-table LatestCommitment head-table">
                    <table width="100%">
                        <thead>
                        <th><span className="lh1rem ">Position</span></th>
                        <th><span className="lh1rem ">Commitment</span></th>
                        </thead>
                    </table>
                </div>
                <div className="mb-3 flex-table LatestCommitment">
                    <table width="100%">
                        <tbody>
                        {this.state.data.map(data =>
                            <tr>
                                <td>
                                    <span className="lastCommitement mono text-right ml-1">
                                      {data.position}
                                    </span>
                                </td>
                                <td>
                                    <a className="lastCommitement hash truncate-hash keyboard-target"
                                       href={getRoute(routes.commitment, { value: data.commitment })}
                                       title={data.commitment}>{data.commitment}
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

export default LatestCommitment;
