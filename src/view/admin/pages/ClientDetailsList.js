import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import {
    Header,
    Table,
    Loader,
    Modal,
    Button,
    Icon,
    Form, Message
} from 'semantic-ui-react';

import {getList, addClient} from '../store/reducers/client_details/actions';

const List = ({items}) => {
    return (
        <Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>_id</Table.HeaderCell>
                    <Table.HeaderCell>Position</Table.HeaderCell>
                    <Table.HeaderCell>Auth Token</Table.HeaderCell>
                    <Table.HeaderCell>Client Name</Table.HeaderCell>
                    <Table.HeaderCell>Public Key</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {items.map(item => (
                    <Table.Row key={item._id}>
                        <Table.Cell>{item._id}</Table.Cell>
                        <Table.Cell>{item.client_position}</Table.Cell>
                        <Table.Cell>{item.auth_token}</Table.Cell>
                        <Table.Cell>{item.client_name}</Table.Cell>
                        <Table.Cell>{item.pubkey}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

List.propTypes = {
    items: PropTypes.array.isRequired
};

class AddClientModal extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            inputs: {
                authToken: uuidv4(),
                clientPosition: props.clientPosition,
            }
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
        const {authToken, clientPosition, clientName, publicKey} = this.state.inputs;
        this.props.addClientAction({
            auth_token: authToken,
            client_position: clientPosition,
            client_name: clientName,
            public_key: publicKey,
        }).then(() => {
            this.props.handleCreateSuccess();
        }).catch(error => {
            console.log(error);
            // todo show error
        });
    };

    render () {
        const {authToken, clientPosition} = this.state.inputs;
        const {handleCloseModal, errorMessage} = this.props;
        return (
            <Modal open size="small" onClose={handleCloseModal}>

                <Modal.Header>Add Client Details</Modal.Header>
                <Modal.Content>
                    {errorMessage && <Message color='red'>{errorMessage}</Message>}
                    <Form>
                        <Form.Field>
                            <label>Client Name</label>
                            <input placeholder='John Smith' disabled value={clientPosition} />
                        </Form.Field>

                        <Form.Field>
                            <label>Auth Token</label>
                            <input value={authToken} disabled />
                        </Form.Field>

                        <Form.Field>
                            <label>Client Name</label>
                            <input name="clientName" placeholder='John Smith' onChange={this.handleChange} />
                        </Form.Field>

                        <Form.Field>
                            <label>Public Key</label>
                            <input name="publicKey" placeholder='' onChange={this.handleChange} />
                        </Form.Field>

                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button primary onClick={this.handleSubmit}>Save</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

AddClientModal.propTypes = {
    clientPosition: PropTypes.number.isRequired,
    addClientAction: PropTypes.func.isRequired,

    handleCloseModal: PropTypes.func.isRequired,
    handleCreateSuccess: PropTypes.func.isRequired,

    errorMessage: PropTypes.string,
};

class ClientDetailsList extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            showAddModal: false
        };
    }

    componentDidMount () {
        this.props.getListAction();
    }

    handleShowModal = () => {
        this.setState({showAddModal: true});
    };

    handleCloseModal = () => {
        this.setState({showAddModal: false});
    };

    handleCreateSuccess = () => {
        this.setState({showAddModal: false});
        this.props.getListAction();
    };

    render () {
        const {items, maxClientPosition} = this.props;
        return (
            <>
                <div>
                    <Header as='h1'>User Details</Header>
                    {this.props.loading && <Loader active inline />}

                    <Button icon labelPosition='left' onClick={this.handleShowModal}>
                        <Icon name='user' />
                        Add Client
                    </Button>

                    <List items={items} />
                </div>
                {this.state.showAddModal && <AddClientModal
                    addClientAction={this.props.addClientAction}
                    handleCloseModal={this.handleCloseModal}
                    handleCreateSuccess={this.handleCreateSuccess}
                    clientPosition={maxClientPosition + 1}
                    errorMessage={this.props.errorMessage}
                />}
            </>
        );
    }
}

ClientDetailsList.propTypes = {
    items: PropTypes.array.isRequired,

    getListAction: PropTypes.func.isRequired,
    addClientAction: PropTypes.func.isRequired,

    loading: PropTypes.bool.isRequired,
    maxClientPosition: PropTypes.number.isRequired,

    errorMessage: PropTypes.string,
};

const mapStateToProps = (state) => {
    let maxClientPosition = 0;
    if (state.clientDetails.items.length > 0) {
        maxClientPosition = state.clientDetails.items
            .sort((a, b) => b.client_position - a.client_position)[0].client_position;
    }

    return {
        items: state.clientDetails.items,
        loading: state.clientDetails.loading,
        maxClientPosition,
        errorMessage: state.clientDetails.error || null,
    };
};

const mapDispatchToProps = {
    getListAction: getList,
    addClientAction: addClient,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetailsList);
