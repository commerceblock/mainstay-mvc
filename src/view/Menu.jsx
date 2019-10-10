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
import {routes} from './routes';
import apiService from '../helpers/api-service';


const options = [
    {label: 'Position', name: 'position'},
    {label: 'Token', name: 'token'},
    {label: 'Commitment', name: 'commitment'},
    {label: 'signature', name: 'signature'},
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
        const {position, token, commitment, signature} = this.state;
        apiService.axiosClient.post('/ctrl/sendcommitment', {
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

    toggleMenu = () => {
        this.setState({isMenuOpened: !this.state.isMenuOpened});
    };

    render() {
        const {buttonLabel} = this.props;
        const {modal, isMenuOpened} = this.state;
        return (
            <div className="clickable">
                <Dropdown isOpen={isMenuOpened} toggle={this.toggleMenu} direction="left">
                    <DropdownToggle
                        tag="span"
                        onClick={this.toggleMenu}
                        data-toggle="dropdown"
                        aria-expanded={isMenuOpened}
                    >
                        <span className="patty"/>
                        <span className="patty"/>
                        <span className="patty short"/>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem href={routes.home} className="menu no-underline" color="muted">
                            Home {buttonLabel}
                        </DropdownItem>
                        <DropdownItem href="/attestation" className="menu no-underline" color="muted">
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
                            {options.map(({label, name}) => (
                                <FormGroup key={name}>
                                    <Label>{label}</Label>
                                    <Input
                                        name={name}
                                        bsSize="sm"
                                        onChange={this.handleChange}
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
