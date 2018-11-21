import axios from 'axios'
import React from 'react';
import Sockette from 'sockette'

const URL = 'http://127.0.0.1'
const CTRL_LATEST_ATTESTATION = '/ctrl/latestattestation'
const CTRL_LATEST_COMMITMENT = '/ctrl/latestcommitment'

const FaviconAddrBar = () => {
  return (
    <div class="d-flex align-items-center">
      <div class="col-sm-auto">
        <a href="/" class="dcricon-decred no-underline"></a>
      </div>
    </div>
  );
}

const Navbar = () => {
  return (
    <div class="col pl-2">
      <form class="navbar-form" role="search" id="search-form" action="/search">
        <div class="input-group">
          <input
            tabindex="0"
            type="text"
            name="search"
            id="search"
            class="form-control top-search mousetrap"
            placeholder="Search for blocks, addresses or transactions"
          />
        </div>
      </form>
    </div>
  );
}

const Menu = () => {
  return (
    <div id="menu">
      <a data-keynav-skip href="/" title="Home">Home</a>
      <a data-keynav-skip href="/blocks" title="Decred blocks">Blocks</a>
      <a data-keynav-skip href="/mempool" title="Decred mempool">Mempool</a>
      <a data-keynav-skip href="/charts" title="Decred Charts">Charts</a>
      <a data-keynav-skip href="/parameters" title="Chain Parameters">Parameters</a>
      <a data-keynav-skip href="/agendas" title="Agendas">Agendas</a>
      <a data-keynav-skip href="/decodetx" title="Decode or send a raw transaction">Decode/Broadcast Tx</a>
      <a data-keynav-skip href="http://testnet.dcrdata.org/" title="Home">Switch To Testnet</a>
      <a data-keynav-skip data-turbolinks="false" href="javascript:toggleSun()" class="jsonly"><span id="sun-icon" class="dcricon-sun-fill no-underline pr-2"></span> Night Mode</a>
    </div>
  );
}

const HamburgerMenu = () => {
  return (
    <nav role="navigation" id="hamburger-menu" data-turbolinks-permanent>
      <div id="menuToggle">
        <input type="checkbox" id="menuToggleCheckbox"/>
        <span class="patty"></span>
        <span class="patty"></span>
        <span class="patty short"></span>
        <Menu/>
      </div>
    </nav>
  );
}

const TotalSupplyCBT = () => {
  return (
    <div class="mb-3 flex-table">
      <div class="d-flex justify-content-end header">
        <span class="lh1rem mr-auto">Total Supply</span>
        <span class="lh1rem text-right ml-1">173,256,686 CBT</span>
      </div>
    </div>
  );
}

const MarketcapCBT = () => {
  return (
    <div class="mb-3 flex-table">
      <div class="d-flex justify-content-end header">
        <span class="lh1rem mr-auto">Marketcap</span>
        <span class="lh1rem text-right ml-1">2,197,934 $</span>
      </div>
    </div>
  );
}

class PriceCBT extends React.Component {
  constructor() {
    super();
    this.state = {
      channel: 0,
      priceCBT: 0,
      ws: new Sockette('wss://api.ethfinex.com/ws/2', {
        timeout: 5e3,
        maxAttempts: 10,
        onopen: e => console.log('Connected!', e),
        onmessage: e => this.message(e.data),
        onreconnect: e => console.log('Reconnecting...', e),
        onmaximum: e => console.log('Stop Attempting!', e),
        onclose: e => console.log('Closed!', e),
        onerror: e => console.log('Error:', e)
      })
    }
  }

  message(data) {
    data = JSON.parse(data);
    if (data.event === "info")
      this.state.ws.send('{"event":"subscribe","channel":"trades","symbol":"tBTCUSD"}');
    if (data.event === "subscribed" && data.channel === "trades")
      this.setState({channel: data.chanId});
    if (Array.isArray(data)) {
      if (Array.isArray(data[1])) {
        if (data[0] === this.state.channel)
          this.setState({priceCBT: data[1][0][3]});
      } else if (data[1] === 'te' || data[1] === 'tu')
        if (data[0] === this.state.channel)
          this.setState({priceCBT: data[2][3]});
    }
  }

  render() {
    return (
      <div class="mb-3 flex-table">
        <div class="d-flex justify-content-end header">
          <span class="lh1rem mr-auto">Price</span>
          <span class="lh1rem text-right ml-1">{this.state.priceCBT} $</span>
        </div>
      </div>
    );
  }
}

const InfoLatestTxid = () => {
  return (
    <div class="mb-3 flex-table">
      <div class="d-flex justify-content-end header">
        <span class="lh1rem mr-auto">Txid</span>
        <span class="lh1rem text-right ml-1">b5c4571e98e869f67592b4ef57cce97988ed8fcf3de041c8b6a13034e94e91c7</span>
      </div>
    </div>
  );
}

