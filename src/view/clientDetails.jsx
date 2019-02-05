import Axios from 'axios';
import React, {Component} from 'react';

class ClientDetails extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
        };
    }

    componentWillMount() {
        Axios.get('/api/v1/clients')
            .then(response => {
                console.log(response);
                this.setState({data: response.data})
            });
    }

    render() {

        if (!this.state.data) {
            return (
                <div class="mb-3 flex-table">
                    <div class="d-flex justify-content-end header">
                        <span class="lh1rem mr-auto">Clients</span>
                    </div>
                </div>
            );
        }
        return (

            <div className="column lastAttestationPage">
                <div className="d-flex align-items-center">
                    <h4>Clients</h4>
                </div>

                <div className="mb-3 flex-table latestAttestation">
                    <table width="100%">
                        <thead>
                        <th><span className="lh1rem mr-auto">Position</span></th>
                        <th><span className="lh1rem mr-auto">Client name</span></th>
                        <th><span className="lh1rem ">Latest Commitment</span></th>
                        </thead>
                        <tbody>
                        {this.state.data.map((data) =>
                            <tr>
                                <td>
                                    <span className="mono text-right ml-1">{data.position}</span>
                                </td>
                                <td>
                                    <span className="mono text-right ml-1">{data.client_name}</span>
                                </td>
                                <td>
                                    <span className="mono text-right ml-1">{data.commitment}</span>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        )

    }
}

export default ClientDetails;
