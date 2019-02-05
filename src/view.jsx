import Home from './view/home/home';
import Client from './view/client';
import
Search, { Position, Blockhash, Commitment, TransactionId, MerkleRoot }
from './view/search/search';
import Attestation from './view/attestation';
import PrivacyPolicy from './view/PrivacyPolicy';
import TermsConditions from './view/TermsConditions';

import {
    BrowserRouter,
    Route
} from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/stylesheets/styles.scss'

const Main = () => (
    <BrowserRouter>
        <div>
            <Route path="/" exact component={Home}/>
            <Route path="/search" exact component={Search}/>
            <Route path="/position/:value" exact component={Position} />
            <Route path="/block/:value" exact component={Blockhash} />
            <Route path="/commitment/:value" exact component={Commitment} />
            <Route path="/tx/:value" exact component={TransactionId} />
            <Route path="/merkle_root/:value" exact component={MerkleRoot} />
            <Route path="/attestation/:value?" exact component={Attestation}/>
            <Route path="/clients" exact component={Client}/>
            <Route path="/privacy" exact component={PrivacyPolicy}/>
            <Route path="/terms" exact component={TermsConditions}/>
        </div>
    </BrowserRouter>
);

ReactDOM.render(<Main/>, document.getElementById('root'));

module.hot.accept();