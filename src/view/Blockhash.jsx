import Axios from "axios/index";
import React, { Component } from "react";

class Blockhash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }

    componentDidMount() {
        Axios.get("/api/v1/blockhash?hash=" + this.props.match.params.value)
            .then(({data}) => {
                this.setState({data: data.response})
            });
    }

    render() {
        const { data } = this.state;
        if (!data) {
            return 'Fail';
        }
        const { blockhash } = data;
        return (
            <div className="full-table" data-controller="homepageMempool">
                <span className="block-title mb-0">Block</span>
                <span className="block-subtitle hash truncate-hash h3"><strong>Blockhash:</strong> {blockhash.blockhash}</span>
                <table className="full-table">
                    <tbody>
                    <tr>
                        <td>Txid</td>
                        <td><span className="hash truncate-hash">{blockhash.txid}</span></td>
                    </tr>
                    <tr>
                        <td>Amount</td>
                        <td>{blockhash.amount} BTC</td>
                    </tr>

                    <tr>
                        <td>Time</td>
                        <td>{blockhash.time}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Blockhash;
