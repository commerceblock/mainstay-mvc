import Axios from 'axios';
import React, {Component} from 'react';
import NotFound from './NotFound';
import {getRoute, routes} from "./routes";
import Pagination from "react-js-pagination";

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
            <div className="full-table" data-controller="homepageMempool">
                <span className="block-title">Client</span>
                <span
                    className="block-subtitle h3 hash truncate-hash"><strong>Name:</strong> {this.state.client}</span>
                <span className="block-subtitle h3 hash truncate-hash"><strong>Position:</strong> {this.state.position}</span>
                <div className="commitments_title">
                    <h5 className="align-items-center">Commitments({data.length})</h5>
                </div>
                <div className="mb-3 flex-table">
                    {data.map((data, index) =>
                        <table
                            key={`position-${index}-${this.state.position}`}
                            className="main-second-position flex-table"
                            width="100%">
                            <tbody>
                            <tr>
                                <th colSpan="2">Commitment</th>
                                <td colSpan="3">
                                    <a href={getRoute(routes.commitment, {value: data.commitment})}>
                                        <span className="hash truncate-hash">{data.commitment}</span>
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    )}</div>
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
        );
    }
}

export default Position;