import Axios from 'axios';
import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      position: undefined,
      token: undefined,
      commitment: undefined,
      signature: undefined
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    Axios.post('/ctrl/sendcommitment', {
      position: this.state.position,
      token: this.state.token,
      commitment: this.state.commitment,
      signature: this.state.signature
    }).then(res => {
      if(res.data && "error" in res.data){
        alert("error")
      }
      else {
        alert("success")
      }
    });
    this.toggle();
  }

  toggle() {
    this.setState({modal: !this.state.modal});
  }

  render() {
    return (
      <div id="menu">
        <Button color="muted" onClick={this.toggle}>Send Commitment {this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Send Commitment</ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody>
              <FormGroup>
                <Label>Position</Label>
                <Input name="position" bsSize="sm" onChange={this.handleChange} placeholder="0"/>
              </FormGroup>
              <FormGroup>
                <Label>Token</Label>
                <Input name="token" bsSize="sm" onChange={this.handleChange} placeholder="4c8c006d-4cee-4fef-8e06-bb8112db6314"/>
              </FormGroup>
              <FormGroup>
                <Label>Commitment</Label>
                <Input name="commitment" bsSize="sm" onChange={this.handleChange} placeholder="6a855c1c70849ed28eb51cffd808ccd4e45c4cdddfa17495ccf98856b2421b8e"/>
              </FormGroup>
              <FormGroup>
                <Label>Signature</Label>
                <Input name="signature" bsSize="sm" onChange={this.handleChange} placeholder="7cca9448ad3b3bc68c7b01405ccb8bd784f2673533024445f259389a5ad3d090"/>
              </FormGroup>
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
