import FaviconAddrBar from './faviconAddrBar';
import FooterPage from './footerPage';
import HamburgerMenu from './hamburgerMenu';
import LatestAttestation from './latestAttestation';
import LatestCommitment from './latestCommitment';
import MainstayInfo from './mainstayInfo';
import Navbar from './navbar';
import React from 'react';

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
