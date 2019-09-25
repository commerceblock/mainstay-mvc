import React from 'react';
import PropTypes from 'prop-types';
import {connect, Provider} from 'react-redux';

import {Container,} from 'semantic-ui-react';
import {Navigation} from './components';
import ClientDetailsList from '../admin/pages/ClientDetailsList';

import store from './store';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import Auth from './pages/Auth';

import '../../../assets/stylesheets/admin.scss';

// this is the default behavior
function getConfirmation (message, callback) {
    const allowTransition = window.confirm(message);
    callback(allowTransition);
}

class App extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        const {isLoggedIn} = this.props;

        let routes;
        if (isLoggedIn) {
            routes = (
                <Switch>
                    <Route exact path="/client-details" component={ClientDetailsList} />
                    <Redirect from="/" to="/client-details" />
                    <Route component={PageNotFound} />
                </Switch>
            );
        } else {
            routes = (
                <Switch>
                    <Route exact path="/login" component={Auth} />
                    <Redirect from="/" to="/login" />
                </Switch>
            );
        }

        return (
            <BrowserRouter
                basename={'/admin'}
                getUserConfirmation={getConfirmation}
            >
                <>
                    {isLoggedIn && <Navigation />}
                    <Container className='main-container'>
                        {routes}
                    </Container>
                </>
            </BrowserRouter>
        );
    }
}

App.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    return {
        isLoggedIn: !!(state.auth.isLoggedIn && localStorage.getItem('access_token'))
    };
};

const AppConnected = connect(mapStateToProps)(App);

const Admin = () => (
    <Provider store={store}>
        <AppConnected />
    </Provider>
);

export default Admin;
