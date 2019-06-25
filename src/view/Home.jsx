import LatestAttestation from './LatestAttestation';
import LatestCommitment from './LatestCommitment';
import MainstayInfo from './MainstayInfo';
import React from 'react';

const Home = () => (
    <div className="row" data-controller="homepageMempool">
        <div className="col-md-12">
            <MainstayInfo/>
        </div>
        <div className="col-md-6 m-t-15">
            <LatestAttestation />
        </div>
        <div className="col-md-6 m-t-15">
            <LatestCommitment />
        </div>
    </div>
);

export default Home;
