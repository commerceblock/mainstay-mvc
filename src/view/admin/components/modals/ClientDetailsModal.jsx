import React from 'react';
import uuidv4 from 'uuid/v4';
import {connect} from 'react-redux';
import {Button, Form, Input, Message, Modal} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {addClient, updateClient} from '../../store/reducers/client_details/actions';

class AddClientDetailsModal extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            errorMessage: null,
            saving: false,
            inputs: {},
        };

        if (props.item) {
            this.state.inputs = {
                _id: props.item._id,
                authToken: props.item.auth_token,
                clientPosition: props.item.client_position,
                clientName: props.item.client_name,
                publicKey: props.item.pubkey,
            };
        } else {
            this.state.inputs = {
                authToken: uuidv4(),
                clientPosition: props.clientPosition,
            };
        }
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

    handleGenerateAuthToken = () => {
        this.setState({
            inputs: {
                ...this.state.inputs,
                authToken: uuidv4()
            }
        });
    };

    handleFormKeypress = (e) => {
        const code = e.keyCode || e.which;
        if (code === 13) {
            this.handleSubmit(e);
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.props.saving) {
            return;
        }

        const {_id, authToken, clientPosition, clientName, publicKey} = this.state.inputs;
        let request;
        if (_id) {
            request = this.props.updateClientAction({
                _id: _id,
                auth_token: authToken,
                client_position: clientPosition,
                client_name: clientName,
                public_key: publicKey,
            });
        } else {
            request = this.props.addClientAction({
                auth_token: authToken,
                client_position: clientPosition,
                client_name: clientName,
                public_key: publicKey,
            });
        }
        this.setState({saving: true});
        // send request
        request.then(() => {
            this.props.handleCreateSuccess();
        }).catch(error => {
            this.setState({
                errorMessage: error.response.data.message
            });
        }).finally(() => {
            this.setState({saving: false});
        });
    };

    render () {
        const {inputs, errorMessage, saving} = this.state;
        const {authToken, clientPosition, clientName, publicKey} = inputs;
        const {handleCloseModal} = this.props;

        return (
            <Modal open size="small" onClose={handleCloseModal}>
                <Modal.Header>Add Client Details</Modal.Header>
                <Modal.Content>
                    {errorMessage && <Message color='red'>{errorMessage}</Message>}
                    <Form onSubmit={this.handleSubmit} onKeyPress={this.handleFormKeypress}>
                        <Form.Field>
                            <label>Position</label>
                            <Form.Input placeholder='0' disabled value={clientPosition} />
                        </Form.Field>

                        <Form.Field>
                            <label>Client Name (optional)</label>
                            <Form.Input
                                name="clientName"
                                placeholder='John Smith'
                                onChange={this.handleChange}
                                value={clientName}
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Auth Token</label>
                            <Input type="text" value={authToken} action>
                                <Input disabled value={authToken} />
                                <Button content="Generate" primary onClick={this.handleGenerateAuthToken}
                                        type="button" />
                            </Input>
                        </Form.Field>

                        <Form.Field>
                            <label>Public Key (optional)</label>
                            <Form.Input
                                name="publicKey"
                                placeholder=''
                                onChange={this.handleChange}
                                value={publicKey}
                            />
                        </Form.Field>

                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button primary onClick={this.handleSubmit} disabled={saving} loading={saving}>Save</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

AddClientDetailsModal.propTypes = {
    // state props
    saving: PropTypes.string,
    // dispatch props
    addClientAction: PropTypes.func.isRequired,
    updateClientAction: PropTypes.func.isRequired,
    // component props
    item: PropTypes.object,
    clientPosition: PropTypes.number.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    handleCreateSuccess: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        saving: state.clientDetails.saving || false,
    };
};

const stateDispatchToProps = {
    addClientAction: addClient,
    updateClientAction: updateClient,
};

export default connect(mapStateToProps, stateDispatchToProps)(AddClientDetailsModal);
