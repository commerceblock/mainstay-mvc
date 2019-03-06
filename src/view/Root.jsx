import React from 'react';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import Logo from './Logo';
import FooterPage from './footerPage';
import HamburgerMenu from './hamburgerMenu';
import Navbar from './navbar';
import Client from "./Client";
import PrivacyPolicy from "./PrivacyPolicy";
import Commitment from './Commitment';
import Transaction from './Transaction';
import { Blockhash, MerkleRoot, Position } from "./search/search";
import Attestation from "./Attestation";
import Search from "./search/search";
import TermsConditions from "./TermsConditions";
import Home from './home/home'



const Root = () => (
    <BrowserRouter>
        <div className="top-nav">
            <div className="container">
                <div className="d-flex align-items-center flex-wrap">
                    <Logo/>
                    <Navbar/>
                    <HamburgerMenu/>
                </div>
            </div>
            <div className="container main" data-controller="main">
                <Route
                    exact
                    path={routes.app}
                    render={() => <Redirect replace to={routes.home} />}
                />
                <Route path={routes.home} component={Home} />
                <Route path={routes.search} component={Search} />
                <Route path={routes.position} component={Position} />
                <Route path={routes.block} component={Blockhash} />
                <Route path={routes.commitment} component={Commitment} />
                <Route path={routes.transation} component={Transaction} />
                <Route path={routes.merkle} component={MerkleRoot} />
                <Route path={routes.attestation} component={Attestation} />
                <Route path={routes.client} exac component={Client} />
                <Route path={routes.privacy} component={PrivacyPolicy} />
                <Route path={routes.terms} component={TermsConditions} />
            </div>
            <FooterPage/>
        </div>
    </BrowserRouter>
);

export default Root;
