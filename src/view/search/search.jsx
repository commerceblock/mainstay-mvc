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

const waiting = (<div>Page - Wait ...</div>);

const commitment = () => {
  return (
    <div>
      <table width="100%">
        <tr>
          <td>
            Info Commitment
          </td>
        </tr>
      </table>
    </div>
  );
}

const merkle_root = () => {
  return (
    <div>
      <table width="100%">
        <tr>
          <td>
            Info Merkle Root
          </td>
        </tr>
      </table>
    </div>
  );
}

const txid = () => {
  return (
    <div>
      <table width="100%">
        <tr>
          <td>
            Transaction ID
          </td>
        </tr>
      </table>
    </div>
  );
}

const type_unknown = (<div>Page - Type Unknown</div>);

const undefined = (<div>Page - Undefined</div>);

const position = (<div>Page - Position</div>);

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: page_waiting,
    };
  }

  componentDidMount() {
    const value = QueryString.parse(this.props.location.search);
    if (value.query == undefined)
      return this.setState({page: page_undefined});
    if (/[0-9A-Fa-f]{64}/g.test(value.query))
      Axios.get("/api/v1/type?value=" + value.query)
      .then(response => {
        if (response.data.response === 'commitment')
          this.setState({page: commitment()});
        else if (response.data.response === 'merkle_root')
          this.setState({page: merkle_root()});
        else if (response.data.response === 'txid')
          this.setState({page: page_txid()});
        else if (response.data.response === 'type unknown')
          this.setState({page: type_unknown()});
        else
          this.setState({page: undefined()});
      });
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
