import React from 'react';

import { routes } from './routes';


const Footer = () => (
    <footer className="d-flex navbar-fixed-bottom nav-footer">
        <div className="d-flex align-items-center col-sm-12 nav-footer-left col-lg-6">
            <div className="m-auto">
                <a href="/" className="logo">
                    <img src="favicon.png" alt="favicon"/>
                </a>
                <span>Mainstay-mvc v0.5.0-release © 2019 CommerceBlock Limited. All rights reserved.</span>
            </div>
        </div>
        <div className="d-flex align-items-center col-sm-12 nav-footer-right col-lg-6">
            <div className="footer-list-item">
                <a href={routes.about}>About</a>
            </div>
            <div className="footer-list-item">
                <a href={routes.pricing}>Pricing</a>
            </div>
            <div className="footer-list-item">
                <a href="/">API Information</a>
            </div>
            <div className="footer-list-item">
                <a href={routes.privacy}>Privacy policy</a>
            </div>
            <div className="footer-list-item">
                <a href={routes.terms}>Terms And Conditions</a>
            </div>
        </div>
    </footer>
);
export default Footer;
