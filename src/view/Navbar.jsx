import React from 'react';

const Navbar = () => (
    <div className="col pl-2">
        <form className="navbar-form" role="search" id="search-form" action="/search">
            <div className="input-group">
                <input
                    tabIndex="0"
                    type="text"
                    name="query"
                    id="search"
                    className="form-control top-search mousetrap"
                    placeholder="Search for position, commitment, txid, ..."
                />
            </div>
        </form>
    </div>
);

export default Navbar;
