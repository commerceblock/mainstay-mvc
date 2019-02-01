import React, { Component } from 'react';

class FooterPage extends Component {
    render() {
        return (
            <footer class="navbar-fixed-bottom">
        <div class="text-center">
          <div>
            <a class="nav-item" href="https://github.com/commerceblock/mainstay-mvc">Mainstay-mvc v0.3.0-release</a>
            <a class="nav-item" href="https://github.com/commerceblock/mainstay-mvc/blob/develop/LICENSE">© 2019 CommerceBlock-Limited</a>
            <a class="nav-item" href="https://github.com/commerceblock/mainstay-mvc/blob/develop/doc/mainstay-privacy-policy.docx">Privacy Policy</a>
            <a class="nav-item" href="https://github.com/commerceblock/mainstay-mvc/blob/develop/doc/mainstay-t%26c-DRAFT.docx">Terms and Conditions</a>
          </div>
        </div>
      </footer>
        );
    }
}

export default FooterPage;