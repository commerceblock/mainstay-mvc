import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

import {isValidEmail} from '../../utils/validators';

import swal from 'sweetalert';
import {
    Button, ModalHeader, Form, ModalBody, FormGroup, Label, Input, ModalFooter, Modal, CustomInput
} from 'reactstrap';

class SignUpModal extends React.PureComponent {

    constructor (props) {
        super(props);

        this.state = {
            inputs: {
                full_name: '',
                email: '',
                pubkey: '',
            },
            filePathLabel: ''
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
            icon: 'error',
            className: 'error',
            closeOnClickOutside: true
        });
    };

    handleSubmitLogin = (event) => {
        event.preventDefault();

        const form = event.target;

        const {full_name, email, pubkey} = this.state.inputs;

        if (!full_name || !full_name.trim()) {
            return this.showErrorAlert('Full Name is empty');
        }

        if (!email || !email.trim()) {
            return this.showErrorAlert('Email is empty');
        }

        if (!isValidEmail(email)) {
            return this.showErrorAlert('Email is no valid.');
        }

        if (!pubkey || !pubkey.trim()) {
            return this.showErrorAlert('Public key is empty');
        }

        const data = {
            full_name,
            email,
            pubkey
        };

        Axios({
            url: '/ctrl/usersignup',
            method: 'post',
            data: data,
        }).then(res => {
            if (this.props.onSuccess) {
                this.props.onSuccess(res);
            }
            // reset the form
            this.resetFormState();
        }).catch(error => {
            if (this.props.onError) {
                this.props.onError(error);
            }
        });
    };

    resetFormState = () => {
        this.formRef.current.reset();
        this.setState({filePathLabel: ''});
        this.setState({inputs: {}});
    };

    handleModalClose = () => {
        this.resetFormState();
        if (this.props.onModalClose) {
            this.props.onModalClose();
        }
    };

    render () {
        const {
            isOpen,
        } = this.props;
        return (
            <Modal isOpen={isOpen} toggle={this.handleModalClose}>

                <ModalHeader toggle={this.handleModalClose}>Sign Up</ModalHeader>

                <Form
                    innerRef={this.formRef}
                    onSubmit={this.handleSubmitLogin}
                    encType="multipart/form-data"
                >
                    <ModalBody>
                        <FormGroup>
                            <Label className="f-bold fs14">Full Name</Label>
                            <Input
                                name="full_name"
                                bsSize="sm"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="f-bold fs14">Email</Label>
                            <Input
                                name="email"
                                type="email"
                                bsSize="sm"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="f-bold fs14">Public key</Label>
                            <Input
                                name="pubkey"
                                bsSize="sm"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="none" onClick={this.handleModalClose}>Cancel</Button>
                        <Button color="success" type="submit">Submit</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

SignUpModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onModalClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    onError: PropTypes.func
};

export default SignUpModal;
