import Axios from 'axios';
import React from 'react';

const CTRL_LATEST_ATTESTATION = '/ctrl/latestattestation'

class LatestAttestation extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.requestCtlrLatestAttestation();
  }

  requestCtlrLatestAttestation() {
    Axios.get(CTRL_LATEST_ATTESTATION)
      .then(response => this.setState({data: response.data}));
  }

  render() {
    return (
      <div>
        <div class="d-flex align-items-center">
          <h4>Latest Attestation</h4>
          <a href="/mempool" class="pl-2 keyboard-target" data-keynav-priority>
            <small>see more ...</small>
          </a>
        </div>
        <div class="mb-3 flex-table">
          <div class="d-flex justify-content-end header">
            <span class="lh1rem mr-auto">Txid</span>
            <span class="lh1rem mr-auto">MerkleRoot</span>
            <span class="lh1rem mr-auto">Confirmed</span>
            <span class="lh1rem mr-auto">Age</span>
          </div>
          <div class="transactions md-height-rows rows">
            { this.state.data.map((data) =>
            <div class="d-flex flex-table-row">
              <a class="hash truncate-hash keyboard-target" href={`/tx/${data.txid}`} title={data.txid}>{data.txid}</a>
              <a class="hash truncate-hash keyboard-target" href={`/tx/${data.merkle_root}`} title={data.merkle_root}>{data.merkle_root}</a>
              <span class="mono text-right ml-1">{(data.confirmed)?"true":"false"}</span>
              <span class="mono text-right ml-1">{data.age}</span>
            </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default LatestAttestation;
