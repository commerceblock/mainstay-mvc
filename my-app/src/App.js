import React, { Component } from 'react';

const FaviconAddrBar = () => {
  return (
    <div className="d-flex align-items-center">
      <div className="col-sm-auto">
        <a href="/" className="dcricon-decred no-underline"></a>
      </div>
    </div>
  );
}

const Navbar = () => {
  return (
    <div className="col pl-2">
      <form className="navbar-form" role="search" id="search-form" action="/search">
        <div className="input-group">
          <input
            tabindex="0"
            type="text"
            name="search"
            id="search"
            className="form-control top-search mousetrap"
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
      <a data-keynav-skip data-turbolinks="false" href="javascript:toggleSun()" className="jsonly"><span id="sun-icon" className="dcricon-sun-fill no-underline pr-2"></span> Night Mode</a>
    </div>
  );
}

const HamburgerMenu = () => {
  return (
    <nav role="navigation" id="hamburger-menu" data-turbolinks-permanent>
      <div id="menuToggle">
        <input type="checkbox" id="menuToggleCheckbox"/>
        <span className="patty"></span>
        <span className="patty"></span>
        <span className="patty short"></span>
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

const PriceCBT = () => {
  return (
    <div class="mb-3 flex-table">
      <div class="d-flex justify-content-end header">
        <span class="lh1rem mr-auto">Price</span>
        <span class="lh1rem text-right ml-1">0.012686 $</span>
      </div>
    </div>
  );
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

const listAttestation = {
  data:
  [
    {
      txid: 'b5c4571e98e869f67592b4ef57cce97988ed8fcf3de041c8b6a13034e94e91c7',
      merkleRoot: 'b5c4571e98e869f67592b4ef57cce97988ed8fcf3de041c8b6a13034e94e91c7',
      confirmed: false,
      age: 123
    },
    {
      txid: '06c0873b85b66a13416944ea88f79520cbbb672fbd990430e91f2dbedc67020c',
      merkleRoot: '06c0873b85b66a13416944ea88f79520cbbb672fbd990430e91f2dbedc67020c',
      confirmed: true,
      age: 123
    },
    {
      txid: '63390d97ffcea85df0082122e9c169412e57e59fb698944c1761603a235d94d0',
      merkleRoot: '63390d97ffcea85df0082122e9c169412e57e59fb698944c1761603a235d94d0',
      confirmed: true,
      age: 123
    },
    {
      txid: 'fe9a6b8c95ceace48e1a72ea17ee37e980b3cf365e21a9ce72296c4b12721f46',
      merkleRoot: 'fe9a6b8c95ceace48e1a72ea17ee37e980b3cf365e21a9ce72296c4b12721f46',
      confirmed: true,
      age: 123
    },
    {
      txid: 'f194b14efd7f70e1902d7454fe9ccafe27fadb7fa14de71f3a97310ec941a45e',
      merkleRoot: 'f194b14efd7f70e1902d7454fe9ccafe27fadb7fa14de71f3a97310ec941a45e',
      confirmed: true,
      age: 123
    }
  ]
}

class LatestAttestation extends Component {
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
        { listAttestation.data.map((data) =>
        <div class="d-flex flex-table-row">
          <a class="hash truncate-hash keyboard-target" href={`/tx/${data.txid}`} title={data.txid}>{data.txid}</a>
          <a class="hash truncate-hash keyboard-target" href={`/tx/${data.merkleRoot}`} title={data.merkleRoot}>{data.merkleRoot}</a>
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

const listCommitment = {
  data:
  [
    {
      position: 0,
      merkleRoot: 'b5c4571e98e869f67592b4ef57cce97988ed8fcf3de041c8b6a13034e94e91c7',
      commitment: 'b5c4571e98e869f67592b4ef57cce97988ed8fcf3de041c8b6a13034e94e91c7'
    }
  ]
}

class LatestCommitment extends Component {
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
        { listCommitment.data.map((data) =>
        <div class="d-flex flex-table-row">
          <span class="mono text-right ml-1">{data.position}</span>
          <a class="hash truncate-hash keyboard-target" href={`/tx/${data.merkleRoot}`} title={data.merkleRoot}>{data.merkleRoot}</a>
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

class App extends Component {
  render() {
    return (
      <div className="top-nav">
        <div className="container">
          <div className="d-flex align-items-center flex-wrap">
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

export default App;
