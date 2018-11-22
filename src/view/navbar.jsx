import React from 'react';

class Navbar extends React.Component {
  render() {
    return (
      <div class="col pl-2">
        <form class="navbar-form" role="search" id="search-form" action="/search">
          <div class="input-group">
            <input
              tabindex="0"
              type="text"
              name="search"
              id="search"
              class="form-control top-search mousetrap"
              placeholder="Search for blocks, addresses or transactions"
            />
          </div>
        </form>
      </div>
    );
  };
}

export default Navbar;
