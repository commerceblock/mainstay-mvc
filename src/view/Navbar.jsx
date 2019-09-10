import React from 'react';
import {
    Navbar as NavbarOrigin,
    Nav, NavItem, NavLink,
    Button, ModalHeader, Form, ModalBody, FormGroup, Label, Input, ModalFooter, Modal,
} from 'reactstrap';

import { routes } from './routes';
import Axios from "axios";
import swal from "sweetalert";
import { Link } from 'react-router-dom';

const options = [
    { label: 'Position*', name: 'position', hint: '0' },
    { label: 'Token*', name: 'token', hint: '4c8c006d-4cee-4fef-8e06-bb8112db6314' },
    { label: 'Commitment*', name: 'commitment', hint: '6a855c1c70849ed28eb51cffd808ccd4e45c4cdddfa17495ccf98856b2421b8e' },
    { label: 'Signature (optional)', name: 'signature', hint: '7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090' },
];

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            position: undefined,
            token: undefined,
            commitment: undefined,
            signature: undefined,
            isMenuOpened: false,
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

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    render() {
        return (
            <div className="col-lg-4 col-md-5">
                <NavbarOrigin>
                    <Nav className="col-lg-12 col-md-12">
                        <NavItem className="col-sm-12 col-lg-3 col-md-3 hover-active">
                            <Link to={routes.attestation}>Attestations</Link>
                        </NavItem>
                        <NavItem  className="col-sm-12 col-lg-3 col-md-3 hover-active">
                            <Link to={routes.client}>Clients</Link>
                        </NavItem>
                        <NavItem  className="col-sm-12 col-lg-5 col-md-5 hover-btn-active">
                            <Button color="success" onClick={this.toggle}>Send Commitment</Button>
                        </NavItem>
                    </Nav>
                </NavbarOrigin>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Send Commitment</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            {options.map(({ label, name, hint }) => (
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
                            <Button color="none" onClick={this.toggle}>Cancel</Button>
                            <Button color="success" type="submit">Send</Button>
                        </ModalFooter>
                    </Form>
                </Modal>

            </div>
        );
    }
}

export default Navbar;
