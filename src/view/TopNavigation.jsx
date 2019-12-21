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
            darkMode: false,
            theme_name: false
        };
    }

    toggleCommitmentModal = () => {
        this.setState({modal: !this.state.modal});
    };

    setTheme = (theme) => {
        let body;
        body = document.getElementById('body');
        if (theme === 'dark') {
            body.classList.add("darkMode");
        } else {
            body.classList.remove("darkMode");
        }
    };


    setDark = () => {
        this.setTheme('dark');
        this.setState({theme_name: !this.state.theme_name});

        const localData = localStorage.setItem("preference-theme", 'dark')

    };

    setLight = () =>  {
        this.setTheme('light');
        this.setState({theme_name: !this.state.theme_name});
        const localData = localStorage.setItem("preference-theme", 'light')

    };

    getTheme = () => {
        const pref = localStorage.getItem('preference-theme');

        if (
            pref === "light"
        ) return 'light';
        else if (
            pref === "dark"
        ) return 'dark';

        else return 'light'
    };

    componentWillMount() {
        const theme = this.getTheme();
        this.setTheme(theme);
    }

    toggleSignUpModal = () => {
        this.setState({modalLogin: !this.state.modalLogin});
    };

    toggleSlider = () => {
        if(document.querySelector('body').classList.contains('slider-hidden')) {
          document.querySelector('body').classList.remove('slider-hidden');
        } else {
          document.querySelector('body').classList.add('slider-hidden');
        }
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
                    <NavbarBrand className="mr-auto" href="/"><Logo/></NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbarHandler}/>
                    <Collapse isOpen={this.state.isNavbarOpened} navbar>
                        <Nav className="ml-auto d-flex justify-content-end" navbar>
                            <NavItem className="search-item hide-on-slider">
                                <Search/>
                            </NavItem>
                            <NavItem className="hover-active">
                                <Link className="nav-link"
                                      to={getRoute(routes.attestation, {value: null})}>Attestations</Link>
                            </NavItem>
                            <NavItem className="hover-active">
                                <Link className="nav-link" to={routes.client}>Clients</Link>
                            </NavItem>
                            <NavItem className="hover-btn-active sendCommitment">
                                <Button color="success" onClick={this.toggleCommitmentModal}>
                                    Send Commitment
                                </Button>
                            </NavItem>
                            <NavItem className="hover-btn-active none-on-slider px-lg-0">
                                <Button color="secondary" onClick={this.toggleSignUpModal}>
                                    Sign Up
                                </Button>
                            </NavItem>
                            <NavItem className="hover-btn-active none-on-slider">
                                <Button color="secondary" onClick={this.toggleSlider}>
                                    <img src="icon-eye.svg" />
                                </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
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
