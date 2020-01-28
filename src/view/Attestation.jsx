import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';
import apiService from '../helpers/api-service';

class Attestation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            isReady: false,
        };
    }

    componentDidMount() {
        this.fetchPage(1)
    }

    handlePageChange = (pageNumber) => {
        this.fetchPage(pageNumber);
    };

    fetchPage = (page) => {
        const failedArg = this.props.match.params?.value === 'showFailed' ? '&failed=true' : '';

        apiService.axiosClient.get(`/ctrl/latestattestation?page=${page}${failedArg}`)
            .then(({ data }) => {
                if (data?.data) {
                    this.setState({
                        data: data.data,
                        activePage: page,
                        totalItemsCount: data.total,
                        isReady: true,
                        itemsPerPage: data.limit
                    });
                }
                this.setState({ isReady: true, activePage: page });
            });
    };

    render() {
        const { data, isReady, activePage } = this.state;
        if (!isReady) {
            return null;
        }
        if (!data) {
            const errorMessage = `The ${activePage} for the attestation list does not exist`;
            return <NotFound message={errorMessage}/>;
        }
        return (
            <div className="col-lg-8 col-sm-12 attestationPage">
                <div className="d-flex align-items-center">
                    <h4 className="p-2 m-t-30 m-b-15">Attestations</h4>
                </div>
                <div className="mb-3 flex-table latestAttestation attestation">
                    <table width="100%" id="table">
                        <tr>
                            <th>Txid</th>
                            <th>Merkle Root</th>
                            <th>Confirmed</th>
                            <th>Time UTC</th>
                        </tr>
                        <tbody>
                        {data.map(({ txid, merkle_root, confirmed, age }) =>
                            <tr key={txid}>
                                <td>
                                    <Link
                                        className="hash truncate-hash keyboard-target"
                                        to={`/tx/${txid}`}
                                        title={txid}
                                    >
                                        {txid}
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        className="hash truncate-hash keyboard-target"
                                        to={`/merkle_root/${merkle_root}`}
                                        title={merkle_root}
                                    >
                                        {merkle_root}
                                    </Link>
                                </td>
                                <td>
                                    <span className="text-right ml-1">{`${!!confirmed}`}</span>
                                </td>
                                <td>
                                    <span className="text-right ml-1">{age}</span>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-center attestationPage-table">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsPerPage}
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

export default Attestation;
