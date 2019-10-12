import React from 'react';
import {connect} from 'react-redux';
import {Header, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import {getList} from '../store/reducers/client-sign-up/actions';

class ClientSignUpList extends React.Component {

    componentDidMount() {
        this.props.getListAction();
    }

    renderList = (items) => {
        return (
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Company</Table.HeaderCell>
                        <Table.HeaderCell>Public Key</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items.map(item => (
                        <Table.Row key={item._id}>
                            <Table.Cell>{item._id}</Table.Cell>
                            <Table.Cell>{item.first_name}</Table.Cell>
                            <Table.Cell>{item.last_name}</Table.Cell>
                            <Table.Cell>{item.email}</Table.Cell>
                            <Table.Cell>{item.company}</Table.Cell>
                            <Table.Cell>{item.pubkey}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    };

    render() {
        const {items} = this.props;
        return (
            <div>
                <Header as='h4'>Client Sign-ups</Header>
                {this.renderList(items)}
            </div>
        );
    }
}

ClientSignUpList.propTypes = {
    items: PropTypes.array.isRequired,

    getListAction: PropTypes.func.isRequired,

    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        items: state.clientSignUp.items,
        loading: false,
    };
};

const mapDispatchToProps = {
    getListAction: getList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientSignUpList);
