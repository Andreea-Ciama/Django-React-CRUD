import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import AddTask from "./AddTask";

class AddTaskModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const { create, task } = this.props;
    var title = create ? "Adding New Task" : "Editing Task";
    var button = create ? (
      <Button
        color="primary"
        className="float-right"
        onClick={this.toggle}
        style={{ minWidth: "200px" }}
      >
        Add New
      </Button>
    ) : (
      <Button onClick={this.toggle}>Edit</Button>
    );

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
          <ModalBody>
            <AddTask
              resetState={this.props.resetState}
              toggle={this.toggle}
              create={create}
              task={task}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default AddTaskModal;
