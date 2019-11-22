import React from 'react';
import PropTypes from 'prop-types';

import swal from 'sweetalert';
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';

import {isValidEmail} from '../../utils/validators';
import apiService from '../../helpers/api-service';

class SignUpModal extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            inputs: {
                first_name: '',
                last_name: '',
                email: '',
                company: '',
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

        const {first_name, last_name, email, company, pubkey} = this.state.inputs;

        if (!first_name || !first_name.trim()) {
            return this.showErrorAlert('First Name is empty');
        }

        if (!last_name || !last_name.trim()) {
            return this.showErrorAlert('Last Name is empty');
        }

        if (!email || !email.trim()) {
            return this.showErrorAlert('Email is empty');
        }

        if (!isValidEmail(email)) {
            return this.showErrorAlert('Email is no valid.');
        }

        const data = {
            first_name,
            last_name,
            email,
            company,
            pubkey
        };

        apiService.axiosClient({
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

    render() {
        const {
            isOpen,
        } = this.props;
        return (
            <Modal isOpen={isOpen} toggle={this.handleModalClose} className="signup-modal">

                <ModalHeader toggle={this.handleModalClose}>Sign Up</ModalHeader>

                <Form
                    innerRef={this.formRef}
                    onSubmit={this.handleSubmitLogin}
                    encType="multipart/form-data"
                >
                    <ModalBody>
                        <p>1. Please provide your details below</p>
                        <p>2. You will receive an email confirmation with a link to KYC verification</p>
                        <p>3. Perform KYC verification via OnFido</p>
                        <p>4. You will receive a confirmation email with a link to the payment setup</p>
                        <p>5. Please provide your payment details</p>
                        <p>6. You will received your attestation slot via email</p>
                        <p>7. Start securing your data!</p>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label className="f-bold fs14">First Name*</Label>
                                    <Input name="first_name"
                                           bsSize="sm"
                                           onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label className="f-bold fs14">Last Name*</Label>
                                    <Input name="last_name"
                                           bsSize="sm"
                                           onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label className="f-bold fs14">Email*</Label>
                            <Input
                                name="email"
                                type="email"
                                bsSize="sm"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="f-bold fs14">Company Name (optional)</Label>
                            <Input
                                name="company"
                                type="text"
                                bsSize="sm"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="f-bold fs14">Public Key (optional)</Label>
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
