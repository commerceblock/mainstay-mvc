import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <div class="col pl-2">
        <form class="navbar-form" role="search" id="search-form" action="/search">
          <div class="input-group">
            <input
              tabindex="0"
              type="text"
              name="query"
              id="search"
              class="form-control top-search mousetrap"
              placeholder="Search for position, commitment, txid, ..."
            />
          </div>
        </form>
      </div>
    );
  };
}

export default Navbar;
