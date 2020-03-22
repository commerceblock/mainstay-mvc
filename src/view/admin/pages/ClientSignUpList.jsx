import React from 'react';
import {connect} from 'react-redux';
import {Header, Input, Select, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import {getList, updateSignup} from '../store/reducers/client-sign-up/actions';

class KycIdEditable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: props.item.kyc_id,
            initialValue: props.item.kyc_id,
            loading: false
        };
    }

    onChange = (e) => this.setState({value: e.target.value});

    onSaveClick = () => {
        this.setState({loading: true});
        this.props.kycIdSaveHandler(this.state.value).then(() => {
            this.setState({loading: false, initialValue:this.state.value});
        });
    };

    render() {
        return (<Input
            error={this.state.value !== this.state.initialValue}
            loading={this.state.loading}
            action={!this.state.loading && {
                icon: 'save',
                onClick: this.onSaveClick
            }}
            onChange={this.onChange}
            value={this.state.value || ''}
        />);
    }
}

class KycStatusSelect extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {loading: false};
    }

    onChange = (event, data) => {
        this.setState({loading: true});
        this.props.kycStatusSaveHandler(data.value).then(() => {
            this.setState({loading: false});
        });
    };

    render() {
        const {item} = this.props;
        return (<Select
            compact
            className="status-dropdown"
            options={this.props.statusOptions}
            placeholder="KYC status"
            onChange={this.onChange}
            loading={this.state.loading}
            value={item.status}
        />);
    }
}

class ClientSignUpList extends React.Component {

    componentDidMount() {
        this.props.getListAction();
    }

    getOnSycStatusChangeHandler = (id) => (status) => this.props.updateSignupAction(id, {status: status});

    getOnKycIdSaveHandler = (id) => (value) => this.props.updateSignupAction(id, {kyc_id: value});

    renderList = (items, statusOptions) => {
        return (
            <Table celled striped className='client-signup-list'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Company</Table.HeaderCell>
                        <Table.HeaderCell>Public Key</Table.HeaderCell>
                        <Table.HeaderCell>KYC Id</Table.HeaderCell>
                        <Table.HeaderCell>KYC Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items.map((item, index) => (
                        <Table.Row
                            key={item._id}
                            positive={item.status === 'kyc_ok'}
                            warning={item.status === 'sent_kyc'}
                            error={item.status === 'kyc_fail'}
                        >
                            <Table.Cell>{item._id}</Table.Cell>
                            <Table.Cell>{`${item.first_name} ${item.last_name}`}</Table.Cell>
                            <Table.Cell>{item.email}</Table.Cell>
                            <Table.Cell>{item.company}</Table.Cell>
                            <Table.Cell className="public-key-td">
                                <span>{item.pubkey}</span>
                            </Table.Cell>
                            <Table.Cell>
                                <KycIdEditable
                                    item={item}
                                    kycIdSaveHandler={this.getOnKycIdSaveHandler(item._id)}
                                />
                            </Table.Cell>
                            <Table.Cell error={!!!item.status}>
                                <KycStatusSelect
                                    item={item}
                                    statusOptions={statusOptions}
                                    kycStatusSaveHandler={this.getOnSycStatusChangeHandler(item._id)}
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
    updateSignupAction: PropTypes.func.isRequired,

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
    updateSignupAction: updateSignup,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientSignUpList);
