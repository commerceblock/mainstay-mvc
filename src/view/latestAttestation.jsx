import Axios from 'axios';
import React, {Component} from 'react';

class LatestAttestation extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.request();
  }

  request() {
    Axios.get('/ctrl/latestattestation')
    .then(response => this.setState({data: response.data['data']}));
  }

  render() {
    return (
      <div class="column">
        <div class="d-flex align-items-center">
          <h4>Latest Attestation</h4>
          <a href="/attestation" class="pl-2 keyboard-target" data-keynav-priority>
            <small>see more ...</small>
          </a>
        </div>
        <div class="mb-3 flex-table latestAttestation head-table">
            <table width="100%">
              <thead>
              <th><span class="lh1rem mr-auto">Txid</span></th>
              <th><span class="lh1rem mr-auto">MerkleRoot</span></th>
              <th><span class="lh1rem ">Confirmed</span></th>
              <th><span class="lh1rem mr-auto">Date</span></th>
              </thead>
          </table>
        </div>
        <div class="mb-3 flex-table latestAttestation">
          <table width="100%">
            <tbody>
              {this.state.data.map((data) =>
                <tr>
                  <td>
                    <a class="hash truncate-hash keyboard-target"
                       href={`/tx/${data.txid}`}
                       title={data.txid}>{data.txid}
                    </a>
                  </td>
                  <td>
                    <a class="hash truncate-hash keyboard-target"
                       href={`/tx/${data.merkle_root}`}
                       title={data.merkle_root}>{data.merkle_root}
                    </a>
                  </td>
                  <td>
                    <span class="mono text-right ml-1">{(data.confirmed) ? "true" : "false"}</span>
                  </td>
                  <td>
                    <span class="mono text-right ml-1">{data.age}</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default LatestAttestation;
