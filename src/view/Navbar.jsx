import React from 'react';
import {Link} from 'react-router-dom';

import swal from "sweetalert";
import {
    Navbar as NavbarOrigin,
    Nav, NavItem,
    Button,
} from 'reactstrap';

import {routes} from './routes';

import SignUpModal from './modals/SignUpModal';
import SendCommitmentModal from "./modals/SendCommitmentModal";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalLogin: false,
            isMenuOpened: false,
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
            text: "Success!",
            icon: "success",
            className: "success",
            closeOnClickOutside: true
        });
    };
    onSignUpError = (error) => {
        swal({
            text: error.response.data.message || 'Something get wrong',
            icon: "error",
            className: "error",
            closeOnClickOutside: true
        });
    };

    onSendCommitmentSuccess = (res) => {
        swal({
            text: "Success!",
            icon: "success",
            className: "success",
            closeOnClickOutside: true
        });
    };

    onSendCommitmentError = (res) => {
        const errorMessage = res.data.error === 'undefined'
            ? `Something went wrong`
            : `Incorrect ${res.data.error}`;
        swal({
            text: errorMessage,
            icon: "error",
            className: "error",
            closeOnClickOutside: true
        });
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
                            <Button color="success" onClick={this.toggleCommitmentModal}>Send Commitment</Button>
                        </NavItem>
                        <NavItem className="col-sm-12 col-lg-5 col-md-5 hover-btn-active">
                            <Button color="success" onClick={this.toggleSignUpModal}>Sign Up</Button>
                        </NavItem>
                    </Nav>
                </NavbarOrigin>

                <SendCommitmentModal
                    isOpen={this.state.modal}
                    closeModalHandler={this.toggleCommitmentModal}
                    onSuccess={this.onSendCommitmentSuccess}
                    onError={this.onSendCommitmentError}
                />

                <SignUpModal
                    isOpen={this.state.modalLogin}
                    closeModalHandler={this.toggleSignUpModal}
                    onSuccess={this.onSignUpSuccess}
                    onError={this.onSignUpError}
                />

            </div>
        );
    }
}

export default Navbar;
