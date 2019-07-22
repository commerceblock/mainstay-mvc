import React from 'react';
import PriceCBT from './PriceCBT';
import TotalSupplyCBT from './totalSupplyCBT';
import LatestAttestationInfo from './LatestAttestationInfo';


const MainstayInfo = () => (
    <div className="row">
        <div className="col-lg-7 col-md-8 col-sm-12">
            <div className="d-flex align-items-center">
                <h4 className="p-2 m-t-30 table-title customTitleStyle ">Overview</h4>
            </div>
            <div className="mb-3">
                {/*<TotalSupplyCBT/>*/}
                <div className="flex-table overflow-info">
                    <table width="100%">
                        <tbody>
                        <PriceCBT/>
                        <LatestAttestationInfo/>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);

export default MainstayInfo;
