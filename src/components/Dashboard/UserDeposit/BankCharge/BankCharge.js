import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, Spinner } from "reactstrap";
import { Form, FormItem, HalfColumn } from "../../../styles/CardCharge";
import SubmitOTP from "./SubmitOTP/SubmitOTP";
import { setChargeReference } from "../actions/chargeActions";

const Banks = [
  { name: "Access Bank", value: "044" },
  { name: "ALAT by Wema", value: "035A" },
  { name: "Fidelity Bank", value: "070" },
  { name: "First City Monument Bank", value: "214" },
  { name: "Sterling Bank", value: "232" },
  { name: "Union Bank of Nigeria", value: "032" },
  { name: "Unity Bank", value: "215" },
  { name: "Zenith Bank", value: "057" }
];

class BankCharge extends Component {
  state = {
    loading: false,
    formErrorModal: false,
    successModal: false,
    amount: "",
    bank: "",
    account_number: ""
  };

  formErrorModalToggle = () => {
    this.setState({ formErrorModal: !this.state.formErrorModal });
  };

  successModalToggle = () => {
    this.setState({ successModal: !this.state.successModal });
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  formIsValid = ({ amount, bank, account_number }) => {
    if (
      !isNaN(amount) !== true ||
      !isNaN(account_number) !== true ||
      account_number.length < 10
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

    const postData = {
      email: "somebody@mail.com",
      amount: this.state.amount * 100,
      bank: {
        code: this.state.bank,
        account_number: this.state.account_number
      },
      birthday: "1995-03-29"
    };

    console.log(postData);
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
      console.log(data);
      this.setState({ loading: false });
      if (data.data.status === "send_otp") {
        this.props.setChargeReference(data.data.reference);
        this.setState({ successModal: true });
      } else {
        this.setState({ formErrorModal: true });
      }
    } catch (err) {
      this.setState({ loading: false });
    }
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
          isOpen={this.state.successModal}
          toggle={this.successModalToggle}
          style={{
            marginTop: "22rem"
          }}
        >
          <ModalBody className="text-center" style={{ height: "20vh" }}>
            <SubmitOTP />
          </ModalBody>
        </Modal>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            <label>Bank</label>
            <select
              name="bank"
              value={this.state.bank}
              onChange={this.handleInputChange}
              required
              placeholder="johndoe@gmail.com"
            >
              {Banks.map(bank => (
                <option key={bank.name} value={bank.value}>
                  {bank.name}
                </option>
              ))}
            </select>
          </FormItem>
          <HalfColumn>
            <FormItem className="mr-3">
              <label>Account Number</label>
              <input
                type="text"
                value={this.state.account_number}
                onChange={this.handleInputChange}
                name="account_number"
                required
                placeholder="5078982018"
              />
            </FormItem>
            <FormItem>
              <label>Amount</label>
              <input
                type="text"
                value={this.state.amount}
                onChange={this.handleInputChange}
                name="amount"
                required
                placeholder="100"
              />
            </FormItem>
          </HalfColumn>
          <button type="submit" className="mr-2" disabled={this.state.loading}>
            <span>{this.state.loading ? "Processing" : "Load"}</span>
          </button>
        </Form>
      </>
    );
  }
}

const mapDispatchToProps = {
  setChargeReference
};

export default connect(
  null,
  mapDispatchToProps
)(BankCharge);
