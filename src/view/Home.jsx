import LatestAttestation from './LatestAttestation';
import LatestCommitment from './latestCommitment';
import MainstayInfo from './MainstayInfo';
import React from 'react';

const Home = () => (
    <div className="row" data-controller="homepageMempool">
        <div className="col-md-6">
            <MainstayInfo/>
        </div>
        <div className="col-md-6 home-left">
            <LatestAttestation />
            <LatestCommitment />
        </div>
    </div>
);

export default Home;
