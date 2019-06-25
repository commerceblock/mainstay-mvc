import React from 'react';

const Searchbar = () => (
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
                <img src="search.png" alt="search" className="top-search-icon"/>
            </div>
        </form>
    </div>
);

export default Searchbar;
