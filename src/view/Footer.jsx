import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from './routes';


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
                <Link to="/">API Information</Link>
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
                    <img src="favicon.png" alt="favicon"/>
                </Link>
                <span>Mainstay-mvc v0.5.0-release © 2019 CommerceBlock Limited. All rights reserved.</span>
            </div>
        </div>

    </footer>
);
export default Footer;
