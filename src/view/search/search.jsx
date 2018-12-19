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


// Attestation
//
// | merkle_root | txid | confirmed | inserted_at |
//
// AttestationInfo
//
// | txid | amount | blockhash | time |
//
// ClientCommitment
//
// | client_position | commitment |
//
// ClientDetails
//
// | client_position | auth_token | pubkey |
//
// MerkleCommitment
//
// | client_position | merkle_root | commitment |
//
// MerkleProof
//
// | client_position | merkle_root | commitment | ops [{append,commitment},{append,commitment}]}
//

const waiting = (<div>Page - Wait ...</div>);

// Attestation(1 row), MerkleProof(1 row)

class Commitment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: ''
    }
  }

  show() {
    if (this.state.response === '')
      return 'Fail';
      console.log(this.state.response);
    return (
      <td>
        <tr>
          <td>Commitment</td>
        </tr>
        <tr>
          <td>Attestation</td>
        </tr>
        <tr>
          <td>MerkleRoot</td>
          <td>{this.state.response.response.attestation.merkle_root}</td>
        </tr>
        <tr>
          <td>Transaction ID</td>
          <td>{this.state.response.response.attestation.txid}</td>
        </tr>
        <tr>
          <td>Confirmed</td>
          <td>{(this.state.response.response.attestation.confirmed) ? 'true': 'false'}</td>
        </tr>
        <tr>
          <td>Inserted at</td>
          <td>{this.state.response.response.attestation.inserted_at}</td>
        </tr>
        <tr>
          <td>MerkleProof</td>
        </tr>
        <tr>
          <td>Position</td>
          <td>{this.state.response.response.merkleproof.position}</td>
        </tr>
        <tr>
          <td>MerkleRoot</td>
          <td>{this.state.response.response.merkleproof.merkle_root}</td>
        </tr>
        <tr>
          <td>Commitment</td>
          <td>{this.state.response.response.merkleproof.commitment}</td>
        </tr>
        <tr>
          <td>ops</td>
        </tr>
        <tr>
          <td>Append</td>
          <td>{(this.state.response.response.merkleproof.ops[0].append) ? 'true': 'false'}</td>
        </tr>
        <tr>
          <td>Commitment</td>
          <td>{this.state.response.response.merkleproof.ops[0].commitment}</td>
        </tr>
        <tr>
          <td>Append</td>
          <td>{(this.state.response.response.merkleproof.ops[1].append) ? 'true': 'false'}</td>
        </tr>
        <tr>
          <td>Commitment</td>
          <td>{this.state.response.response.merkleproof.ops[1].commitment}</td>
        </tr>
      </td>
    );
  }

  componentWillMount() {
    Axios.get("/api/v1/commitment/commitment?commitment=" + this.props.query)
    .then(response => { this.setState({ response: response.data }) });
  }

  render() {
    return (
      <div>
        <table width="100%">{this.show()}</table>
      </div>
    );
  }
}

// Attestation(1 row), MerkleCommitment(all rows) data

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

// txid: Attestation(1 row), AttestationInfo(1 row) data

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

const position = (<div>Page - Position</div>);



const type_unknown = (<div>Page - Type Unknown</div>);

const undefined = (<div>Page - Undefined</div>);


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: waiting,
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
          this.setState({page: <Commitment query={value.query}/> });
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
