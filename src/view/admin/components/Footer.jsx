import {Container, Divider, Grid, Header, Image, List, Segment} from 'semantic-ui-react';
import React from 'react';

const Footer = () => {
    return (
        <Segment inverted vertical style={{
            margin: '5em 0em 0em',
            padding: '5em 0em'
        }}>
            <Container textAlign='center'>
                <Grid divided inverted stackable>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='Group 1' />
                        <List link inverted>
                            <List.Item as='a'>Link Four</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='Group 2' />
                        <List link inverted>
                            <List.Item as='a'>Link Four</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='Group 3' />
                        <List link inverted>
                            <List.Item as='a'>Link One</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <Header inverted as='h4' content='Footer Header' />
                        <p>
                            Extra space for a call to action inside the footer that could help re-engage
                        </p>
                    </Grid.Column>
                </Grid>

                <Divider inverted section />
                <Image centered size='mini' src='/logo.png' />
                <List horizontal inverted divided link size='small'>
                    <List.Item as='a' href='#'>
                        Contact Us
                    </List.Item>
                    <List.Item as='a' href='#'>
                        Terms and Conditions
                    </List.Item>
                    <List.Item as='a' href='#'>
                        Privacy Policy
                    </List.Item>
                </List>
            </Container>
        </Segment>
    );
};

export default Footer;
