import React from 'react';
import {Redirect} from 'react-router-dom';
import apiService from '../helpers/api-service';
import swal from 'sweetalert';

class VerifyEmail extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            navigateToHome: false,
            showLoading: true
        };
    }

    componentDidMount() {
        return this.loadSignup().then((signup) => {
            if (signup.service_level !== 'free') {
                return swal({
                    text: 'Email successfully verified. You will shortly receive another email with instructions for setting up monthly payments to activate the service.',
                    icon: 'success',
                    className: 'success',
                    closeOnClickOutside: false
                });
            } else {
                return swal({
                    text: 'Email successfully verified. You will shortly receive another email containing your Mainstay slot ID allocation and API access token.',
                    icon: 'success',
                    className: 'success',
                    closeOnClickOutside: false
                });
            }
        }).catch((errorIgnored => {
            return swal({
                text: 'Something went wrong.',
                icon: 'error',
                className: 'error',
                closeOnClickOutside: false
            });
        })).finally(this.gotoHome);
    }

    gotoHome = () => {
        this.setState({
            navigateToHome: true,
            showLoading: false
        });
    };

    loadSignup = () => {
        const code = this.props.match.params.code;
        if (!code) {
            return Promise.reject(new Error('no code'));
        }
        return apiService.axiosClient.post('/ctrl/usersignup/verify?code=' + code).then(response => {
            if (response.data && response.data.signup) {
                return response.data.signup;
            } else {
                return Promise.reject('signup not found');
            }
        });
    };

    render() {
        if (this.state.showLoading) {
            return <div>Loading...</div>; // todo simple loading state, WIP:
        }
        if (this.state.navigateToHome) {
            return <Redirect to="/" push={false} />;
        }
        return null;
    }
}

export default VerifyEmail;
