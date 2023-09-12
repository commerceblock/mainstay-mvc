import React from 'react';
import PropTypes from 'prop-types';

import swal from 'sweetalert';
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, InputGroup, InputGroupAddon} from 'reactstrap';

import {isValidEmail} from '../../utils/validators';
import apiService from '../../helpers/api-service';

function milliSatsToSats(milliSats) {
    return milliSats / 1000;
}

class CreateSlotModal extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            inputs: {
                months: 1,
            },
            fee_rate_per_month_in_msat: '',
            invoice: '',
            copied: false,
            confirmed: false,
        };

        this.formRef = React.createRef();
    }

    componentDidMount() {
        apiService.axiosClient.get(`/api/v1/feerate`)
            .then(({ data, error }) => {
                if (data?.response) {
                    this.setState({ fee_rate_per_month_in_msat: data.response.fee_rate });
                }
            });
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

    showErrorAlert = (message) => {
        return swal({
            text: message,
            icon: 'error',
            className: 'error',
            closeOnClickOutside: true
        });
    };

    handleGenerateInvoice = (event) => {
        event.preventDefault();

        let months = (this.state.inputs.months === '') ? this.state.inputs.customMonths : this.state.inputs.months;
        if (!months) {
            return this.showErrorAlert('Months field is empty');
        }

        apiService.axiosClient.get(`/api/v1/fee_rate`)
            .then(({data, error}) => {
                if (data?.response) {
                    this.setState({fee_rate_per_month_in_msat: data.response.fee_rate});
                }
            });

        const fee_rate = this.state.fee_rate_per_month_in_msat;
        const amount = fee_rate * months;

        apiService.axiosClient.get(`/api/v1/token/init/?value=${amount}`)
            .then(({ data, error }) => {
                if (data?.response) {
                    this.setState({invoice: data.response.lightning_invoice.bolt11});
                    this.setState({token_id: data.response.token_id});
                }
            });
    };

    handleCopyInvoice = (event) => {
        event.preventDefault();
        const invoice = this.state.invoice;
        navigator.clipboard.writeText(invoice);
        this.setState({copied: true});
    };

    handleVerifyInvoice = (event) => {
        event.preventDefault();
        const token_id = this.state.token_id;

        apiService.axiosClient.get(`api/v1/token/verify/?token_id=${token_id}`)
            .then(({ data, error }) => {
                if (data?.response) {
                    this.setState({confirmed: data.response.confirmed});
                }
            });

        if (!this.state.confirmed) {
            this.showErrorAlert('Payment not received yet');
        }
    };

    resetFormState = () => {
        this.formRef.current.reset();
        this.setState({inputs: {}});
    };

    handleModalClose = () => {
        this.resetFormState();
        if (this.props.onModalClose) {
            this.props.onModalClose();
        }
    };

    render() {
        const {
            isOpen,
        } = this.props;
        return (
            <Modal isOpen={isOpen} toggle={this.handleModalClose} className="signup-modal">

                <ModalHeader toggle={this.handleModalClose}>Create Slot</ModalHeader>

                <Form
                    innerRef={this.formRef}
                    onSubmit={this.handleSubmitLogin}
                    encType="multipart/form-data"
                >
                    <ModalBody>
                        <p>Pay with lightning to reserve a unique proof-of-publication slot for {milliSatsToSats(this.state.fee_rate_per_month_in_msat)} sats a month</p>
                        <FormGroup>
                            <Label className="f-bold fs14">Months</Label>
                            <Input type="select" name="months" onChange={this.handleChange}>
                                <option value="1" selected>1 month</option>
                                <option value="2">2 months</option>
                                <option value="3">3 months</option>
                                <option value="">Custom</option>
                            </Input>
                        </FormGroup>
                        {this.state.inputs.months === '' ? (
                        <FormGroup>
                            <Label className="f-bold fs14">Custom Months</Label>
                            <Input
                                name="customMonths"
                                type="number"
                                bsSize="sm"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        ) : null}
                        {this.state.invoice !== '' ? (
                        <FormGroup>
                            <Label className="f-bold fs14">Invoice</Label>
                            <InputGroup>
                            <Input
                                type="textarea"
                                name="invoice"
                                value={this.state.invoice}
                                readOnly
                            />
                             <InputGroupAddon addonType="append">
                                <Button
                                onClick={this.handleCopyInvoice}
                                color={this.state.copied ? 'secondary' : 'success'}
                                >
                                {this.state.copied ? 'Copied' : 'Copy'}
                                </Button>
                            </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                        ) : null}
                    </ModalBody>
                    <ModalFooter>
                        {this.state.invoice === '' ? (
                            <Button color="success" type="submit" onClick={this.handleGenerateInvoice}>Generate Invoice</Button>
                        ) : (
                            <Button color="success" type="submit" onClick={this.handleVerifyInvoice}>Verify</Button>
                        )}
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

CreateSlotModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onModalClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    onError: PropTypes.func
};

export default CreateSlotModal;
