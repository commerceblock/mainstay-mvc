import React from 'react';
import PropTypes from 'prop-types';

import swal from 'sweetalert';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, InputGroup, InputGroupAddon} from 'reactstrap';

import apiService from '../../helpers/api-service';
import QRCode from "qrcode.react";

class CreateSlotModal extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            inputs: {
                months: 1,
            },
            fee_rate_per_month_in_eur: '',
            invoice: '',
            copied: false,
            confirmed: false,
        };

        this.formRef = React.createRef();
    }

    componentDidMount() {
        apiService.axiosClient.get('/api/v1/feerate')
            .then(({ data, error }) => {
                if (data?.response) {
                    this.setState({ fee_rate_per_month_in_eur: data.response.fee_rate });
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
        this.setState({invoice: ''});
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

        const fee_rate = this.state.fee_rate_per_month_in_eur;
        const amount = fee_rate * months;

        apiService.axiosClient.get(`/api/v1/token/init/?value=${amount}`)
            .then(({ data, error }) => {
                if (data?.response) {
                    this.setState({invoice: data.response.lightning_invoice.bolt11});
                    this.props.setSlotDetails('token_id', data.response.token_id);
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
        const token_id = this.props.slotDetails.token_id;

        apiService.axiosClient.get(`api/v1/token/verify/?token_id=${token_id}`)
            .then(({ data, error }) => {
                if (data?.response) {
                    this.setState({confirmed: data.response.confirmed});
                }
                if (this.state.confirmed) {
                    this.handleTokenForSpend(token_id);
                    this.props.toggleSlotDetailsModal();
                    this.handleModalClose();
                } else {
                    this.showErrorAlert('Payment not received yet');
                }
            });
    };

    handleTokenForSpend = (tokenId) => {
        const slot_id = this.props.slotDetails.slot_id === '' ? 0 : this.props.slotDetails.slot_id;
        apiService.axiosClient.post('api/v1/spendtoken', {
            token_id: tokenId,
            slot_id,
        }).then(res => {
            if (res.data) {
                this.props.setSlotDetails('auth_token', res.data.response.auth_token);
                this.props.setSlotDetails('slot_id', res.data.response.slot_id);
                this.props.setSlotDetails('expiry_date', (new Date(res.data.response.expiry_date)).toString());
            } else {
                this.showErrorAlert('Something went wrong in slot allocation');
            }
        });
    }

    handleTokenForTestnet = (event) => {
        event.preventDefault();
        const token_id = this.props.slotDetails.token_id;
        this.handleTokenForSpend(token_id);
        this.props.toggleSlotDetailsModal();
        this.handleModalClose();
    };

    resetFormState = () => {
        this.formRef.current.reset();
        this.setState({
            inputs: {
                months: 1,
            },
            invoice: '',
            copied: false,
            confirmed: false,
        });
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

                <ModalHeader toggle={this.handleModalClose}>{this.props.slotDetails.new_slot ? 'Create Slot' : 'Pay for existing Slot'}</ModalHeader>

                <Form
                    innerRef={this.formRef}
                    encType="multipart/form-data"
                >
                    <ModalBody>
                        {this.props.slotDetails.new_slot ?
                            <h6>Pay with lightning to reserve a unique proof-of-publication slot for {this.state.fee_rate_per_month_in_eur} EUR a month</h6>
                            : 
                            <h6>Pay with lightning to keep using slot number {this.props.slotDetails.slot_id} for {this.state.fee_rate_per_month_in_eur} EUR a month</h6>
                        }
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
                            <Label className="f-bold fs14">Invoice: </Label>
                            <QRCode className="qr-code" value={this.state.invoice} />
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
                        {process.env.TESTNET === 'true' && (
                            <Button color="success" type="submit" onClick={this.handleTokenForTestnet}>
                                Create Slot
                            </Button>
                        )}
                        {process.env.TESTNET !== 'true' && (
                            this.state.invoice === '' ? (
                                <Button color="success" type="submit" onClick={this.handleGenerateInvoice}>Generate Invoice</Button>
                            ) : (
                                <Button color="success" type="submit" onClick={this.handleVerifyInvoice}>Verify</Button>
                            )
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
    onError: PropTypes.func,
    slotDetails: PropTypes.object,
    setSlotDetails: PropTypes.func,
    toggleSlotDetailsModal: PropTypes.func,
};

export default CreateSlotModal;
