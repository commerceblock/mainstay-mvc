import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Container, Image, Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {logout} from '../store/reducers/auth/actions';

class Navigation extends React.Component {

    handleLogoutClick = () => {
        if (confirm('Are you sure you want to logout?')) {
            this.props.logoutAction();
            window.location.href = '/';
        }
    };

    render () {
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
                        active
                        as={Link}
                        to="/client-details">Client Details</Menu.Item>
                    <Menu.Menu position='right' onClick={this.handleLogoutClick}>
                        <Menu.Item as='a'>Logout</Menu.Item>
                    </Menu.Menu>

                </Container>
            </Menu>
        );
    }
}

Navigation.propTypes = {
    logoutAction: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    logoutAction: logout,
};

export default connect(null, mapDispatchToProps)(Navigation);
