import React from 'react';
import {
    Navbar as NavbarOrigin,
    Nav, NavItem, NavLink,
    Button, ModalHeader, Form, ModalBody, FormGroup, Label, Input, ModalFooter, Modal,
} from 'reactstrap';

import {routes} from './routes';
import Axios from "axios";
import swal from "sweetalert";
import {Link} from 'react-router-dom';

const options = [
    {label: 'Position*', name: 'position'},
    {label: 'Token*', name: 'token'},
    {label: 'Commitment*', name: 'commitment'},
    {label: 'Signature (optional)', name: 'signature'},
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
        const {position, token, commitment, signature} = this.state;
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
        this.setState({modal: !this.state.modal});
    };

    render() {
        return (
            <div className="col-lg-4 col-md-5">
                <NavbarOrigin>
                    <Nav className="col-lg-12 col-md-12">
                        <NavItem className="col-sm-12 col-lg-3 col-md-3 hover-active">
                            <Link to={routes.attestation}>Attestations</Link>
                        </NavItem>
                        <NavItem className="col-sm-12 col-lg-3 col-md-3 hover-active">
                            <Link to={routes.client}>Clients</Link>
                        </NavItem>
                        <NavItem className="col-sm-12 col-lg-5 col-md-5 hover-btn-active">
                            <Button color="success" onClick={this.toggle}>Send Commitment</Button>
                        </NavItem>
                    </Nav>
                </NavbarOrigin>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Send Commitment</ModalHeader>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            {options.map(({label, name}) => (
                                <FormGroup key={name}>
                                    <Label className="f-bold fs14">{label}</Label>
                                    <Input
                                        name={name}
                                        bsSize="sm"
                                        onChange={this.handleChange}
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
