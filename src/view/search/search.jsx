import Axios from 'axios';
import FaviconAddrBar from '../faviconAddrBar';
import FooterPage from '../footerPage';
import HamburgerMenu from '../hamburgerMenu';
import LatestAttestation from '../latestAttestation';
import LatestCommitment from '../latestCommitment';
import MainstayInfo from '../mainstayInfo';
import Navbar from '../navbar';
import React, { Component } from 'react';
import QueryString from 'query-string';

const HEXA = /[0-9A-Fa-f]{64}/g;
const NUMBER = /^\d+$/;

const page_waiting = () => {
  return (<div>Wait</div>);
}

const page_commitment = () => {
  return (<div>Commitment</div>);
}

const page_merkle_root = () => {
  return (<div>Merkle Root</div>);
}

const page_txid = () => {
  return (<div>txid</div>);
}

const page_type_unknown = () => {
  return (<div>Type Unknown</div>);
}

const page_undefined = () => {
  return (<div>Undefined</div>);
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: page_waiting()
    };
  }

  componentWillMount() {
    const value = QueryString.parse(this.props.location.search);
    if (value.query == undefined)
      return this.setState({page: 'undefined'});
    if (HEXA.test(value.query) || NUMBER.test(value.query))
      Axios.get("/api/v1/type?value=" + value.query)
      .then(res => this.setState({page: res.data.response}));
  }

  componentDidUpdate(prevProps, prevState) {}

  componentDidMount() {
    if (this.state.page === 'commitment')
      this.setState((prevState, props) => {page: page_commitment()});
    else if (this.state.page === 'merkle_root')
      this.setState((prevState, props) => {page: page_merkle_root()});
    else if (this.state.page === 'txid')
      this.setState((prevState, props) => {page: page_txid()});
    else if (this.state.page === 'type unknown')
      this.setState((prevState, props) => {page: page_type_unknown()});
    else if (this.state.page === 'undefined')
      this.setState((prevState, props) => {page: page_undefined()});
    else
      this.setState((prevState, props) => {page: <div>RIP The missing DATA</div>});
  }

  render() {
    return (
      <div class="top-nav">
        <div class="container">
          <div class="d-flex align-items-center flex-wrap">
            <FaviconAddrBar/>
            <Navbar/>
            <HamburgerMenu/>
          </div>
        </div>
        <div class="container main" data-controller="main">
          <div class="row" data-controller="homepageMempool">
            { this.state.page }
          </div>
        </div>
        <FooterPage/>
      </div>
    );
  }
}

export default Search;
