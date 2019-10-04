import React from 'react';
import {Link} from 'react-router-dom';
import {routes} from './routes';

const Footer = () => (
    <footer className="d-flex navbar-fixed-bottom nav-footer">
        <div className="d-flex align-items-center col-sm-12 nav-footer-right col-lg-6">
            <div className="footer-list-item">
                <Link to={routes.about}>About</Link>
            </div>
            <div className="footer-list-item">
                <Link to={routes.pricing}>Pricing</Link>
            </div>
            <div className="footer-list-item">
                <a href="https://github.com/commerceblock/mainstay-mvc/blob/develop/doc/mainstay_api.md">API
                    Information</a>
            </div>
            <div className="footer-list-item">
                <Link to={routes.privacy}>Privacy policy</Link>
            </div>
            <div className="footer-list-item">
                <Link to={routes.terms}>Terms And Conditions</Link>
            </div>
        </div>
        <div className="d-flex align-items-center col-sm-12 nav-footer-left col-lg-6">
            <div className="m-auto">
                <Link to="/" className="logo">
                    <img src="favicon.png" alt="favicon" />
                </Link>
                <span>© 2019 CommerceBlock Limited. All rights reserved.</span>
                <div className="powered-by">
                    <span>Powered by </span>
                    <a href="https://www.securosys.com/en/"><img src="securosys.png" alt="logo" /></a>
                </div>
            </div>
        </div>
    </footer>
);
export default Footer;
