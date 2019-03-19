import React, {Component} from 'react';
import FaviconAddrBar from './Logo';
import Footer from './Footer';
import Menu from './Menu';
import Navbar from './navbar';

class Pricing extends Component {
    render() {
        return (
            <div className="top-nav">
                <div className="container main pricing-page">
                    <div className="pricing-heading">
                        <h2>Pricing</h2>
                    </div>

                    <div className='pricing-content'>
                        <h4>Fees</h4>
                        <div className="col-lg-12">
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
                            <p><b>Minimum flat fee: £1/month per user (for slot reservation)</b></p>
                            <p><b>(Total BTC tx cost / AVG(Users per month) - £1</b></p>
                            <p>
                                The table below provides an illustrative example of how your individual monthly fee
                                is
                                dependent
                                on the transaction cost and the # of users:
                            </p>
                        </div>
                        <div className="col-md-12 table-block">
                            <div className="col-md-1">
                                <p className="rotate-txt">avg. # of users / month</p>

                            </div>
                            <div className="col-md-11 ">
                                <p className="pricing-table-info">tx fee for confirmation within 6 blocks</p>
                                <table>
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
                                        <td><b>50</b></td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>2.44$</td>
                                        <td>4.60$</td>
                                        <td>8.20$</td>
                                        <td>15.40$</td>
                                    </tr>
                                    <tr>
                                        <td><b>100</b></td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>2.80$</td>
                                        <td>4.60$</td>
                                        <td>8.20$</td>
                                    </tr>
                                    <tr>
                                        <td><b>150</b></td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>2.20$</td>
                                        <td>3.40$</td>
                                        <td>5.80$</td>
                                    </tr>
                                    <tr>
                                        <td><b>250</b></td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>2.44$</td>
                                        <td>3.88$</td>
                                    </tr>
                                    <tr>
                                        <td><b>500</b></td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>2.44$</td>
                                    </tr>
                                    <tr>
                                        <td><b>1000</b></td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td><b>5000</b></td>
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
                <Footer/>
            </div>
        );
    }
}

export default Pricing;
