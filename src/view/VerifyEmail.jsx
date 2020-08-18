import React from 'react';
import {Redirect} from 'react-router-dom';
import apiService from '../helpers/api-service';

class VerifyEmail extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            navigateToHome: false,
            showLoading: true
        };
    }

    componentDidMount() {
        return this.loadSignup().then((response) => {
            console.log('-----------------------response', response);
            alert('Your email is verified.');
        }).catch((error => {
            console.error(error);
            alert('Something went wrong.');
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
