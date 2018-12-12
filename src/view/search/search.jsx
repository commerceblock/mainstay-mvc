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

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined
    };
    this.request();
  }

  request() {
    const value = QueryString.parse(this.props.location.search);

    if (value.query == undefined)
      return ; /// ERROR

    if (HEXA.test(value.query))
      Axios.get("/api/v1/type?hash=" + value.query)
      .then(response => { console.log(response) });
    else if (NUMBER.test(value.query))
      Axios.get()
      .then(response => { console.log(response) });
    else
      ;
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
            <h1>{ this.state.data }</h1>
          </div>
        </div>
        <FooterPage/>
      </div>
    );
  }
}

export default Search;
