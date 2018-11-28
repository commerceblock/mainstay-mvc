import { Component } from 'react';

const CTRL_LATEST_ATTESTATION_INFO = '/ctrl/latestattestationinfo';

class LatestAttestationInfo extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      fee: 0
    };
    this.requestCtlrLatestAttestationInfo();
  }

  requestCtlrLatestAttestationInfo() {
    fetch(CTRL_LATEST_ATTESTATION_INFO, {
      method: "GET"
    })
    .then(response => {
      var dataLength = response.data.length
      var feeSum = 0
      for (var i=1; i<dataLength; i++)
        feeSum += response.data[i].amount - response.data[i-1].amount;
      this.setState({data: response.data[0], fee: feeSum/(dataLength-1)})
    });
  }

  render() {
    if (!this.state.data) {
      return (
        <div class="mb-3 flex-table">
          <div class="d-flex justify-content-end header">
            <span class="lh1rem mr-auto">Blockhash</span>
            <span class="lh1rem text-right ml-1"></span>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div class="mb-3 flex-table">
          <div class="d-flex justify-content-end header">
            <span class="lh1rem mr-auto">Blockhash</span>
            <span class="lh1rem text-right ml-1">{this.state.data.blockhash}</span>
          </div>
        </div>
        <div class="mb-3 flex-table">
          <div class="d-flex justify-content-end header">
            <span class="lh1rem mr-auto">Latest Txid</span>
            <span class="lh1rem text-right ml-1">{this.state.data.txid}</span>
          </div>
        </div>
        <div class="mb-3 flex-table">
          <div class="d-flex justify-content-end header">
            <span class="lh1rem mr-auto">Time</span>
            <span class="lh1rem text-right ml-1">{this.state.data.time}</span>
          </div>
        </div>
        <div class="mb-3 flex-table">
          <div class="d-flex justify-content-end header">
            <span class="lh1rem mr-auto">Amount</span>
            <span class="lh1rem text-right ml-1">{this.state.data.amount / 100000000} BTC</span>
          </div>
        </div>
        <div class="mb-3 flex-table">
          <div class="d-flex justify-content-end header">
            <span class="lh1rem mr-auto">Average Fee</span>
            <span class="lh1rem text-right ml-1">{this.state.fee / 100000000} BTC</span>
          </div>
        </div>

      </div>
    );
  }
}

export default LatestAttestationInfo;
