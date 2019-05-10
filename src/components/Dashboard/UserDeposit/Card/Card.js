import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody } from "reactstrap";
import { withRouter } from "react-router-dom";
import { Form, FormItem, HalfColumn } from "../../../styles/CardCharge";
import SubmitOTP from "../BankCharge/SubmitOTP/SubmitOTP";
import SubmitPin from "../BankCharge/SubmitPin/SubmitPin";
import { setChargeReference } from "../actions/chargeActions";
import {
  openOTPModal,
  closeOTPModal,
  openPinModal,
  closePinModal
} from "../actions/modalActions";

class Card extends Component {
  state = {
    loading: false,
    formErrorModal: false,
    submitOTPModal: false,
    submitPinModal: false,
    amount: "",
    card: "",
    expiry: "",
    cvv: ""
  };

  formErrorModalToggle = () => {
    this.setState({ formErrorModal: !this.state.formErrorModal });
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  formIsValid = ({ amount, card, expiry, cvv }) => {
    if (
      !isNaN(amount) !== true ||
      !isNaN(card) !== true ||
      expiry.length !== 5 ||
      expiry.split("/").length !== 2 ||
      expiry.split("/")[1].length !== 2 ||
      card.length < 16 ||
      cvv.length !== 3
    ) {
      return false;
    }
    return true;
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (!this.formIsValid(this.state)) {
      this.setState({ formErrorModal: true });
      this.setState({ loading: false });
      return;
    }

    const cardExpirationData = this.state.expiry.split("/");
    const year = `20${cardExpirationData[1]}`;

    const postData = {
      email: "somebody@nice.com",
      amount: this.state.amount * 100,
      card: {
        number: this.state.card,
        cvv: this.state.cvv,
        expiry_month: cardExpirationData[0],
        expiry_year: year
      }
    };

    try {
      const response = await fetch("https://api.paystack.co/charge", {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `Bearer sk_test_c644c86e3b42191b981bbc1c263f98c7020c9841`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });
      const data = await response.json();
      this.setState({
        loading: false,
        amount: "",
        card: "",
        expiry: "",
        cvv: ""
      });
      if (data.data.status === "send_otp") {
        this.props.setChargeReference(data.data.reference);
        this.props.openOTPModal();
      } else if (data.data.status === "send_pin") {
        this.props.setChargeReference(data.data.reference);
        this.props.openPinModal();
      } else {
        this.setState({ formErrorModal: true });
      }
      console.log(data);
    } catch (err) {
      this.setState({ loading: false });
    }
    // setReferenceValue(data.data.reference);
    // increaseCoinBalance(+data.data.amount / 100)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     setLoading(false);
    //   });
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.state.formErrorModal}
          toggle={this.formErrorModalToggle}
          style={{
            marginTop: "22rem"
          }}
        >
          <ModalBody className="text-center" style={{ height: "20vh" }}>
            <h2>Ooops!</h2>
            <p>Something went wrong. Please try again</p>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.props.pinModal}
          toggle={this.props.closePinModal}
          style={{
            marginTop: "22rem"
          }}
        >
          <ModalBody className="text-center" style={{ height: "20vh" }}>
            <SubmitPin />
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.props.otpModal}
          toggle={this.props.closeOTPModal}
          style={{
            marginTop: "22rem"
          }}
        >
          <ModalBody className="text-center" style={{ height: "20vh" }}>
            <SubmitOTP />
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.formErrorModal}
          toggle={this.formErrorModalToggle}
          style={{
            marginTop: "22rem"
          }}
        >
          <ModalBody className="text-center" style={{ height: "20vh" }}>
            <h2>Ooops!</h2>
            <p>Something went wrong. Please try again</p>
          </ModalBody>
        </Modal>
        {/* <button
          onClick={() => {
            this.props.history.push({
              pathname: "/deposit/charge",
              search: "?status=false"
            });
          }}
          className="mr-2"
        >
          <span>Press the Button</span>
        </button> */}
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            <label>Amount</label>
            <input
              type="text"
              onChange={this.handleInputChange}
              name="amount"
              value={this.state.amount}
              required
              placeholder="Amount"
            />
          </FormItem>
          <FormItem>
            <label>Card Number</label>
            <input
              type="text"
              onChange={this.handleInputChange}
              name="card"
              value={this.state.card}
              minLength="16"
              required
              placeholder="Account Number"
            />
          </FormItem>
          <HalfColumn>
            <FormItem className="mr-3">
              <label>Expiry</label>
              <input
                type="text"
                onChange={this.handleInputChange}
                name="expiry"
                value={this.state.expiry}
                required
                placeholder="MM/YY"
              />
            </FormItem>
            <FormItem>
              <label>CVV</label>
              <input
                type="text"
                onChange={this.handleInputChange}
                name="cvv"
                value={this.state.cvv}
                required
                placeholder="***"
              />
            </FormItem>
          </HalfColumn>
          {/* 
          <HalfColumn>
  
            <FormItem>
              <label>Pin</label>
              <input
                type="password"
                onChange={this.handleInputChange}
                name="pin"
                value={this.state.pin}
                required
                placeholder="****"
                minLength="4"
                maxLength="4"
              />
            </FormItem>
          </HalfColumn>
            */}
          <button type="submit" className="mr-2" disabled={this.state.loading}>
            <span>{this.state.loading ? "Please wait..." : "Load"}</span>
          </button>
        </Form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  otpModal: state.modal.submitOTPModal,
  pinModal: state.modal.submitPinModal
});

const mapDispatchToProps = {
  setChargeReference,
  openOTPModal,
  closeOTPModal,
  openPinModal,
  closePinModal
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Card)
);
