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
            <div className="row" data-controller="homepageMempool">
                <span className="block-title">Block</span>
                <span className="block-subtitle">Blockhash: {blockhash.blockhash}</span>
                <table className="searchTable">
                    <tbody>
                    <tr>
                        <td>Txid</td>
                        <td>{blockhash.txid}</td>
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
