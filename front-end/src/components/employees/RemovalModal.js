import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import axios from "axios";
import API_URL from "../../constants/Index";
import { Redirect } from 'react-router-dom';

class RemovalModal extends Component {
  state = {
    modal: false,
    error: null // State variable to hold error information
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal,
      error: null // Reset error state when modal is toggled
    }));
  };

  deleteTask = properties => {
    axios.delete(API_URL + "tasks/" + properties.id + "/", { headers: { Authorization: `JWT ${localStorage.getItem('token')}` }})
      .then(() => {
        this.props.resetState();
        this.toggle();
      })
      .catch(error => {
        console.error('Error deleting task:', error);
        this.setState({ error: error.message }); // Set error state with error message
      });
  };

  render() {
    const { error } = this.state;

    // If there is an error, render the Redirect component
    if (error) {
      return <Redirect to='http://localhost:3000/' />;
    }

    return (
      <Fragment>
        <Button color="danger" onClick={() => this.toggle()}>
          Remove
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Do you really want to delete the task?
          </ModalHeader>

          <ModalFooter>
            <Button type="button" onClick={() => this.toggle()}>
              Cancel
            </Button>
            <Button
              type="button"
              color="primary"
              onClick={() => {
                this.deleteTask(this.props);
              }}
            >
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default RemovalModal;
