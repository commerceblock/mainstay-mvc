import React from 'react';
import {connect} from 'react-redux';
import {Header, Select, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import {getList, updateStatus} from '../store/reducers/client-sign-up/actions';

class ClientSignUpList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingIds: []
        };
    }

    componentDidMount() {
        this.props.getListAction();
    }

    getOnChangeHandler = (id) => (event, data) => {
        this.setState({loadingIds: [...this.state.loadingIds, id]});
        this.props.updateStatusAction(id, data.value).then(() => {
            const loadingIds = [...this.state.loadingIds];
            loadingIds.splice(loadingIds.indexOf(id), 1);
            this.setState({loadingIds});
        });
    };

    renderList = (items, statusOptions) => {
        return (
            <Table celled striped className='client-signup-list'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Company</Table.HeaderCell>
                        <Table.HeaderCell>Public Key</Table.HeaderCell>
                        <Table.HeaderCell>KYC Id</Table.HeaderCell>
                        <Table.HeaderCell>KYC Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items.map(item => (
                        <Table.Row key={item._id} positive={item.status === 'kyc_ok'}>
                            <Table.Cell>{item._id}</Table.Cell>
                            <Table.Cell>{item.first_name}</Table.Cell>
                            <Table.Cell>{item.last_name}</Table.Cell>
                            <Table.Cell>{item.email}</Table.Cell>
                            <Table.Cell>{item.company}</Table.Cell>
                            <Table.Cell className="public-key-td">
                                <span>{item.pubkey}</span>
                            </Table.Cell>
                            <Table.Cell>{item.kyc_id}</Table.Cell>
                            <Table.Cell>
                                <Select
                                    compact
                                    className="status-dropdown"
                                    options={statusOptions}
                                    placeholder="KYC status"
                                    onChange={this.getOnChangeHandler(item._id)}
                                    loading={this.state.loadingIds.includes(item._id)}
                                    value={item.status}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    };

    render() {
        const {items, statusOptions} = this.props;
        return (
            <div>
                <Header as='h4'>Client Sign up</Header>
                {this.renderList(items, statusOptions)}
            </div>
        );
    }
}

ClientSignUpList.propTypes = {
    items: PropTypes.array.isRequired,
    statusOptions: PropTypes.array.isRequired,

    getListAction: PropTypes.func.isRequired,
    updateStatusAction: PropTypes.func.isRequired,

    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        items: state.clientSignUp.items,
        statusOptions: state.clientSignUp.statuses.map(item => ({
            key: item,
            value: item,
            text: item.replace('_', ' ')
        })),
        loading: false,
    };
};

const mapDispatchToProps = {
    getListAction: getList,
    updateStatusAction: updateStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientSignUpList);
