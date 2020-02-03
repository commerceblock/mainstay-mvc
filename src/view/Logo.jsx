import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
    <div className="d-flex align-items-center logoImg">
        <div className="logo">
            <img src="logo.png" alt="logo" />
        </div>
        <div>
            <h4 className="p-2">MainStay</h4>
        </div>
    </div>
);

export default Logo;
