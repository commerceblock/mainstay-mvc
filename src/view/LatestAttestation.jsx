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
              <div className="d-flex align-items-center justify-content-between">
                  <h4 className="p-2 customTitleStyle ">Latest Attestation</h4>
                  <a
                      href={routes.attestation}
                      className="pl-2 keyboard-target non-underline"
                      data-keynav-priority
                  >
                      <small className="color-primary">View All &rarr;</small>
                  </a>
              </div>
              <div className="mb-3 flex-table home-table head-table">
                  <table width="100%">
                      <thead>
                          <tr>
                              <th><span className="lh1rem mr-auto">Txid</span></th>
                              <th><span className="lh1rem mr-auto">Merkle Root</span></th>
                              <th className="lastHead"><span className="lh1rem mr-auto ">Date</span></th>
                          </tr>
                      </thead>
                  </table>
              </div>
              <div className="mb-3 flex-table home-table">
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
                                  <span className="text-right ml-1">{age}</span>
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
