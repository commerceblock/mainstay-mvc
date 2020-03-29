import React from 'react';
import {Redirect} from 'react-router-dom';

class Subscribe extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {navigateToHome: false};
    }

    gotoHome = () => {
        this.setState({navigateToHome: true});
    };

    componentDidMount() {
        const el = document.createElement('script');
        el.onload = () => {
            window.Chargebee.init({
                'site': 'mainstay-test'
            });
            window.Chargebee.registerAgain();

            const cbInstance = Chargebee.getInstance();
            cbInstance.setCheckoutCallbacks((cart) => {
                // you can define a custom callbacks based on cart object
                return {
                    loaded: () => {
                        console.log('checkout opened');
                    },
                    error: () => {
                        this.gotoHome();
                    },
                    close: () => {
                        this.gotoHome();
                    },
                    success: (hostedPageId) => {
                        this.gotoHome();
                    }
                };
            });

            const cart = cbInstance.getCart();
            const product = cbInstance.initializeProduct('mainstay-standard');
            cart.replaceProduct(product);
            cart.proceedToCheckout();
        };

        el.setAttribute('src', 'https://js.chargebee.com/v2/chargebee.js');
        document.body.appendChild(el);
    }

    render() {
        if (this.state.navigateToHome) {
            return <Redirect to="/home" push={false} />;
        }
        return null;
    }
}

export default Subscribe;
