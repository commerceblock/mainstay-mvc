import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
    <div className="d-flex align-items-center col-lg-2 col-md-2 logoImg">
        <div>
            <Link to="/home" className="logo">
                <img src="logo.png" alt="logo" />
            </Link>
        </div>
        <div>
            <Link to="/home">
                <h4 className="p-2">MainStay</h4>
            </Link>
        </div>
    </div>
);

export default Logo;
