import React, { Component } from 'react';

class FaviconAddrBar extends Component {
  render() {
    return (
      <div class="d-flex align-items-center">
        <div class="col-sm-auto">
          <a href="/" class="logo">
              <img src="favicon.png" alt="favicon"/>
          </a>
        </div>
      </div>
    );
  }
}

export default FaviconAddrBar;
