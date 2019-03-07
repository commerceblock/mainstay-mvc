import Axios from 'axios';
import FaviconAddrBar from '../Logo';
import FooterPage from '../Footer';
import HamburgerMenu from '../hamburgerMenu';
import LatestAttestation from '../latestAttestation';
import LatestCommitment from '../latestCommitment';
import MainstayInfo from '../mainstayInfo';
import Navbar from '../navbar';
import React, {Component} from 'react';
import QueryString from 'query-string';

class Blockhash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: ''
        }
    }

    show() {
        if (this.state.response === '')
            return 'Fail';
        const blockhash = this.state.response.response.blockhash;
        return (
            <div className="top-nav">
                <div className="container">
                    <div className="d-flex align-items-center flex-wrap">
                        <FaviconAddrBar/>
                        <Navbar/>
                        <HamburgerMenu/>
                    </div>
                </div>
                <div className="container main" data-controller="main">
                    <div className="row" data-controller="homepageMempool">
                        <span className="block-title">Block</span>
                        <span className="block-subtitle">Blockhash: {blockhash.blockhash}</span>
                        <table className="searchTable">
                            <tbody>
                            <tr>
                                <td>Txid</td>
                                <td>{blockhash.txid}</td>
                            </tr>
                            <tr>
                                <td>Amount</td>
                                <td>{blockhash.amount} BTC</td>
                            </tr>

                            <tr>
                                <td>Time</td>
                                <td>{blockhash.time}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <FooterPage/>
            </div>
        );
    }

    componentWillMount() {
        Axios.get("/api/v1/blockhash?hash=" + this.props.match.params.value)
            .then(response => {
                this.setState({response: response.data})
            });
    }

    render() {
        return (
            <div>
                <table width="100%">{this.show()}</table>
            </div>
        );
    }
}



class Position extends Component {
    constructor(props) {
        super(props)
        this.state = {
            response: ''
        };
    }

    show() {
        if (this.state.response === '')

            return 'Fail';
        return (
            <div className="top-nav">
                <div className="container">
                    <div className="d-flex align-items-center flex-wrap">
                        <FaviconAddrBar/>
                        <Navbar/>
                        <HamburgerMenu/>
                    </div>
                </div>
                <div className="container main" data-controller="main">
                    <div className="row" data-controller="homepageMempool">
                        <table className="main-firts-position searchTable">
                            <tbody>
                            <tr>
                                <td>Client Name: {this.state.response.response.client_name}</td>

                            </tr>
                            <tr>
                                <td>Position: {this.state.response.response.position[0].position}</td>

                            </tr>
                            </tbody>
                        </table>


                        <div className="commitments_title">
                            <h6 className="align-items-center">Commitments({this.state.response.response.position.length})</h6>
                        </div>

                        <table className="main-second-position searchTable">
                            <tbody>
                            {this.state.response.response.position.map((data) =>

                                <tr className="main-second-position-block">
                                    <tr>
                                        <td>Commitment</td>
                                        <td colspan="2">{data.commitment}</td>

                                    </tr>
                                    <tr>
                                        <td>MerkleRoot</td>
                                        <td colspan="2">{data.merkle_root}</td>

                                    </tr>
                                    <tr>
                                        <td rowspan={data.ops.length + 1} className="tabelOpsName">ops</td>
                                    </tr>
                                    {data.ops.map((op, i) =>
                                        <tr>

                                            <td>{(op.append) ? 'true' : 'false'}</td>
                                            <td>{op.commitment}</td>
                                        </tr>
                                    )}

                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <FooterPage/>
            </div>
        );
    }

    componentWillMount() {
        Axios.get("/api/v1/position?position=" + this.props.match.params.value)
            .then(response => {
                this.setState({response: response.data})
            });
    }

    render() {
        return (
            <div>
                <table width="100%">{this.show()}</table>
            </div>
        );
    }
}

class Waiting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: QueryString.parse(location.search)
        }

    }

    render() {
        return (

            <div className="row" data-controller="homepageMempool">
                <div className="col-md-12">
                    <div className="alert alert-danger ">
                        Search does not match any valid client position, attestation transaction
                        id or commitment hash, for query: {this.state.value.query}
                    </div>
                </div>

                <MainstayInfo/>
                <div className="col-md-6  home-left">
                    <LatestAttestation/>
                    <LatestCommitment/>
                </div>
            </div>
        );
    }
}

const type_unknown = (<div>Page - Type Unknown</div>);

const undefined = (<div>Page - Undefined</div>);

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: <Waiting/>,
        };
    }

    componentDidMount() {
        const {history, location} = this.props;

        const value = QueryString.parse(location.search);

        if (value.query === undefined)
            return this.setState({page: page_undefined});
        if (/[0-9A-Fa-f]{64}/g.test(value.query) || /^\d+$/.test(value.query))
            Axios.get("/ctrl/type?value=" + value.query)
                .then(response => {
                    if (response.data.response === 'commitment')
                        this.props.history.replace(`/commitment/${value.query}`)
                    else if (response.data.response === 'merkle_root')
                        this.props.history.replace(`/merkle_root/${value.query}`)
                    else if (response.data.response === 'position')
                        this.props.history.replace(`/position/${value.query}`)
                    else if (response.data.response === 'txid')
                        this.props.history.replace(`/tx/${value.query}`)
                    else if (response.data.response === 'blockhash')
                        this.props.history.replace(`/block/${value.query}`)
                    else if (response.data.response === 'type unknown')
                        this.setState({page: type_unknown()});
                    else
                        this.setState({page: undefined()});
                });
    }

    render() {
        return this.state.page;
    }
}

export { Position, Blockhash };
export default Search;
