import Axios from 'axios';
import React from 'react';

const CTRL_LATEST_COMMITMENT = '/ctrl/latestcommitment';

class LatestCommitment extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.requestCtlrLatestCommitment();
  }

  requestCtlrLatestCommitment() {
    Axios.get(CTRL_LATEST_COMMITMENT)
      .then(response => this.setState({data: response.data}));
  }

  render() {
    return (
      <div>
        <div class="d-flex align-items-center">
          <h4>Latest Commitment</h4>
          <a href="/mempool" class="pl-2 keyboard-target" data-keynav-priority>
            <small>see more ...</small>
          </a>
        </div>
        <div class="mb-3 flex-table">
          <div class="d-flex justify-content-end header">
            <span class="lh1rem mr-auto">Position</span>
            <span class="lh1rem mr-auto">MerkleRoot</span>
            <span class="lh1rem mr-auto">Confirmed</span>
          </div>
          <div class="transactions md-height-rows rows">
            { this.state.data.map((data) =>
            <div class="d-flex flex-table-row">
              <span class="mono text-right ml-1">{data.position}</span>
              <a class="hash truncate-hash keyboard-target" href={`/tx/${data.merkle_root}`} title={data.merkle_root}>{data.merkle_root}</a>
              <a class="hash truncate-hash keyboard-target" href={`/tx/${data.commitment}`} title={data.commitment}>{data.commitment}</a>
            </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default LatestCommitment;
