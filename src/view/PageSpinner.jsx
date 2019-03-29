import React, { Component } from 'react';
import Spinner from './Spinner';

class PageSpinner extends Component{
    state = {
        isShown: true,
    };

    componentDidMount() {
        const { delay } = this.props;
        setTimeout(() => {
            this.setState({ isShown: false });
        }, delay)
    }

    componentWillUnmount() {
        this.setState({ isShown: true });
    }

    render() {
        const { isShown } = this.state;
        const { children } = this.props;
        return isShown ? <Spinner /> : children
    }
}


export default PageSpinner;
