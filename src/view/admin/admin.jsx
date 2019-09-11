import React from 'react';
import PropTypes from 'prop-types';
import {connect, Provider} from 'react-redux';

import {Container,} from 'semantic-ui-react';
import {Navigation} from './components';
import Auth from './pages/Auth';
import {Footer} from '../admin/components';
import ClientDetailsList from '../admin/pages/ClientDetailsList';

import store from './store';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';

// this is the default behavior
function getConfirmation (message, callback) {
    const allowTransition = window.confirm(message);
    callback(allowTransition);
}

class App extends React.Component {

    constructor (props) {
        super(props);
        this.state = {showFooter: false};
    }

    render () {
        return (
            <>
                {!this.props.isLoggedIn && <Container><Auth /></Container>}
                {this.props.isLoggedIn && (
                    <HashRouter getUserConfirmation={getConfirmation}>
                        <>
                            <Navigation />
                            <Container style={{marginTop: '7em'}}>
                                <Switch>
                                    <Route exact path="/client-details" component={ClientDetailsList} />
                                    <Redirect from="/" to="/client-details" />
                                    <Route component={PageNotFound} />
                                </Switch>
                            </Container>
                            {this.state.showFooter && <Footer />}
                        </>
                    </HashRouter>
                )}
            </>);
    }
}

App.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn || !!localStorage.getItem('access_token') || false
    };
};

const AppConnected = connect(mapStateToProps)(App);

const Admin = () => (
    <Provider store={store}>
        <AppConnected />
    </Provider>
);

export default Admin;
