import React from 'react';

class Subscribe extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange() {
        let path = `home`;
        this.props.history.push(path);
    }

    componentDidMount() {
        const el = document.createElement('script');
        el.onload = () => {
            window.Chargebee.init({
                'site': 'mainstay-test'
            });
            window.Chargebee.registerAgain();

            const cbInstance = Chargebee.getInstance();
            cbInstance.setCheckoutCallbacks(function(cart) {
                // you can define a custom callbacks based on cart object
                return {
                    loaded: function() {
                        console.log('checkout opened');
                    },
                    error: function(){
                        console.log('Error happened');
                    },
                    close: function() {
                        console.log('checkout closed');
                    },
                    success: function(hostedPageId) {
                        // todo something
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
        return null;
    }
}

export default Subscribe;
