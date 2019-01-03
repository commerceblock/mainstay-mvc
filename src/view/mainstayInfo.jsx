import PriceCBT from './priceCBT';
import TotalSupplyCBT from './totalSupplyCBT';
import LatestAttestationInfo from './latestAttestationInfo';
import React, { Component } from 'react';

class MainstayInfo extends Component {
  render() {
    return (
      <div class="col-md-6">
        <div class="d-flex align-items-center">
          <h3 class="mt-2">Mainstay</h3>
        </div>
        <div>
          <div class="mb-3 col">
            {/*<TotalSupplyCBT/>*/}
            <PriceCBT/>
            <LatestAttestationInfo/>
          </div>
        </div>
      </div>
    );
  }
}

export default MainstayInfo;
