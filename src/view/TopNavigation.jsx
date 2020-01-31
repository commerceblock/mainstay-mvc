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

    setLight = () => {
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
        if (document.querySelector('body').classList.contains('slider-hidden')) {
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

    hideMobileMenu = (event) => {
        this.setState({
            isNavbarOpened: false
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (window.location.pathname !== '/') {
            document.getElementById('top-search').classList.remove('hide-on-slider');
            document.getElementById('show-slider-btn').classList.remove('hide');
            document.getElementById('show-slider-btn').classList.add('hide')


        } else {
            document.getElementById('show-slider-btn').classList.remove('hide');
            document.getElementById('top-search').classList.remove('hide-on-slider');
            document.getElementById('top-search').classList.add('hide-on-slider')
        }
    }

    componentDidMount() {
        document.body.addEventListener('click', this.hideMobileMenu);
        if (window.location.pathname !== '/') {
            document.getElementById('top-search').classList.remove('hide-on-slider')
        }
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.hideMobileMenu);
    }

    render() {
        return (
            <>
                <Navbar color="faded" light expand="lg">
                    <NavbarBrand className="mr-auto" href="/"><Logo/></NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbarHandler}/>
                    <Collapse isOpen={this.state.isNavbarOpened} navbar>
                        <Nav className="ml-auto d-flex justify-content-end" navbar>
                            <NavItem className="search-item hide-on-slider" id="top-search">
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
                            <NavItem className="hover-btn-active none-on-slider" id="show-slider-btn">
                                <Button color="secondary" onClick={this.toggleSlider}>
                                    <img src="icon-eye.svg"/>
                                </Button>
                            </NavItem>
                            <NavItem className="hover-btn-active hideMenuItem">
                                <Button>
                                    {this.getTheme() === 'dark' ?
                                        <div onClick={this.setLight}>
                                            <svg className="sun" xmlns="http://www.w3.org/2000/svg" x="0" y="0"
                                                 viewBox="0 0 1000 1000">
                                                <path
                                                    d="M815.2 499.7c0-42.7-8.3-83.4-24.9-122.3-16.6-38.8-39-72.4-67.3-100.7-28.3-28.3-61.8-50.7-100.7-67.3-38.9-16.6-79.6-24.9-122.3-24.9s-83.4 8.3-122.3 24.9c-38.8 16.6-72.4 39-100.7 67.3-28.3 28.3-50.7 61.8-67.3 100.7-16.6 38.9-24.9 79.6-24.9 122.3s8.3 83.4 24.9 122.3c16.6 38.9 39 72.4 67.3 100.7 28.3 28.3 61.8 50.7 100.7 67.3 38.9 16.6 79.6 24.9 122.3 24.9s83.4-8.3 122.3-24.9c38.8-16.6 72.4-39 100.7-67.3 28.3-28.3 50.7-61.8 67.3-100.7 16.6-38.8 24.9-79.6 24.9-122.3zm151 151.6c-1.5 5.5-5.1 9.1-10.9 10.9l-159.8 52.5v167.4c0 5.8-2.4 10.6-7.1 14.2-5.5 3.6-10.8 4.4-15.9 2.2l-159.8-51.4-98.5 135.7c-3.6 4.7-8.4 7.1-14.2 7.1s-10.6-2.4-14.2-7.1l-98.5-135.7-159.8 51.4c-5.1 2.2-10.4 1.5-15.9-2.2-4.7-3.6-7.1-8.4-7.1-14.2V714.8L44.7 662.2c-5.8-1.8-9.5-5.5-10.9-10.9-1.8-6.2-1.1-11.5 2.2-15.9l98.5-135.7L36 364c-3.3-4.7-4-10-2.2-15.9 1.5-5.5 5.1-9.1 10.9-10.9l159.8-52.5V117.2c0-5.8 2.4-10.6 7.1-14.2 5.5-3.6 10.8-4.4 15.9-2.2l159.8 51.4 98.5-135.7c3.3-4.4 8-6.6 14.2-6.6s10.9 2.2 14.2 6.6l98.5 135.7 159.8-51.4c5.1-2.2 10.4-1.5 15.9 2.2 4.7 3.6 7.1 8.4 7.1 14.2v167.4l159.8 52.5c5.8 1.8 9.5 5.5 10.9 10.9 1.8 5.8 1.1 11.1-2.2 15.9l-98.5 135.7L964 635.4c3.3 4.4 4 9.7 2.2 15.9z"></path>
                                            </svg>
                                        </div>
                                        : <div onClick={this.setDark}>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 1000 1000">
                                                <path
                                                    d="M525.3 989.5C241.2 989.5 10 758.3 10 474.1c0-196.8 109.6-373.6 285.9-461.4 7.9-3.9 17.5-2.4 23.7 3.8 6.2 6.2 7.9 15.8 4 23.7-32.2 65.4-48.5 135.7-48.5 208.9 0 261.4 212.7 474.1 474.1 474.1 74 0 145-16.7 211-49.5 7.9-3.9 17.5-2.4 23.7 3.8 6.3 6.3 7.9 15.8 3.9 23.7C900.5 879 723.3 989.5 525.3 989.5z"></path>
                                            </svg>
                                        </div>
                                    }
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
