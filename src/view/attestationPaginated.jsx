import Axios from 'axios';
import React, { Component } from 'react';
import Pagination from "react-js-pagination";

class AttestationPaginated extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1
        };
        this.request(1);

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(pageNumber) {
        this.request(pageNumber);
    }

    request(page) {
        let failedArg = ''
        if (this.props.props.match.params.value && this.props.props.match.params.value == "showFailed") {
            failedArg = '&failed=true'
        }

        Axios.get('/ctrl/latestattestation?page=' + page + failedArg)
            .then(response => this.setState({
                data: response.data['data'],
                activePage: page,
                totalItemsCount: response.data['total']
            }));
    }

    render() {
        return (
            <div className="column lastAttestationPage">
                <div className="d-flex align-items-center">
                    <h4>Attestations</h4>
                </div>
                <div className="mb-3 flex-table latestAttestation head-table">
                    <table width="100%">
                        <thead>
                        <th><span className="lh1rem mr-auto">Txid</span></th>
                        <th><span className="lh1rem mr-auto">MerkleRoot</span></th>
                        <th><span className="lh1rem ">Confirmed</span></th>
                        <th><span className="lh1rem mr-auto">Date</span></th>
                        </thead>
                    </table>
                </div>
                <div className="mb-3 flex-table latestAttestation">
                    <table width="100%">
                        <tbody>
                        {this.state.data.map((data) =>
                            <tr>
                                <td>
                                    <a className="hash truncate-hash keyboard-target"
                                       href={`/tx/${data.txid}`}
                                       title={data.txid}>{data.txid}
                                    </a>
                                </td>
                                <td>
                                    <a className="hash truncate-hash keyboard-target"
                                       href={`/tx/${data.merkle_root}`}
                                       title={data.merkle_root}>{data.merkle_root}
                                    </a>
                                </td>
                                <td>
                                    <span className="mono text-right ml-1">{(data.confirmed) ? "true" : "false"}</span>
                                </td>
                                <td>
                                    <span className="mono text-right ml-1">{data.age}</span>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                <div class="d-flex justify-content-center">
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

export default AttestationPaginated;