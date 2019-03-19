import Axios from 'axios';
import React, { Component } from 'react';
import Pagination from "react-js-pagination";

class Attestation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1
        };
    }

    componentDidMount() {
        this.fetchPage(1)
    }

    handlePageChange = (pageNumber) => {
        this.fetchPage(pageNumber);
    };

    fetchPage = (page) => {
        const failedArg = '&failed=true' ? this.props.match.params?.value === 'showFailed' : '';

        Axios.get(`/ctrl/latestattestation?page=${page}${failedArg}`)
            .then(response => this.setState({
                data: response.data['data'],
                activePage: page,
                totalItemsCount: response.data['total']
            }));
    };

    render() {
        return (
            <div className="column lastAttestationPage">
                <div className="d-flex align-items-center">
                    <span className="block-title">Attestations</span>
                </div>
                <div className="mb-3 flex-table latestAttestation">
                    <table width="100%">
                        <thead>
                        <tr className="mr-auto">
                            <th>Txid</th>
                            <th>MerkleRoot</th>
                            <th>Confirmed</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.data.map(({ txid, merkle_root, confirmed, age }) =>
                            <tr key={txid}>
                                <td>
                                    <a
                                        className="hash truncate-hash keyboard-target"
                                        href={`/tx/${txid}`}
                                        title={txid}
                                    >
                                        {txid}
                                    </a>
                                </td>
                                <td>
                                    <a
                                        className="hash truncate-hash keyboard-target"
                                        href={`/merkle_root/${merkle_root}`}
                                        title={merkle_root}
                                    >
                                        {merkle_root}
                                    </a>
                                </td>
                                <td>
                                    <span className="mono text-right ml-1">{`${!!confirmed}`}</span>
                                </td>
                                <td>
                                    <span className="mono text-right ml-1">{age}</span>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-center">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={20}
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