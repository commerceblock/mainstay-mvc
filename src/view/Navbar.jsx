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
            modalLogin: false,
            position: undefined,
            token: undefined,
            commitment: undefined,
            signature: undefined,
            isMenuOpened: false,
            name: undefined,
            email: undefined,
            address: undefined,
            key: undefined,
            image: undefined
        };

        this.loginImageFileInput = React.createRef();
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

    handleSubmitLogin = (e) => {
        e.preventDefault();

        const {name, email, address, key} = this.state;


        if (!this.loginImageFileInput.current.files[0]) {
            return swal({
                text: "No image selected",
                icon: "error",
                className: "error",
                closeOnClickOutside: true
            });
        }

        const formData = new FormData();
        formData.set('full_name', name);
        formData.set('email', email);
        formData.set('address', address);
        formData.set('pubkey', key);
        formData.append('image', this.loginImageFileInput.current.files[0]);

        Axios({
            url: '/ctrl/usersignup',
            method: 'post',
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        }).then(res => {
            this.setState({modalLogin: false});
            swal({
                text: "Success!",
                icon: "success",
                className: "success",
                closeOnClickOutside: true
            });
        }).catch(error => {

            return swal({
                text: error.response.data.message || 'Something get wrong',
                icon: "error",
                className: "error",
                closeOnClickOutside: true
            });
        });
    };

    toggle = () => {
        this.setState({modal: !this.state.modal});
    };

    toggleLogin = () => {
        this.setState({modalLogin: !this.state.modalLogin});
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
                        <NavItem className="col-sm-12 col-lg-5 col-md-5 hover-btn-active">
                            <Button color="success" onClick={this.toggleLogin}>Login</Button>
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

                <Modal isOpen={this.state.modalLogin} toggle={this.toggleLogin}>

                    <Form onSubmit={this.handleSubmitLogin} encType="multipart/form-data">
                        <ModalBody>
                            <FormGroup>
                                <Label className="f-bold fs14">Full Name</Label>
                                <Input
                                    name="name"
                                    required
                                    bsSize="sm"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label className="f-bold fs14">Address</Label>
                                <Input
                                    name="address"
                                    required
                                    bsSize="sm"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label className="f-bold fs14">Email</Label>
                                <Input
                                    name="email"
                                    required
                                    type="email"
                                    bsSize="sm"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label className="f-bold fs14">Public key</Label>
                                <Input
                                    name="key"
                                    required
                                    bsSize="sm"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label className="fileContainer">
                                    <span className="fileContainer-txt">
                                    Upload Passport / ID image
                                    </span>
                                    <input type="file" id="upload" ref={this.loginImageFileInput}/>
                                </label>
                            </FormGroup>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="none" onClick={this.toggleLogin}>Cancel</Button>
                            <Button color="success" type="submit">Send</Button>
                        </ModalFooter>
                    </Form>
                </Modal>

            </div>
        );
    }
}

export default Navbar;
