import InfoFees from './infoFees';
import InfoLatestTxid from './infoLatestTxid';
// import MarketcapCBT from './marketcapCBT';
// import PriceBTC from './priceBTC';
import PriceCBT from './priceCBT';
import React from 'react';
import TotalSupplyCBT from './totalSupplyCBT';

class MainstayInfo extends React.Component {
  render() {
    return (
      <div class="col-md-6">
        <div class="d-flex align-items-center">
          <h3 class="mt-2">Mainstay</h3>
        </div>
        <div>
          <table class="mb-3 col">
            <TotalSupplyCBT/>
            <PriceCBT/>
            <InfoLatestTxid/>
            <InfoFees/>
          </table>
        </div>
      </div>
    );
  }
}

export default MainstayInfo;
