import React from 'react';



const Searchbar = () => (



    <div className="col search">
        <div className="col pl-2 desktopSearch">
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
        <div className="col-12 mobileSearch" >
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


    </div>
);

export default Searchbar;
