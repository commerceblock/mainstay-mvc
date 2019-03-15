import Axios from 'axios';
import LatestAttestation from '../LatestAttestation';
import LatestCommitment from '../latestCommitment';
import MainstayInfo from '../MainstayInfo';
import React, {Component} from 'react';
import QueryString from 'query-string';


class Waiting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: QueryString.parse(location.search)
        }

    }

    render() {
        return (

            <div className="row" data-controller="homepageMempool">
                <div className="col-md-12">
                    <div className="alert alert-danger ">
                        Search does not match any valid client position, attestation transaction
                        id or commitment hash, for query: {this.state.value.query}
                    </div>
                </div>

                <MainstayInfo/>
                <div className="col-md-6  home-left">
                    <LatestAttestation/>
                    <LatestCommitment/>
                </div>
            </div>
        );
    }
}

const type_unknown = (<div>Page - Type Unknown</div>);

const undefined = (<div>Page - Undefined</div>);

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: <Waiting/>,
        };
    }

    componentDidMount() {
        const {history, location} = this.props;

        const value = QueryString.parse(location.search);

        if (value.query === undefined)
            return this.setState({page: page_undefined});
        if (/[0-9A-Fa-f]{64}/g.test(value.query) || /^\d+$/.test(value.query))
            Axios.get("/ctrl/type?value=" + value.query)
                .then(response => {
                    if (response.data.response === 'commitment')
                        this.props.history.replace(`/commitment/${value.query}`)
                    else if (response.data.response === 'merkle_root')
                        this.props.history.replace(`/merkle_root/${value.query}`)
                    else if (response.data.response === 'position')
                        this.props.history.replace(`/position/${value.query}`)
                    else if (response.data.response === 'txid')
                        this.props.history.replace(`/tx/${value.query}`)
                    else if (response.data.response === 'blockhash')
                        this.props.history.replace(`/block/${value.query}`)
                    else if (response.data.response === 'type unknown')
                        this.setState({page: type_unknown()});
                    else
                        this.setState({page: undefined()});
                });
    }

    render() {
        return this.state.page;
    }
}

export default Search;
