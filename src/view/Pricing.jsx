import React from 'react';

const Pricing = () => (
        <div className="pricing-page">
            <div className="pricing-heading">
                <h4 className="p-2 m-t-30 m-b-15 row">Pricing</h4>
            </div>
            <div className='mb-4 pricing-content row'>
                <div className="col-5">
                    <p>Our main objective is to provide you with a transparent pricing structure. We only
                        offer
                        one
                        simple pricing option that represents</p>
                    <ul>
                        <li>
                            A minimum slot reservation fee
                        </li>
                        <li>
                            + actual average transaction cost per user for billing period (month), only if
                            the
                            underlying
                            BTC transaction cost causes average user fees to be > £1
                        </li>
                    </ul>
                    <p>
                        For each individual user and billing period, the following pricing formula will be
                        used:
                    </p>
                    <div className="results m-10">
                    <p className="info m-b-5">Minimum flat fee: £1/month per user (for slot reservation)</p>
                    <p className="info m-b-5">(Total BTC tx cost / AVG(Users per month) - £1</p>
                    </div>
                    <p>
                        The table below provides an illustrative example of how your individual monthly fee
                        is
                        dependent
                        on the transaction cost and the # of users:
                    </p>
                </div>
                <div className="col-7 table-block">
                    <div className="col-1">
                        <p className="rotate-txt info">avg. # of users / month</p>
                    </div>
                    <div className="col-11">
                        <div className="d-flex m-b-5">
                            <p className="info pricing-table-info">Base Fee £2.00</p>
                            <p className="info pricing-table-info">Tx fee for confirmation within 6 blocks</p>
                        </div>
                        <table className="m-auto pricing-table">
                            <tbody>
                            <tr className="header-row">
                                <td></td>
                                <td>0.02$</td>
                                <td>0.03$</td>
                                <td>0.05$</td>
                                <td>0.010$</td>
                                <td>0.25$</td>
                                <td>0.50$</td>
                                <td>1.00$</td>
                            </tr>
                            <tr>
                                <td>50</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>2.44$</td>
                                <td>4.60$</td>
                                <td>8.20$</td>
                                <td>15.40$</td>
                            </tr>
                            <tr>
                                <td>100</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>2.80$</td>
                                <td>4.60$</td>
                                <td>8.20$</td>
                            </tr>
                            <tr>
                                <td>150</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>2.20$</td>
                                <td>3.40$</td>
                                <td>5.80$</td>
                            </tr>
                            <tr>
                                <td>250</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>2.44$</td>
                                <td>3.88$</td>
                            </tr>
                            <tr>
                                <td>500</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>2.44$</td>
                            </tr>
                            <tr>
                                <td>1000</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>5000</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
);
export default Pricing;
