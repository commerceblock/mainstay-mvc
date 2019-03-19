import Axios from 'axios';
import React, {Component} from 'react';
import swal from 'sweetalert';
import {
    Button,
    Form, FormGroup,
    Input,
    Label,
    Modal, ModalBody, ModalFooter, ModalHeader,
    Dropdown, DropdownMenu, DropdownToggle, DropdownItem,
} from 'reactstrap';
import { routes }from './routes';


const options = [
    { label: 'Position', name: 'position', hint: '0' },
    { label: 'Token', name: 'token', hint: '4c8c006d-4cee-4fef-8e06-bb8112db6314' },
    { label: 'Commitment', name: 'commitment', hint: '6a855c1c70849ed28eb51cffd808ccd4e45c4cdddfa17495ccf98856b2421b8e' },
    { label: 'signature', name: 'signature', hint: '7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090' },
];

class Menu extends Component {
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
                    ? `Incorrect ${res.data.error}`
                    : `Something went wrong`;
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

    toggleMenu = () => {
        this.setState({ isMenuOpened: !this.state.isMenuOpened });
    };

    render() {
        const { buttonLabel } = this.props;
        const { modal, isMenuOpened } = this.state;
        return (
            <div className="clickable">
                <Dropdown isOpen={isMenuOpened} toggle={this.toggleMenu} direction="left">
                    <DropdownToggle
                        tag="span"
                        onClick={this.toggleMenu}
                        data-toggle="dropdown"
                        aria-expanded={isMenuOpened}
                    >
                        <span className="patty" />
                        <span className="patty" />
                        <span className="patty short" />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem href={routes.home} className="menu no-underline" color="muted">
                            Home {buttonLabel}
                        </DropdownItem>
                        <DropdownItem href={routes.attestation} className="menu no-underline" color="muted">
                            Attestations {buttonLabel}
                        </DropdownItem>
                        <DropdownItem tag="a" href={routes.client} className="menu no-underline" color="muted">
                            Clients {buttonLabel}
                        </DropdownItem>
                        <DropdownItem className="menu" color="muted" onClick={this.toggle}>
                            Send Commitment {buttonLabel}
                        </DropdownItem>
                        <DropdownItem
                            href="https://github.com/commerceblock/mainstay-mvc/blob/develop/doc/mainstay_api.md"
                            className="menu"
                            color="muted" target="_blank"
                        >
                            API information {buttonLabel}
                        </DropdownItem>
                        <DropdownItem tag="a" href={routes.pricing} className="menu no-underline" color="muted">
                            Pricing {buttonLabel}
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Send Commitment</ModalHeader>
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
                            <Button color="danger" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Menu;
