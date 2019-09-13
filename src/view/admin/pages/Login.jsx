import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {login} from '../store/reducers/auth/actions';

import {Button, Form, Grid, Header, Message} from 'semantic-ui-react';

class LoginForm extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            inputs: {},
            showLoading: false
        };
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            ...this.state,
            inputs: {
                ...this.state.inputs,
                [name]: value
            }
        });
    };

    handleSubmit = () => {
        const {login, password} = this.state.inputs;
        this.setState({showLoading: true});
        this.props.loginAction(login, password).then(() => {
            this.setState({
                showLoading: false
            });
        });
    };

    render () {
        return (
            <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Admin Login
                    </Header>
                    {this.props.errorMessage && <Message color='red'>{this.props.errorMessage}</Message>}
                    <Form size='large' onSubmit={this.handleSubmit}>
                        <Form.Input
                            fluid
                            required
                            icon='user'
                            iconPosition='left'
                            placeholder='Username'
                            name="login"
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            fluid
                            required
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name="password"
                            onChange={this.handleChange}
                        />
                        <Button
                            fluid
                            color='teal'
                            size='large'
                            type="submit"
                            disabled={this.state.showLoading}
                            loading={this.state.showLoading}
                        >Login</Button>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

LoginForm.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    loginAction: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn || false,
        errorMessage: state.auth.error
    };
};

const mapDispatchToProps = {
    loginAction: login
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
