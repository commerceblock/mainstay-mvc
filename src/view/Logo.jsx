import React from 'react';

const Logo = () => (
    <div className="d-flex align-items-center">
        <div>
            <a href="/" className="logo">
                <img src="favicon.png" alt="favicon" width="30px"/>
            </a>
        </div>
        <div className="col-sm-auto">
            <a href="/" className="logo_securosys">
                <img src="securosys.png" alt="favicon" width="100px"/>
            </a>
        </div>
    </div>
);

export default Logo;
