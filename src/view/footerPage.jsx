import React, { Component } from 'react';

class FooterPage extends Component {
  render() {
    return (
      <footer class="navbar-fixed-bottom">
        <div class="text-center">
          <div>
            <a class="nav-item" href="https://github.com/commerceblock/mainstay-mvc">Mainstay-mvc v0.0.0-release</a>
            <a class="nav-item" href="https://github.com/commerceblock/mainstay-mvc/blob/develop/LICENSE">© 2019 CommerceBlock-Limited</a>
            <a class="nav-item" id="connection">Connecting to WebSocket...<div></div></a>
          </div>
        </div>
      </footer>
    );
  }
}

export default FooterPage;
