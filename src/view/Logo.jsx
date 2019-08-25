import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
    <div className="d-flex align-items-center logoImg">
        <div>
            <Link to="/" className="logo">
                <img src="logo.png" alt="logo" />
            </Link>
        </div>
        <div>
            <Link to="/">
                <h4 className="p-2">MainStay</h4>
            </Link>
        </div>
    </div>
);

export default Logo;
