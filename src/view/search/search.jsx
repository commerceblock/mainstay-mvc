import Axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import FaviconAddrBar from '../faviconAddrBar';
import FooterPage from '../footerPage';
import HamburgerMenu from '../hamburgerMenu';
import LatestAttestation from '../latestAttestation';
import LatestCommitment from '../latestCommitment';
import MainstayInfo from '../mainstayInfo';
import Navbar from '../navbar';
import React, { Component } from 'react';
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
              <span class="block-title">Block</span>
              <table>
                <tbody>
                <tr>
                  <td>Blockhash</td>
                  <td>{blockhash.blockhash}</td>
                </tr>
                <tr>
                  <td>Transaction_ID</td>
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


class Commitment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: ''
    };
  }

  show() {
    if (this.state.response === '')
      return 'Fail';
    const attestation = this.state.response.response.attestation;
    const merkleproof = this.state.response.response.merkleproof;
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
              <span class="block-title">Commitment</span>
              <table class="main-second-position-block" >
                <tbody>
                <tr>
                  <td>Position</td>
                  <td colSpan="2">{merkleproof.position}</td>

                </tr>
                <tr>
                  <td>TxID</td>
                  <td colspan="2">{attestation.txid}</td>

                </tr>

                <tr>
                  <td>Confirmed</td>
                  <td colspan="2"> {(attestation.confirmed) ? 'true': 'false'}</td>

                </tr>
                <tr>
                  <td>Inserted at</td>
                  <td colspan="2">{attestation.inserted_at}</td>

                </tr>

                <tr>
                  <td>MerkleRoot</td>
                  <td colspan="2">{merkleproof.merkle_root}</td>

                </tr>
                <tr>
                  <td>Commitment</td>
                  <td colspan="2">{merkleproof.commitment}</td>

                </tr>

                <tr>
                  <td rowspan={merkleproof.ops.length+1}>ops</td>


                </tr>
                {merkleproof.ops.map((op, i) =>
                    <tr>

                      <td>{(op.append) ? 'true': 'false'}</td>
                      <td>{op.commitment}</td>
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
    Axios.get("/api/v1/commitment/commitment?commitment=" + this.props.match.params.value)
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

class MerkleRoot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: ''
    };
  }

  show() {
    if (this.state.response === '')
      return 'Fail';
    const attestation = this.state.response.response.attestation;
    const merkle_commitment = this.state.response.response.merkle_commitment;
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
              <span class="block-title">MerkleRoot</span>

              <table>
                <tbody>
                <tr>
                  <td>Position </td>
                  <td>{merkle_commitment.position}</td>
                </tr>
                <tr>
                  <td>TxID</td>
                  <td>{attestation.txid}</td>
                </tr>
                <tr>
                  <td>Confirmed</td>
                  <td>{(attestation.confirmed) ? 'true': 'false'}</td>
                </tr>
                <tr>
                  <td>Inserted at</td>
                  <td>{attestation.inserted_at}</td>
                </tr>
                <tr>
                  <td>MerkleRoot</td>
                  <td>{merkle_commitment.merkle_root}</td>
                </tr>
                <tr>
                  <td>Commitment</td>
                  <td>{merkle_commitment.commitment}</td>
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
    Axios.get("/api/v1/merkleroot?merkle_root=" + this.props.match.params.value)
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
              <table class="main-firts-position">
                <tbody>
                <tr>
                  <td>Client Name: {this.state.response.response.client_name}</td>

                </tr>
                <tr>
                  <td>Position: {this.state.response.response.position[0].position}</td>

                </tr>
                </tbody>
              </table>
              <table class="main-second-position">
                <tbody>

                <h5>Commitments({this.state.response.response.position.length})</h5>

                {this.state.response.response.position.map((data) =>

                    <tr class="main-second-position-block">
                      <tr>
                        <td>Commitment</td>
                        <td colspan="2">{data.commitment}</td>

                      </tr>
                      <tr>
                        <td>MerkleRoot</td>
                        <td colspan="2">{data.merkle_root}</td>

                      </tr>
                      <tr>
                        <td rowspan={data.ops.length+1}>ops</td>
                      </tr>
                      {data.ops.map((op, i) =>
                          <tr>

                            <td>{(op.append) ? 'true': 'false'}</td>
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

class TransactionId extends Component {
  constructor(props){
    super(props);
    this.state = {
      response: ''
    }
  }

  show() {
    if (this.state.response === '')
      return 'Fail';

    console.log(this.state.response);

    const attestation = this.state.response.response.attestation;
    const attestationInfo = this.state.response.response.attestationInfo;
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
              <span class="block-title">Attestation Transaction</span>
              <table>

                <tbody>

                <tr>
                  <td>TxID</td>
                  <td>{attestation.txid}</td>
                </tr>
                <tr>
                  <td>Merkle_root</td>
                  <td>{attestation.merkle_root}</td>
                </tr>

                <tr>
                  <td>Confirmed</td>
                  <td>{(attestation.confirmed) ? 'true': 'false'}</td>
                </tr>
                <tr>
                  <td>Inserted_at</td>
                  <td>{attestation.inserted_at}</td>
                </tr>

                <tr>
                  <td>Amount</td>
                  <td>{attestationInfo.amount}</td>
                </tr>
                <tr>
                  <td>Blockhash</td>
                  <td>{attestationInfo.blockhash}</td>
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
    Axios.get("/api/v1/transaction?hash=" + this.props.match.params.value)
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

class Waiting extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>Page - Wait ...</div>
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

    if (value.query == undefined)
      return this.setState({page: page_undefined});
    if (/[0-9A-Fa-f]{64}/g.test(value.query) || /^\d+$/.test(value.query))
      Axios.get("/api/v1/type?value=" + value.query)
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
              {this.state.page}
            </div>
          </div>
          <FooterPage/>
        </div>
    );
  }
}

export { Position, Blockhash, Commitment, TransactionId, MerkleRoot };
export default Search;
