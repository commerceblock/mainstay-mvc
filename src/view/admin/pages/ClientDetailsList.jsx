import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, Container, Header, Icon, Loader, Table} from 'semantic-ui-react';

import {addClient, getList, updateClient} from '../store/reducers/client-details/actions';
import AddClientDetailsModal from '../components/modals/ClientDetailsModal';

class ClientDetailsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddModal: false
        };
    }

    componentDidMount() {
        this.props.getListAction();
    }

    handleShowModal = () => {
        this.setState({
            showAddModal: true,
            itemToEdit: null
        });
    };

    handleCloseModal = () => {
        this.setState({
            showAddModal: false,
            itemToEdit: null
        });
    };

    handleCreateSuccess = () => {
        this.setState({
            showAddModal: false,
            itemToEdit: null
        });
        this.props.getListAction();
    };

    onEditClickHandler = (item) => {
        return () => {
            this.setState({
                showAddModal: true,
                itemToEdit: item
            });
        };
    };

    renderList = (items) => {
        return (
                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Position</Table.HeaderCell>
                            <Table.HeaderCell>Client Name</Table.HeaderCell>
                            <Table.HeaderCell>Auth Token</Table.HeaderCell>
                            <Table.HeaderCell>Public Key</Table.HeaderCell>
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {items.map(item => (
                            <Table.Row key={item._id}>
                                <Table.Cell>{item._id}</Table.Cell>
                                <Table.Cell>{item.client_position}</Table.Cell>
                                <Table.Cell>{item.client_name}</Table.Cell>
                                <Table.Cell>{item.auth_token}</Table.Cell>
                                <Table.Cell>{item.pubkey}</Table.Cell>
                                <Table.Cell>
                                    <Button as="a" onClick={this.onEditClickHandler(item)}>Edit</Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
        );
    };

    render() {
        const {items, maxClientPosition} = this.props;
        return (
            <Container>
                <div>
                    <Header as='h4'>Client Details</Header>

                    <Button primary icon labelPosition='left' onClick={this.handleShowModal}>
                        <Icon name='user' />
                        Add Client
                    </Button>

                    {this.props.loading && <Loader active />}
                    {this.renderList(items)}
                </div>
                {this.state.showAddModal && <AddClientDetailsModal
                    handleCloseModal={this.handleCloseModal}
                    handleCreateSuccess={this.handleCreateSuccess}
                    clientPosition={maxClientPosition + 1}
                    item={this.state.itemToEdit}
                />}
            </Container>
        );
    }
}

ClientDetailsList.propTypes = {
    items: PropTypes.array.isRequired,

    getListAction: PropTypes.func.isRequired,
    addClientAction: PropTypes.func.isRequired,
    updateClientAction: PropTypes.func.isRequired,

    loading: PropTypes.bool.isRequired,
    maxClientPosition: PropTypes.number.isRequired,

};

const mapStateToProps = (state) => {
    let maxClientPosition = 0;
    if (state.clientDetails.items.length > 0) {
        maxClientPosition = state.clientDetails.items
            .sort((a, b) => b.client_position - a.client_position)[0].client_position;
    }

    return {
        items: state.clientDetails.items,
        loading: state.clientDetails.loading || false,
        maxClientPosition,
    };
};

const mapDispatchToProps = {
    getListAction: getList,
    addClientAction: addClient,
    updateClientAction: updateClient,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetailsList);
