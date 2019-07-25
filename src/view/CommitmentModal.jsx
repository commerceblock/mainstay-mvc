import React from 'react';

import Axios from "axios";
import swal from "sweetalert";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap/src";

const options = [
    { label: 'Position', name: 'position', hint: '0' },
    { label: 'Token', name: 'token', hint: '4c8c006d-4cee-4fef-8e06-bb8112db6314' },
    { label: 'Commitment', name: 'commitment', hint: '6a855c1c70849ed28eb51cffd808ccd4e45c4cdddfa17495ccf98856b2421b8e' },
    { label: 'signature', name: 'signature', hint: '7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090' },
];

class CommitmentModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: undefined,
            token: undefined,
            commitment: undefined,
            signature: undefined,
        };
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { position, token, commitment, signature } = this.state;
        Axios.post('/ctrl/sendcommitment', {
            position,
            token,
            commitment,
            signature,
        }).then(res => {
            if (res.data?.error) {
                const errorMessage = res.data.error === 'undefined'
                    ? `Something went wrong`
                    : `Incorrect ${res.data.error}`;
                swal({
                    text: errorMessage,
                    icon: "error",
                    className: "error",
                    closeOnClickOutside: true
                });
            } else {
                swal({
                    text: "Success!",
                    icon: "success",
                    className: "success",
                    closeOnClickOutside: true
                });
            }
        });
        this.toggle();
    };

    render() {
        return (
            <Modal isOpen={this.props.isOpened} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Send Commitment</ModalHeader>
                <Form onSubmit={this.handleSubmit}>
                    <ModalBody>
                        {options.map(({ label, name, hint }) => (
                            <FormGroup key={name}>
                                <Label>{label}</Label>
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
                        <Button color="success" type="submit">Send</Button>
                        <Button color="danger" onClick={this.props.toggle}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

export default CommitmentModal;
