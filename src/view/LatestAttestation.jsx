import Axios from 'axios';
import React, {Component} from 'react';
import { routes } from "./routes";

class LatestAttestation extends Component {
  constructor() {
      super();
      this.state = {
          data: []
      };
  }
  
  componentDidMount() {
      Axios.get('/ctrl/latestattestation')
          .then(response => this.setState({data: response.data['data']}));
  }

  render() {
      return (
          <div className="column">
              <div className="d-flex align-items-center">
                  <h4>Latest Attestation</h4>
                  <a href={routes.attestation} className="pl-2 keyboard-target" data-keynav-priority>
                      <small>see more ...</small>
                  </a>
              </div>
              <div className="mb-3 flex-table latestAttestation head-table">
                  <table width="100%">
                      <thead>
                          <tr>
                              <th><span className="lh1rem mr-auto">Txid</span></th>
                              <th><span className="lh1rem mr-auto">MerkleRoot</span></th>
                              <th><span className="lh1rem mr-auto">Date</span></th>
                          </tr>
                      </thead>
                  </table>
              </div>
              <div className="mb-3 flex-table latestAttestation">
                  <table width="100%">
                      <tbody>
                      {this.state.data.map(({ txid, merkle_root, age }) =>
                          <tr key={txid}>
                              <td>
                                  <a className="hash truncate-hash keyboard-target"
                                     href={`/tx/${txid}`}
                                     title={txid}>{txid}
                                  </a>
                              </td>
                              <td>
                                  <a className="hash truncate-hash keyboard-target"
                                     href={`/merkle_root/${merkle_root}`}
                                     title={merkle_root}>{merkle_root}
                                  </a>
                              </td>
                              <td>
                                  <span className="mono text-right ml-1">{age}</span>
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
