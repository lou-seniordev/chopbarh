import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";

/*

This component renders whenever something goes wrong in production. Consider 
using a component that renders a more appealing message 

*/
export default class ErrorBoundary extends Component {
  state = {
    error: null,
    errorModal: false
  };

  componentDidCatch = error => {
    console.log(error);
    this.setState({ error, errorModal: true });
  };

  toggleErrorModal = () => {};

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <Modal
          isOpen={this.state.errorModal}
          toggle={this.toggleErrorModal}
          className="pt-5 mt-5"
        >
          <ModalBody>
            <h2 style={{ textAlign: "center" }}>
              Something went wrong. We're working on it
            </h2>
          </ModalBody>
        </Modal>
      );
    }

    return <div>{this.props.children}</div>;
  }
}
