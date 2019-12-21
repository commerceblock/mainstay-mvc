import React, {Component} from 'react';
import PropTypes from 'prop-types';


class PriceCBT extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <tr>
                <th className="align-end">BTC Price</th>
                <td colSpan="2">{this.props.priceCBT} $</td>
            </tr>
        );
    }
}

PriceCBT.propTypes = {
    priceCBT: PropTypes.number
};

export default PriceCBT;
