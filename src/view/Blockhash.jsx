import Axios from "axios";
import React, { Component } from "react";
import NotFound from './NotFound';
import { getRoute, routes } from './routes';

class Blockhash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isReady: false,
        }
    }

    componentDidMount() {
        Axios.get("/api/v1/blockhash?hash=" + this.props.match.params.value)
            .then(({ data, error }) => {
                if (data?.response) {
                    this.setState({ data: data.response, isReady: true });
                }
                this.setState({ isReady: true });
            });
    }

    render() {
        const { isReady, data } = this.state;
        if (!isReady) {
            return null;
        }
        if (!data) {
            const errorMessage = `A block with ${this.props.match.params.value} hash does not exist`;
            return <NotFound message={errorMessage} />;
        }
        const { blockhash } = data;
        return (
            <div className="full-table" data-controller="homepageMempool">
                <span className="block-title mb-0">Block</span>
                <span className="block-subtitle hash truncate-hash h3"><strong>Blockhash:</strong> {blockhash.blockhash}</span>
                <table className="full-table" width="100%">
                    <tbody>
                    <tr>
                        <th>Txid</th>
                        <td><a href={getRoute(routes.transation, {value: blockhash.txid})}><span className="hash truncate-hash">{blockhash.txid}</span></a></td>
                    </tr>
                    <tr>
                        <th>Amount</th>
                        <td>{blockhash.amount} BTC</td>
                    </tr>

                    <tr>
                        <th>Time</th>
                        <td>{blockhash.time}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Blockhash;
