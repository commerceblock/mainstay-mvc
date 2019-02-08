import React, { Component } from 'react';


class FooterPage extends Component {
    render() {
        return (
            <footer class="navbar-fixed-bottom">
        <div class="text-center">
          <div>
            <a class="nav-item" href="https://github.com/commerceblock/mainstay-mvc">Mainstay-mvc v0.4.0-release</a>
            <a class="nav-item" href="https://github.com/commerceblock/mainstay-mvc/blob/develop/LICENSE">© 2019 CommerceBlock-Limited</a>
            <a class="nav-item" href="/privacy" target="_blank">Privacy Policy</a>
            <a class="nav-item" href="/terms" target="_blank">Terms and Conditions</a>
          </div>
        </div>
      </footer>
        );
    }
}

export default FooterPage;