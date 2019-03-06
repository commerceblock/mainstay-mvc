import React, { Component } from 'react';


class FooterPage extends Component {
    render() {
        return (
            <footer className="navbar-fixed-bottom">
        <div className="text-center">
          <div>
            <a className="nav-item" href="https://github.com/commerceblock/mainstay-mvc">Mainstay-mvc v0.4.0-release</a>
            <a className="nav-item" href="https://github.com/commerceblock/mainstay-mvc/blob/develop/LICENSE">© 2019 CommerceBlock-Limited</a>
            <a className="nav-item" href="/privacy" target="_blank">Privacy Policy</a>
            <a className="nav-item" href="/terms" target="_blank">Terms and Conditions</a>
          </div>
        </div>
      </footer>
        );
    }
}

export default FooterPage;