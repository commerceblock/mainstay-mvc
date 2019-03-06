import LatestAttestation from '../latestAttestation';
import LatestCommitment from '../latestCommitment';
import MainstayInfo from '../mainstayInfo';
import React from 'react';

const Home = () => (
    <div className="row" data-controller="homepageMempool">
        <MainstayInfo/>
        <div className="col-md-6  home-left">
            <LatestAttestation />
            <LatestCommitment />
        </div>
    </div>
);

export default Home;
