import React, {Component} from 'react';
import {getRoute, routes} from './routes';
import { Link } from 'react-router-dom';
import apiService from '../helpers/api-service';

class LatestAttestation extends Component {
  constructor() {
      super();
      this.state = {
          data: []
      };
  }

  componentDidMount() {
      apiService.axiosClient.get('/ctrl/latestattestation')
          .then(response => this.setState({data: response.data['data']}));
  }

  render() {
      return (
          <div className="column">
              <div className="d-flex align-items-center justify-content-between">
                  <h4 className="p-2 customTitleStyle ">Latest Attestation</h4>
                  <Link
                      to={getRoute(routes.attestation)}
                      className="pl-2 keyboard-target non-underline"
                      data-keynav-priority
                  >
                      <small className="color-primary">View All &rarr;</small>
                  </Link>
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
                                  <Link className="hash truncate-hash keyboard-target"
                                     to={`/tx/${txid}`}
                                     title={txid}>{txid}
                                  </Link>
                              </td>
                              <td>
                                  <Link className="hash truncate-hash keyboard-target"
                                     to={`/merkle_root/${merkle_root}`}
                                     title={merkle_root}>{merkle_root}
                                  </Link>
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
