import React from 'react';
import {Container, Image, Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const Navigation = () => {
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item as='a' header>
                    <Image size='mini' src='/logo.png' style={{marginRight: '1.5em'}} />
                    Mainstay
                </Menu.Item>
                <Menu.Item as={Link} to="/client-details">Client Details</Menu.Item>
            </Container>
        </Menu>
    );
};

export default Navigation;
