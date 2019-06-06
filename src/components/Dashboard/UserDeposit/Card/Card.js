import React, { Component, memo } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody } from "reactstrap";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";
import { Form, FormItem, HalfColumn } from "../../../styles/CardCharge";
import SubmitOTP from "./SubmitOTP/SubmitOTP";
import SubmitPin from "./SubmitPin/SubmitPin";
import { setChargeReference } from "../../../../store/actions/chargeActions";
import { setCoinBalance } from "../../../../store/actions/coinBalanceActions";
import { setDepositHistory } from "../../../../store/actions/depositActions";
import {
  openOTPModal,
  closeOTPModal,
  openPinModal,
  closePinModal
} from "../../../../store/actions/modalActions";
import {
  fetchCreditCardData,
  setCreditCardData
} from "../../../../store/actions/creditCardActions";
import SubmitAmount from "./SubmitAmount/SubmitAmount";

class Card extends Component {
  state = {
    loading: false,
    submitOTPModal: false,
    submitPinModal: false,
    submitAmountModal: false,
    amount: "",
    card: "",
    expiry: "",
    cvv: "",
    auth_code: ""
  };

  componentDidMount = () => {
    if (!this.props.creditCard) {
      this.props.fetchCreditCardData();
    }
  };

  toggleSubmitAmountModal = () => {
    this.setState({ submitAmountModal: !this.state.submitAmountModal });
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
      this.setState({ loading: false });
      toast.error(`Form is not valid`);
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
      } else if (data.data.status === "success") {
        toast.success("Transaction was successful");
        const value = +data.data.amount / 100;
        // this.props.setCreditCardData(data.data.authorization);
        this.props.setDepositHistory(data.data);
        // this.props.setCoinBalance(value);
      } else {
        toast.error(`Please try again`);
      }
    } catch (err) {
      this.setState({ loading: false });
      toast.error(`Something went wrong`);
    }
  };

  render() {
    return (
      <>
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
          isOpen={this.state.submitAmountModal}
          toggle={this.toggleSubmitAmountModal}
          style={{
            marginTop: "22rem"
          }}
        >
          <ModalBody className="text-center" style={{ height: "20vh" }}>
            <SubmitAmount auth_code={this.state.auth_code} />
          </ModalBody>
        </Modal>
        {this.props.creditCard ? (
          <>
            <h4>Pay with Card</h4>
            <p>Click on a card to pay with it</p>
            <div style={{ display: "flex" }} className="mb-4">
              {this.props.creditCard.map((card, index) => (
                <div
                  key={index}
                  style={{
                    background: "#ccc",
                    padding: "5px 12px",
                    borderRadius: "5px",
                    margin: "5px",
                    cursor: "pointer"
                  }}
                  onClick={() =>
                    this.setState({
                      submitAmountModal: true,
                      auth_code: card.auth_code
                    })
                  }
                >
                  <p>{card.card_type.split(" ")[0]}</p>
                  <p>{`**** **** **** ${card.last_digits}`}</p>
                  <p>{`${card.exp_month}/${card.exp_year}`}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>{null}</>
        )}
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            <label>Amount</label>
            <input
              onChange={this.handleInputChange}
              name="amount"
              value={this.state.amount}
              required
              minLength="1"
              placeholder="Amount(NGN)"
            />

            {/* <NumberFormat
              thousandSeparator
              onChange={this.handleInputChange}
              name="amount"
              value={this.state.amount}
              required
              min={1}
              minLength="1"
              placeholder="Amount(NGN)"
            /> */}
          </FormItem>
          <FormItem>
            <label>Card Number</label>
            <input
              onChange={this.handleInputChange}
              name="card"
              value={this.state.card}
              minLength="16"
              required
              placeholder="Enter Card Number"
            />
            {/* <NumberFormat
              format="#### #### #### #### ####"
              onChange={this.handleInputChange}
              name="card"
              value={this.state.card}
              minLength="16"
              required
              placeholder="Enter Card Number"
            /> */}
          </FormItem>
          <HalfColumn>
            <FormItem className="mr-3">
              <label>Expiry</label>

              <NumberFormat
                format="##/##"
                name="expiry"
                onChange={this.handleInputChange}
                value={this.state.expiry}
                required
                placeholder="MM/YY"
                mask={["M", "M", "Y", "Y"]}
              />
            </FormItem>
            <FormItem>
              <label>CVV</label>
              <NumberFormat
                format="###"
                onChange={this.handleInputChange}
                name="cvv"
                value={this.state.cvv}
                required
                placeholder="3 Digits behind Card"
              />
            </FormItem>
          </HalfColumn>
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
  pinModal: state.modal.submitPinModal,
  creditCard: state.creditCard.creditCard
});

const mapDispatchToProps = {
  setChargeReference,
  fetchCreditCardData,
  setDepositHistory,
  setCreditCardData,
  setCoinBalance,
  openOTPModal,
  closeOTPModal,
  openPinModal,
  closePinModal
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(memo(Card))
);
