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
                <div className="d-flex align-items-center justify-content-between">
                    <h4 className="p-2 customTitleStyle">Latest Commitment</h4>
                    <a
                        href={routes.client}
                        className="pl-2 keyboard-target non-underline "
                        data-keynav-priority
                    >
                        <small className="color-primary">View All &rarr;</small>
                    </a>
                </div>
                <div className="mb-3 flex-table home-table commitment head-table">
                    <table width="100%">
                        <thead>
                            <tr>
                                <th><span className="lh1rem">Pos.</span></th>
                                <th><span className="lh1rem">Commitment</span></th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="mb-3 flex-table home-table commitment">
                    <table width="100%">
                        <tbody>
                        {this.state.data.map(data =>
                            <tr key={data.commitment}>
                                <td>
                                    <span>
                                      {data.position}
                                    </span>
                                </td>
                                <td>
                                    <a className="hash truncate-hash keyboard-target latestCommitementStyle"
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
