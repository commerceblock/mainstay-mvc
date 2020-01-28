import React, {Component} from 'react';
import NotFound from './NotFound';
import {getRoute, routes} from "./routes";
import Pagination from "react-js-pagination";
import {Link} from 'react-router-dom';
import Flag from "./Flag";
import apiService from '../helpers/api-service';

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

    componentDidUpdate(prevProps) {
        if (this.props.match.params.value !== prevProps.match.params.value) {
            this.handlePageChange(1)
        }
    };

    handlePageChange = (pageNumber) => {
        this.fetchPage(pageNumber);
    };

    fetchPage = (page) => {
        apiService.axiosClient.get(`/api/v1/position?position=` + this.props.match.params.value + `&page=${page}`)
            .then(({data}) => {

                if (data?.data) {
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
            <>
                <div className="row">
                    <div className="col-lg-6 col-sm-12 position" data-controller="homepageMempool">

                        <h4 className="p-2 m-t-30 m-b-15 m-l-15">Client</h4>
                        <div className="flex-table col-md-6 col-sm-12">
                            <table width="100%" className="fw-500">
                                <tbody>
                                <tr>
                                    <th className="align-end">Name</th>
                                    <td colSpan="2">
                                        <span className="hash truncate-hash">{this.state.client}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="align-end">Position</th>
                                    <td colSpan="2">
                                        <span className="hash truncate-hash with-status">{this.state.position}</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="row position-commitment-table ">
                    <div className="col-lg-8 col-sm-12">
                        <div className="commitments_title">
                            <h4 className="p-2 m-b-15 m-l-15">Commitments({this.state.totalItemsCount})</h4>
                        </div>

                        <div className="mb-4 flex-table col-lg-12 col-sm-12">
                            <table width="100%" id="table">
                                <tr>
                                    <th>Commitment</th>
                                    <th className="head-half-width">TxId</th>
                                    <th className="lastHead">Time</th>
                                </tr>
                                <tbody>
                                {data.map(data => (
                                    <tr>
                                        <td>
                                            <Link to={getRoute(routes.commitment, {value: data.commitment})}>
                                                <span className="hash truncate-hash">{data.commitment}</span>
                                            </Link>
                                        </td>
                                        <td>

                                             <Link to={getRoute(routes.transation, {value: data.txid})}>
                                                <span className="hash truncate-hash">{data.txid}</span>
                                            </Link>

                                        </td>
                                        <td><span>{data.date}</span></td>
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
            </>
        );
    }
}

export default Position;
