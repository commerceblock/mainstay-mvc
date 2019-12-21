import React from 'react';
import PriceCBT from './PriceCBT';
import TotalSupplyCBT from './totalSupplyCBT';
import LatestAttestationInfo from './LatestAttestationInfo';
import {Link} from 'react-router-dom';

const MainstayInfo = () => (
    <div className="row">
        <div className="col-12">
                <h4 className="table-title customTitleStyle">Overview</h4>

            {/*<div className="mb-3">
                <TotalSupplyCBT/>
                <div className="flex-table overflow-info">
                    <table width="100%">
                        <tbody>
                        <PriceCBT/>
                        <LatestAttestationInfo/>
                        </tbody>
                    </table>
                </div>
            </div>*/}
        </div>
        <div className="col-12">
            <div className="d-flex flex-wrap justify-content-between align-items-center">
                <LatestAttestationInfo/>
            </div>
        </div>
    </div>
);

export default MainstayInfo;