const InfoLatestBlockHash = () => {
  return (
    <div class="mb-3 flex-table">
      <div class="d-flex justify-content-end header">
        <span class="lh1rem mr-auto">Txid</span>
        <span class="lh1rem text-right ml-1">b5c4571e98e869f67592b4ef57cce97988ed8fcf3de041c8b6a13034e94e91c7</span>
      </div>
    </div>
  );
}

const InfoFees = () => {
  return (
    <div class="mb-3 flex-table">
      <div class="d-flex justify-content-end header">
        <span class="lh1rem mr-auto">Fees</span>
        <span class="lh1rem text-right ml-1">0.01</span>
      </div>
    </div>
  );
}

const MainstayInfo = () => {
  return (
    <div class="col-md-6">
      <div class="d-flex align-items-center">
        <h3 class="mt-2">Mainstay</h3>
      </div>
      <div>
        <table class="mb-3 col">
          <TotalSupplyCBT/>
          <MarketcapCBT/>
          <PriceCBT/>
          <InfoLatestTxid/>
          <InfoFees/>
        </table>
      </div>
    </div>
  );
}

class LatestAttestation extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.requestCtlrLatestAttestation();
  }

  requestCtlrLatestAttestation() {
    axios.get(URL + CTRL_LATEST_ATTESTATION)
      .then(response => this.setState({data: response.data}));
  }

  render() {
  return (
    <div>
      <div class="d-flex align-items-center">
        <h4>Latest Attestation</h4>
        <a href="/mempool" class="pl-2 keyboard-target" data-keynav-priority>
          <small>see more ...</small>
        </a>
      </div>
      <div class="mb-3 flex-table">
        <div class="d-flex justify-content-end header">
          <span class="lh1rem mr-auto">Txid</span>
          <span class="lh1rem mr-auto">MerkleRoot</span>
          <span class="lh1rem mr-auto">Confirmed</span>
          <span class="lh1rem mr-auto">Age</span>
        </div>
        <div class="transactions md-height-rows rows">
          { this.state.data.map((data) =>
          <div class="d-flex flex-table-row">
            <a class="hash truncate-hash keyboard-target" href={`/tx/${data.txid}`} title={data.txid}>{data.txid}</a>
            <a class="hash truncate-hash keyboard-target" href={`/tx/${data.merkle_root}`} title={data.merkle_root}>{data.merkle_root}</a>
            <span class="mono text-right ml-1">{(data.confirmed)?"true":"false"}</span>
            <span class="mono text-right ml-1">{data.age}</span>
            </div>
          )}
        </div>
      </div>
    </div>
    );
  }
}

class LatestCommitment extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.requestCtlrLatestCommitment();
  }

  requestCtlrLatestCommitment() {
    axios.get(URL + CTRL_LATEST_COMMITMENT)
      .then(response => this.setState({data: response.data}));
  }

  render() {
  return (
    <div>
      <div class="d-flex align-items-center">
        <h4>Latest Commitment</h4>
        <a href="/mempool" class="pl-2 keyboard-target" data-keynav-priority>
          <small>see more ...</small>
        </a>
      </div>
      <div class="mb-3 flex-table">
        <div class="d-flex justify-content-end header">
          <span class="lh1rem mr-auto">Position</span>
          <span class="lh1rem mr-auto">MerkleRoot</span>
          <span class="lh1rem mr-auto">Confirmed</span>
        </div>
      <div class="transactions md-height-rows rows">
        { this.state.data.map((data) =>
        <div class="d-flex flex-table-row">
          <span class="mono text-right ml-1">{data.position}</span>
          <a class="hash truncate-hash keyboard-target" href={`/tx/${data.merkle_root}`} title={data.merkle_root}>{data.merkle_root}</a>
          <a class="hash truncate-hash keyboard-target" href={`/tx/${data.commitment}`} title={data.commitment}>{data.commitment}</a>
        </div>
        )}
      </div>
    </div>
  </div>
    );
  }
}

const FooterPage = () => {
  return (
    <footer class="navbar-fixed-bottom">
      <div class="container wrapper text-center">
        <div>
          <a class="nav-item" href="https://github.com/commerceblock/mainstay-mvc/blob/develop/LICENSE" target="_blank">© 2019 CommerceBlock-Limited</a>
        </div>
        <div>
          <span data-turbolinks-permanent class="nav-item" id="connection" title="While connected, you will receive live page updates and, if enabled, desktop notifications (click to enable)." >Connecting to WebSocket...<div></div></span>
        </div>
      </div>
    </footer>
  );
}

class Home extends React.Component {
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
            <MainstayInfo/>
            <div class="col-md-6">
              <LatestAttestation/>
              <LatestCommitment/>
            </div>
          </div>
        </div>
        <FooterPage/>
      </div>
    );
  }
}

export default Home;
