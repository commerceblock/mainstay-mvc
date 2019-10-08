import React, { Component } from 'react';
import { routes, getRoute } from "./routes";
import { Link } from 'react-router-dom';
import apiService from '../helpers/api-service';

class LatestCommitment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        apiService.axiosClient.get('/ctrl/latestcommitment')
            .then(response => this.setState({data: response.data}));
    }

    render() {
        return (
            <div className="column">
                <div className="d-flex align-items-center justify-content-between">
                    <h4 className="p-2 customTitleStyle">Latest Commitment</h4>
                    <Link
                        to={routes.client}
                        className="pl-2 keyboard-target non-underline "
                        data-keynav-priority
                    >
                        <small className="color-primary">View All &rarr;</small>
                    </Link>
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
                                    <Link
                                          to={getRoute(routes.position, { value: data.position })}
                                          title={data.position}>{data.position}
                                    </Link>
                                </td>
                                <td>
                                    <Link className="hash truncate-hash keyboard-target latestCommitementStyle"
                                       to={getRoute(routes.commitment, { value: data.commitment })}
                                       title={data.commitment}>{data.commitment}
                                    </Link>
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
