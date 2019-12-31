import React, { Component } from 'react';

class TotalSupplyBTC extends Component {
  render() {
    return (
      <div className="mb-3 flex-table">
        <div className="d-flex justify-content-end header">
          <span className="lh1rem mr-auto">Total Supply</span>
          <span className="lh1rem text-right ml-1">173,256,686 BTC</span>
        </div>
      </div>
    );
  }
}

export default TotalSupplyBTC;
