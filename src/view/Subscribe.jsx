import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Form
} from 'reactstrap';


class Subscribe extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange() {
        let path = `home`;
        this.props.history.push(path);
    }


    componentDidMount () {
        const el = document.createElement('script');
        el.onload = () => {
            window.Chargebee.init({
                "site": "mainstay-test"
            });
            window.Chargebee.registerAgain();
        };
        el.setAttribute('src', 'https://js.chargebee.com/v2/chargebee.js');
        document.body.appendChild(el);
    }

    render() {
        return (
            <div>
                <Modal isOpen={true} className="subscribe-modal">
                    <Form>
                        <ModalFooter>
                            <a href="javascript:void(0)" data-cb-type="checkout" data-cb-plan-id="mainstay-standard" className="swal-button">subscribe</a>
                            <Button color="danger" onClick={this.routeChange}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}


export default Subscribe;
