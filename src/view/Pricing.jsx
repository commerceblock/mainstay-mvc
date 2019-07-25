import React from 'react';

const Pricing = () => (
        <div className="pricing-page">
            <div className="pricing-heading">
                <h4 className="p-2 m-t-30 m-b-15">Pricing</h4>
            </div>
            <div className='mb-4 pricing-content '>
                <div className="col-6 pricing-content-block">
                    <p>Our main objective is to provide you with a transparent pricing structure. We only offer one simple pricing option that represents</p>
                    <p>
                        A minimum slot reservation fee
                        + actual average transaction cost per user for billing period (month), only if the underlying BTC transaction cost causes average user fees to be > £1
                        For each individual user and billing period, the following pricing formula will be used:

                    </p>
                    <p>
                        For each individual user and billing period, the following pricing formula will be
                        used:
                    </p>
                    <div className="results m-10">
                    <p className="info m-b-5">Minimum flat fee: £1/month per user (for slot reservation)</p>
                    <p className="info m-b-5">(Total BTC tx cost / AVG(Users per month) - £1</p>
                    </div>
                    <p>
                        The table below provides an illustrative example of how your individual monthly fee is dependent on the transaction cost and the # of users:
                    </p>
                </div>
                <div className="col-6 table-block">
                    <div className="col-1">
                        <p className="rotate-txt info">avg. # of users / month</p>
                    </div>
                    <div className="col-11">
                        <div className="d-flex m-b-6">
                            <p className="info pricing-table-info">Base Fee £2.00</p>
                            <p className="info pricing-table-info">Tx fee for confirmation within 6 blocks</p>
                        </div>
                        <table className="pricing-table">
                            <tbody>
                            <tr className="header-row">
                                <td></td>
                                <td>£0.02</td>
                                <td>£0.05</td>
                                <td>£0.10</td>
                                <td>£0.25</td>
                                <td>£0.50</td>
                                <td>£1.00</td>
                                <td>£2.50</td>
                            </tr>
                            <tr>
                                <td>50</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£4.77</td>
                                <td>£7.54</td>
                                <td>£13.09</td>
                                <td>£2.00</td>
                            </tr>
                            <tr>
                                <td>100</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£4.77</td>
                                <td>£7.54</td>
                                <td>£2.00</td>
                            </tr>
                            <tr>
                                <td>150</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£5.70</td>
                                <td>£7.54</td>
                            </tr>
                            <tr>
                                <td>250</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£4.22</td>
                                <td>£4.77</td>
                            </tr>
                            <tr>
                                <td>500</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                            </tr>
                            <tr>
                                <td>1000</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                            </tr>
                            <tr>
                                <td>5000</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                                <td>£2.00</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
);
export default Pricing;
