import React, {Component} from 'react';
import NoResult from './NoResult';
import {getRoute, routes} from "./routes";
import { Link } from 'react-router-dom';
import apiService from '../helpers/api-service';

class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
    }

    componentDidMount() {
        apiService.axiosClient.get('/api/v1/clients')
            .then(({data}) => {
                if (!!data) {
                    this.setState({data, isReady: true});
                }
                this.setState({isReady: true});
            });
    }

    render() {
        const {isReady, data} = this.state;
        if (!isReady) {
            return null;
        }
        return (
            <div className="clientsPage">
                <div className="col-lg-8 col-sm-12">
                    <div className="d-flex align-items-center">
                        <h4 className="p-2 m-t-30 m-b-15">Clients</h4>
                    </div>
                    <div className="mb-3 flex-table">
                        <table width="100%" id="table">
                            <tr className="head-table-row">
                                <th className=" p-l-10 ">Pos.</th>
                                <th>Name</th>
                                <th className="">Commitment</th>
                            </tr>

                            {data.map(data =>
                                <tr key={data.position}>
                                    <td>
                                        <Link
                                            to={getRoute(routes.position, { value: data.position })}
                                            title={data.position}>{data.position}
                                        </Link>
                                    </td>
                                    <td><span className="hash truncate-hash">{data.client_name}</span></td>
                                    <td colSpan="2">
                                        <Link to={getRoute(routes.commitment, {value: data.commitment || '/'})}>
                                            <span className="hash truncate-hash">{data.commitment}</span>
                                        </Link>
                                    </td>
                                </tr>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Client;
