import Axios from 'axios';
import React, {Component} from 'react';
import history from '../app.history';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wrong_search_value: false,
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUpdate() {
        this.state.value = "";
        this.state.wrong_search_value = false
    }

    resetSearch(e) {
        e.target.value = '';
        this.state.wrong_search_value = false;
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        if (!event.target.value)
            this.state.wrong_search_value = false
    }

    handleSubmit(event) {
        event.preventDefault();

        this.state.wrong_search_value = false;
        const value = this.state.value;
        if (value && (/[0-9A-Fa-f]{64}/g.test(value) || /^\d+$/.test(value))) {
            Axios.get("/ctrl/type?value=" + value)
                .then(response => {
                    if (response.data.response === 'commitment')
                        history.push(`/commitment/${value}`);
                    else if (response.data.response === 'merkle_root')
                        history.push(`/merkle_root/${value}`);
                    else if (response.data.response === 'position')
                        history.push(`/position/${value}`);
                    else if (response.data.response === 'txid')
                        history.push(`/tx/${value}`);
                    else if (response.data.response === 'blockhash')
                        history.push(`/block/${value}`);
                    else if (response.data.response === 'type unknown')
                        this.setState({wrong_search_value: true});
                    else
                        this.setState({wrong_search_value: true});
                })
                .catch(() => {
                    this.setState({wrong_search_value: true});
                });
        } else {
            this.setState({wrong_search_value: true});
        }
    }

    render() {
        const isWrongSearchValue = this.state.wrong_search_value;
        return (
            <div className="col-lg-6 col-md-5 search">
                <div className="col pl-2 desktopSearch">
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-group">
                            <input
                                tabIndex="0"
                                type="text"
                                name="query"
                                id="search"
                                className={"form-control top-search mousetrap " + (isWrongSearchValue && 'wrong-search')}
                                placeholder="Search for position, commitment, txid, ..."
                                value={this.state.value} onChange={this.handleChange}
                            />
                            <img src="search.png" alt="search" className="top-search-icon"/>
                            {
                                isWrongSearchValue &&
                                <div className="search-tooltip ">
                                    Search does not match any valid client position, attestation transaction id or
                                    commitment hash.
                                </div>
                            }
                        </div>
                    </form>
                </div>
                <div className="col-12 mobileSearch">
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-group">
                            <input
                                tabIndex="0"
                                type="text"
                                name="query"
                                id="search"
                                className={"form-control top-search mousetrap" + (isWrongSearchValue && 'wrong-search')}
                                placeholder="Search for position, commitment, txid, ..."
                                value={this.state.value} onChange={this.handleChange}
                            />
                            <img src="search.png" alt="search" className="top-search-icon"/>
                            {
                                isWrongSearchValue &&
                                <div className="search-tooltip ">
                                    Search does not match any valid client position, attestation transaction id or
                                    commitment hash.
                                </div>
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Search;
