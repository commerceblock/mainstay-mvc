import Home from './view/home/home';
import 
    Search, 
    { Position, Blockhash, Commitment, TransactionId, MerkleRoot } 
from './view/search/search';
import Attestation from './view/attestation';

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
            <Route path="/markle_root/:value" exact component={MerkleRoot} />
            <Route path="/attestation" exact component={Attestation}/>
        </div>
    </BrowserRouter>
);

ReactDOM.render(<Main/>, document.getElementById('root'));

module.hot.accept();
