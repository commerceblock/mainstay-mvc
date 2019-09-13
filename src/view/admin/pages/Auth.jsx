import React from 'react';
import {connect} from 'react-redux';
import LoginForm from './Login';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

class Auth extends React.Component {

    render () {
        if (this.props.isLoggedIn) {
            return <Redirect to="/" />;
        }
        return (
            <LoginForm />
        );
    }
}

Auth.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn || !!localStorage.getItem('access_token') || false
    };
};

export default connect(mapStateToProps)(Auth);
