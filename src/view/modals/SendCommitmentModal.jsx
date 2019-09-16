import React from 'react'
import PropTypes from 'prop-types';
import Axios from "axios";

import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import swal from "sweetalert";

const options = [
    {label: 'Position*', name: 'position', hint: '0'},
    {label: 'Token*', name: 'token', hint: '4c8c006d-4cee-4fef-8e06-bb8112db6314'},
    {label: 'Commitment*', name: 'commitment', hint: '6a855c1c70849ed28eb51cffd808ccd4e45c4cdddfa17495ccf98856b2421b8e'},
    {label: 'Signature (optional)', name: 'signature', hint: '7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090'},
];

class SendCommitmentModal extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                position: undefined,
                token: undefined,
                commitment: undefined,
                signature: undefined,
            }
        };
        this.formRef = React.createRef();
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
            icon: "error",
            className: "error",
            closeOnClickOutside: true
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const {position, token, commitment, signature} = this.state.inputs;

        if (!position || !position.trim()) {
            return this.showErrorAlert('Position is empty');
        }

        if (Number.isNaN(+position)) {
            return this.showErrorAlert('Position is not numeric');
        }

        if (!token || !token.trim()) {
            return this.showErrorAlert('Token is empty');
        }
        if (!commitment || !commitment.trim()) {
            return this.showErrorAlert('Commitment is empty');
        }
        if (!signature || !signature.trim()) {
            return this.showErrorAlert('Signature is empty');
        }

        Axios.post('/ctrl/sendcommitment', {
            position,
            token,
            commitment,
            signature,
        }).then(res => {
            if (res.data?.error) {
                if (this.props.onError) {
                    this.props.onError(res);
                }
            } else {
                if (this.props.onSuccess) {
                    this.props.onSuccess(res);
                }
            }
        });
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
        const {isOpen} = this.props;

        return (
            <Modal isOpen={isOpen} toggle={this.handleModalClose}>
                <ModalHeader toggle={this.handleModalClose}>Send Commitment</ModalHeader>
                <Form onSubmit={this.handleSubmit} innerRef={this.formRef}>
                    <ModalBody>
                        {options.map(({label, name, hint}) => (
                            <FormGroup key={name}>
                                <Label className="f-bold fs14">{label}</Label>
                                <Input
                                    name={name}
                                    bsSize="sm"
                                    onChange={this.handleChange}
                                    placeholder={hint}
                                />
                            </FormGroup>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="none" onClick={this.handleModalClose}>Cancel</Button>
                        <Button color="success" type="submit">Send</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

SendCommitmentModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onModalClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    onError: PropTypes.func
};
export default SendCommitmentModal;
