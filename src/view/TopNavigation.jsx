import React from 'react';

import swal from 'sweetalert';
import {Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from 'reactstrap';

import {getRoute, routes} from './routes';

import SignUpModal from './modals/SignUpModal';
import SendCommitmentModal from './modals/SendCommitmentModal';
import {Link} from 'react-router-dom';
import Logo from './Logo';
import Search from './search/search';

class TopNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalLogin: false,
            isNavbarOpened: false,
        };
    }

    toggleCommitmentModal = () => {
        this.setState({modal: !this.state.modal});
    };

    toggleSignUpModal = () => {
        this.setState({modalLogin: !this.state.modalLogin});
    };

    onSignUpSuccess = (res) => {
        this.setState({modalLogin: false});
        swal({
            text: 'Thank you!\nYou will shortly receive an email from us with information about the next steps.',
            icon: 'success',
            className: 'success',
            closeOnClickOutside: true
        });
    };
    onSignUpError = (error) => {
        swal({
            text: error.response.data.message || 'Something get wrong',
            icon: 'error',
            className: 'error',
            closeOnClickOutside: true
        });
    };

    onSendCommitmentSuccess = (res) => {
        swal({
            text: 'Success!',
            icon: 'success',
            className: 'success',
            closeOnClickOutside: true
        });
    };

    onSendCommitmentError = (res) => {
        const errorMessage = res.data.error === 'undefined'
            ? 'Something went wrong'
            : `Incorrect ${res.data.error}`;
        swal({
            text: errorMessage,
            icon: 'error',
            className: 'error',
            closeOnClickOutside: true
        });
    };

    toggleNavbarHandler = () => {
        this.setState({
            isNavbarOpened: !this.state.isNavbarOpened
        });
    };

    render() {
        return (
            <>
                <Navbar color="faded" light expand="lg">
                    <NavbarBrand className="mr-auto"><Logo /></NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbarHandler} className="mr-2" />
                    <Collapse isOpen={this.state.isNavbarOpened} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem className="search-item">
                                <Search />
                            </NavItem>
                            <NavItem className="hover-active">
                                <Link className="nav-link"
                                      to={getRoute(routes.attestation, {value: null})}>Attestations</Link>
                            </NavItem>
                            <NavItem className="hover-active">
                                <Link className="nav-link" to={routes.client}>Clients</Link>
                            </NavItem>
                            <NavItem className="hover-btn-active">
                                <Button color="success" onClick={this.toggleCommitmentModal}>
                                    Send Commitment
                                </Button>
                            </NavItem>
                            <NavItem className="hover-btn-active">
                                <Button color="success" onClick={this.toggleSignUpModal}>
                                    Sign Up
                                </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    <div className="mobile-search">
                        <Search />
                    </div>
                </Navbar>
                <SendCommitmentModal
                    isOpen={this.state.modal}
                    onModalClose={this.toggleCommitmentModal}
                    onSuccess={this.onSendCommitmentSuccess}
                    onError={this.onSendCommitmentError}
                />

                <SignUpModal
                    isOpen={this.state.modalLogin}
                    onModalClose={this.toggleSignUpModal}
                    onSuccess={this.onSignUpSuccess}
                    onError={this.onSignUpError}
                />
            </>
        );
    }
}

export default TopNavigation;
