import Axios from 'axios';
import React, {Component} from 'react';
import NotFound from './NotFound';
import {getRoute, routes} from "./routes";
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';

class Position extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isReady: false,
            activePage: 1,
            totalItemsCount: 10
        };
    }

    componentDidMount() {
        this.fetchPage(1)
    }

    handlePageChange = (pageNumber) => {
        this.fetchPage(pageNumber);
    };

    fetchPage = (page) => {
        Axios.get(`/api/v1/position?position=` + this.props.match.params.value + `&page=${page}`)
            .then(({data}) => {

                if (data?.data) {
                    console.log(data);
                    this.setState({
                        data: data.data,
                        position: data.position,
                        client: data.client_name,
                        activePage: page,
                        totalItemsCount: data.total,

                        isReady: true,

                    });
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
            const errorMessage = `A position with ${this.props.match.params.value} id does not exist`;
            return <NotFound message={errorMessage}/>;
        }
        return (
            <div className="row">
                <div className="col-lg-6 col-sm-12 m-t-30" data-controller="homepageMempool">
                    <h4 className="p-2 m-t-30 m-b-15 m-l-15">Position: {this.state.position}</h4>

                    <div className="commitments_title">
                        <h5 className="align-items-center m-l-15">Commitments({this.state.totalItemsCount})</h5>
                    </div>

                    <div className="mb-4 flex-table col-lg-12 col-sm-12">
                        <table width="100%" id="table">
                            <tr>
                                <th>Commitment</th>
                                <th>Date</th>
                            </tr>
                            <tbody>
                            {data.map(data => (
                                <tr>
                                    <td>
                                        <Link to={getRoute(routes.commitment, {value: data.commitment})}>
                                            <span className="hash truncate-hash">{data.commitment}</span>
                                        </Link>
                                    </td>
                                    <td><span className="hash truncate-hash">{data.date}</span></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex justify-content-center">
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={this.state.totalItemsCount}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                            itemClass='page-item'
                            linkClass='page-link'
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Position;