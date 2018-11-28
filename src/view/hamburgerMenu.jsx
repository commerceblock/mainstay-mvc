import Menu from './menu';
import React, { Component } from 'react';

class HamburgerMenu extends Component {
  render() {
    return (
      <nav role="navigation" id="hamburger-menu" data-turbolinks-permanent>
        <div id="menuToggle">
          <input type="checkbox" id="menuToggleCheckbox"/>
          <span class="patty"></span>
          <span class="patty"></span>
          <span class="patty short"></span>
          <Menu/>
        </div>
      </nav>
    );
  }
}

export default HamburgerMenu;
