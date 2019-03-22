import React, { Component } from 'react';
import Axios from "axios";

import NoResult from './NoResult';
import { getRoute, routes } from "./routes";

class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
    }

    componentDidMount() {
        Axios.get('/api/v1/clients')
            .then(response => {
                this.setState({data: response.data});
            });
    }

    render() {
        return (
            <div>
                <div className="d-flex align-items-center">
                    <span className="block-title">Clients</span>
                </div>
                <div className="flex-table full-table col3">
                    {this.state.data ? (
                        <table width="100%">
                            <thead>
                            <tr>
                                <th><span className="lh1rem mr-auto">Position</span></th>
                                <th><span className="lh1rem mr-auto">Client name</span></th>
                                <th><span className="lh1rem ">Latest Commitment</span></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.data.map(data => (
                                <tr key={data.position} className="mono">
                                    <td>{data.position}</td>
                                    <td><span className="hash truncate-hash">{data.client_name}</span></td>
                                    <td>
                                        <a href={getRoute(routes.commitment, {value: data.commitment || '/'})}>
                                            <span className="hash truncate-hash">{data.commitment}</span>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : <NoResult />}
                </div>
            </div>
        )
    }
}

export default Client;
