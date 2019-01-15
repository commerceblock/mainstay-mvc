import Axios from 'axios';
import React, {Component} from 'react';

class LatestCommitment extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.request();
  }

  request() {
    Axios.get('/ctrl/latestcommitment')
    .then(response => this.setState({data: response.data}));
  }

  render() {
    return (
      <div class="column">
        <div class="d-flex align-items-center">
          <h4>Latest Commitment</h4>
          <a href="/" class="pl-2 keyboard-target" data-keynav-priority>
            <small>see more ...</small>
          </a>
        </div>
        <div class="mb-3 flex-table LatestCommitment head-table">
          <table width="100%">
            <thead>
              <th><span class="lh1rem ">Position</span></th>
              <th><span class="lh1rem ">Commitment</span></th>
            </thead>
          </table>
        </div>
        <div class="mb-3 flex-table LatestCommitment">
          <table width="100%">
            <tbody>
              {this.state.data.map((data) =>
                <tr>
                  <td>
                    <span class="lastCommitement mono text-right ml-1">
                      {data.position}
                    </span>
                  </td>
                  <td>
                    <a class="lastCommitement hash truncate-hash keyboard-target"
                       href={`/commitment/${data.commitment}`}
                       title={data.commitment}>{data.commitment}
                    </a>
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

export default LatestCommitment;
