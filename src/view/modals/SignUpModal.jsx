import React from 'react';
import PropTypes from 'prop-types';
import Axios from "axios";

import {isValidEmail} from '../../utils/validators';

import swal from "sweetalert";
import {
    Button, ModalHeader, Form, ModalBody, FormGroup, Label, Input, ModalFooter, Modal, CustomInput
} from 'reactstrap';


class SignUpModal extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            inputs: {
                name: '',
                email: '',
                address: '',
                key: '',
                image: null
            },
            filePathLabel: ''
        };

        this.loginImageFileInputRef = React.createRef();
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

    handleFileChange = (event) => {

        const input = event.target;

        let filePathLabel = '';
        if (input.value.indexOf('fakepath') !== -1) {
            let parts = input.value.split('\\');
            filePathLabel = parts[parts.length - 1];
        } else {
            filePathLabel = input.value;
        }
        this.setState({filePathLabel})
    }

    showErrorAlert = (message) => {
        return swal({
            text: message,
            icon: "error",
            className: "error",
            closeOnClickOutside: true
        });
    };

    handleSubmitLogin = (event) => {
        event.preventDefault();

        const form = event.target;

        const {name, email, address, key} = this.state.inputs;

        if (!name || !name.trim()) {
            return this.showErrorAlert('Full Name is empty');
        }

        if (!email || !email.trim()) {
            return this.showErrorAlert('Email is empty');
        }

        if (!isValidEmail(email)) {
            return this.showErrorAlert('Email is no valid.');
        }

        if (!address || !address.trim()) {
            return this.showErrorAlert('Address is empty');
        }

        if (!key || !key.trim()) {
            return this.showErrorAlert('Public key is empty');
        }

        if (this.loginImageFileInputRef.current.files.length === 0) {
            return this.showErrorAlert('No image selected');
        }

        const formData = new FormData();
        formData.set('full_name', name);
        formData.set('email', email);
        formData.set('address', address);
        formData.set('pubkey', key);
        formData.append('image', this.loginImageFileInputRef.current.files[0]);

        Axios({
            url: '/ctrl/usersignup',
            method: 'post',
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        }).then(res => {

            if (this.props.onSuccess) {
                this.props.onSuccess(res);
            }
            // reset the form
            form.reset();
            this.setState({filePathLabel: ''});
        }).catch(error => {
            if (this.props.onError) {
                this.props.onError(error);
            }
        });
    };

    render() {
        const {
            isOpen,
            closeModalHandler
        } = this.props;
        return (
            <Modal isOpen={isOpen} toggle={closeModalHandler}>

                <ModalHeader toggle={closeModalHandler}>Sign Up</ModalHeader>

                <Form
                    onSubmit={this.handleSubmitLogin}
                    encType="multipart/form-data"
                >
                    <ModalBody>
                        <FormGroup>
                            <Label className="f-bold fs14">Full Name</Label>
                            <Input
                                name="name"
                                bsSize="sm"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label className="f-bold fs14">Address</Label>
                            <Input
                                name="address"
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
                                name="key"
                                bsSize="sm"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label className="f-bold fs14">Upload Passport / ID image</Label>
                            <CustomInput
                                onChange={this.handleFileChange}
                                type="file"
                                label={this.state.filePathLabel}
                                multiple={false}
                                innerRef={this.loginImageFileInputRef}
                            />
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="none" onClick={closeModalHandler}>Cancel</Button>
                        <Button color="success" type="submit">Submit</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

SignUpModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModalHandler: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    onError: PropTypes.func
};

export default SignUpModal;
