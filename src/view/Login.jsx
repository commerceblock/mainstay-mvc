import React from 'react';

const Login = () => (
    <div className="login-page container">
        <div className="col-md-12 left">
            <h4>Attest and Verify Your Files</h4>
            <a href={'https://g.files.mainstay.xyz/'}>
                <div className="block">
                    <img src="google-icon.svg" alt="icon"/>
                    <div>
                        <span className="title">Google Drive</span>
                        <span className="desc">Sign in and authorize Mainstay access to Google Drive</span>
                    </div>
                </div>
            </a>
            <a href={'https://d.files.mainstay.xyz/'}>
                <div className="block">
                    <img src="dropbox-icon.svg" alt="icon"/>
                    <div>
                        <span className="title">Dropbox</span>
                        <span className="desc">  Sign in and authorize Mainstay access to Dropbox</span>
                    </div>
                </div>
            </a>
            <a href={'https://o.files.mainstay.xyz/'}>
                <div className="block">
                    <img className="oneDrive" src="oneDrive.png" alt="icon"/>
                    <div>
                        <span className="title"> OneDrive </span>
                        <span className="desc">  Sign in and authorize Mainstay access to OneDrive</span>
                    </div>
                </div>
            </a>

        </div>
    </div>
);

export default Login;
