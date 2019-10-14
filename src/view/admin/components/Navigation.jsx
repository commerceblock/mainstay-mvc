import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import PropTypes from 'prop-types';

import {Container, Image, Menu} from 'semantic-ui-react';
import {logout} from '../store/reducers/auth/actions';

class Navigation extends React.Component {

    handleLogoutClick = () => {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('access_token');
            window.location.href = '/';
        }
    };

    render() {
        const {location} = this.props;
        return (
            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item as={Link} to="/client-details" header>
                        <Image
                            src='/logo.png'
                            style={{
                                marginRight: '.5em',
                                width: '30px'
                            }}
                        />
                        <span style={{fontSize: '22px'}}>MainStay</span>
                    </Menu.Item>
                    <Menu.Item
                        active={location.pathname === '/client-details'}
                        as={Link}
                        to="/client-details">
                        Client Details
                    </Menu.Item>

                    <Menu.Item
                        active={location.pathname === '/client-sign-up'}
                        as={Link}
                        to="/client-sign-up">
                        Client Sign up
                    </Menu.Item>

                    <Menu.Menu position='right' onClick={this.handleLogoutClick}>
                        <Menu.Item as='a'>Logout</Menu.Item>
                    </Menu.Menu>

                </Container>
            </Menu>
        );
    }
}

Navigation.propTypes = {
    logoutAction: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
    logoutAction: logout,
};

export default withRouter(connect(null, mapDispatchToProps)(Navigation));
