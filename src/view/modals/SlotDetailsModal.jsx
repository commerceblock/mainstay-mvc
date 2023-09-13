import React from 'react';
import PropTypes from 'prop-types';

import swal from 'sweetalert';
import {Button, Form, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';


class SlotDetailsModal extends React.PureComponent {

    constructor(props) {
        super(props);

        this.formRef = React.createRef();
    }

    showErrorAlert = (message) => {
        return swal({
            text: message,
            icon: 'error',
            className: 'error',
            closeOnClickOutside: true
        });
    };

    resetFormState = () => {
        this.formRef.current.reset();
    };

    handleModalClose = () => {
        this.resetFormState();
        if (this.props.onModalClose) {
            this.props.onModalClose();
        }
    };

    render() {
        const {
            isOpen,
        } = this.props;
        return (
            <Modal isOpen={isOpen} toggle={this.handleModalClose} className="signup-modal">

                <ModalHeader toggle={this.handleModalClose}>Slot Details</ModalHeader>

                <Form
                    innerRef={this.formRef}
                    encType="multipart/form-data"
                >
                    <ModalBody>
                        <h6><b>Token :</b> {this.props.slotDetails.auth_token}</h6>
                        <h6><b>Slot :</b> {this.props.slotDetails.slot_id}</h6>
                        <h6><b>Expiry Date:</b> {this.props.slotDetails.expiry_date}</h6>
                        <h6>Save these details to commit data and generate proofs</h6>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="none" onClick={this.handleModalClose}>Close</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

SlotDetailsModal.propTypes = {
    slotDetails: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onModalClose: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
};

export default SlotDetailsModal;
