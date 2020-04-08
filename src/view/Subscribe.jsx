import React from 'react';
import {Redirect} from 'react-router-dom';
import apiService from '../helpers/api-service';

class Subscribe extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            navigateToHome: false,
            showLoading: true
        };
    }

    gotoHome = () => {
        this.setState({
            navigateToHome: true,
            showLoading: false
        });
    };

    /**
     * send response from chargebee to our back-end
     * and mark signup as `payment_ok`
     * @param signup
     * @param hostedPageId
     */
    checkoutSuccess = (signup, hostedPageId) => {
        return apiService.axiosClient.post('/ctrl/chargebeesubscription', {
            hostedPageId,
            signupId: signup._id
        }).then(() => {
            this.gotoHome();
        }).catch(error => {
            // todo show some error
        });
    };

    componentDidMount() {
        return Promise.all([
            this.loadSignup(),
            this.loadChargebee()
        ]).then(this.showCheckoutModal).catch(error => {
            console.log(error);
            this.gotoHome();
        });
    }

    loadSignup = () => {
        const code = this.props.match.params.code;
        if (!code) {
            return Promise.reject(new Error('no code'));
        }
        return apiService.axiosClient.get('/ctrl/signupbycode?code=' + code).then(response => {
            if (response.data && response.data.signup) {
                return response.data.signup;
            } else {
                return Promise.reject('signup not found');
            }
        });
    };

    loadChargebee = () => {
        return new Promise((resolve) => {
            const el = document.createElement('script');
            el.onload = resolve;
            el.setAttribute('src', 'https://js.chargebee.com/v2/chargebee.js');
            document.body.appendChild(el);
        });
    };

    showCheckoutModal = ([signup]) => {
        this.setState({showLoading: false});
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
                    this.checkoutSuccess(signup, hostedPageId);
                }
            };
        });

        const cart = cbInstance.getCart();
        const customer = {
            email: signup.email,
            first_name: signup.first_name,
            last_name: signup.last_name
        };
        cart.setCustomer(customer);

        const product = cbInstance.initializeProduct('mainstay-standard');
        cart.replaceProduct(product);

        // Simulating drop in script functionality
        cart.proceedToCheckout();
    };

    render() {
        if (this.state.showLoading) {
            return <div>Loading...</div>; // todo simple loading state, WIP:
        }
        if (this.state.navigateToHome) {
            return <Redirect to="/home" push={false} />;
        }
        return null;
    }
}

export default Subscribe;
