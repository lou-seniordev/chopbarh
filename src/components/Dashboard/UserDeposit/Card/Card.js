import React, { Component, memo } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, Spinner } from "reactstrap";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import { RadioGroup, Radio } from "react-radio-group";
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

import "react-accessible-accordion/dist/fancy-example.css";
import CreditCard from "./CreditCard/CreditCard";

class Card extends Component {
  state = {
    loading: false,
    submitOTPModal: false,
    submitPinModal: false,
    submitAmountModal: false,
    selectedValue: null,
    amount: "",
    card: "",
    expiry: "",
    cvv: "",
    auth_code: "",
    authCVV: "",
    authAmount: ""
  };

  componentDidMount = () => {
    if (!this.props.creditCard.length) {
      this.props.fetchCreditCardData();
    }
  };

  toggleSubmitAmountModal = () => {
    this.setState({ submitAmountModal: !this.state.submitAmountModal });
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleRadioChange = value => {
    this.setState({ selectedValue: value });
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

  handleAuthSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });

    const { authAmount, authCVV, selectedValue } = this.state;

    if (selectedValue === null) {
      this.setState({ loading: false });
      toast.error(`No Card was selected`);
      return;
    }

    if (!isNaN(authAmount) !== true) {
      this.setState({ loading: false });
      toast.error(`Amount is not valid`);
      return;
    }

    const creditCardObject = this.props.creditCard.filter(
      card => card.auth_code === selectedValue
    );

    if (creditCardObject[0].cvv !== authCVV) {
      this.setState({ loading: false });
      toast.error(`CVV is not correct`);
      return;
    }

    console.log("Can submit...");
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
        const payload = {
          ...data.data.authorization,
          cvv: postData.card.cvv
        };
        const value = +data.data.amount / 100;
        // TODO: Fix this down the line
        this.props.setCreditCardData(payload);
        // this.props.setDepositHistory(data.data);
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
            <SubmitAmount
              auth_code={this.state.auth_code}
              close={this.toggleSubmitAmountModal}
            />
          </ModalBody>
        </Modal>
        {this.props.loading ? (
          <div className="mt-5 text-center" style={{ minHeight: "30vh" }}>
            <Spinner />
          </div>
        ) : (
          <>
            {this.props.creditCard.length > 0 ? (
              <>
                <Accordion>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        Pay with existing Card
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <Form
                        style={{ minHeight: "5rem" }}
                        onSubmit={this.handleAuthSubmit}
                      >
                        <RadioGroup
                          name="creditCard"
                          selectedValue={this.state.selectedValue}
                          onChange={this.handleRadioChange}
                        >
                          {this.props.creditCard.map((card, index) => (
                            <div
                              className="d-flex align-items-center"
                              key={index}
                            >
                              <Radio value={card.auth_code} />
                              <CreditCard
                                type={card.card_type.split(" ")[0]}
                                number={card.last_digits}
                                month={card.exp_month}
                                year={card.exp_year}
                              />
                              <FormItem className="mt-4">
                                <input
                                  onChange={this.handleInputChange}
                                  name="authCVV"
                                  value={this.state.authCVV}
                                  minLength="1"
                                  placeholder="CVV"
                                />
                              </FormItem>
                            </div>
                          ))}
                        </RadioGroup>
                        <FormItem className="ml-5">
                          <label>Amount</label>
                          <input
                            onChange={this.handleInputChange}
                            name="authAmount"
                            value={this.state.authAmount}
                            minLength="1"
                            required
                            placeholder="Amount(NGN)"
                          />
                        </FormItem>
                        <button
                          type="submit"
                          className="mr-2 mt-n4"
                          disabled={this.state.loading}
                        >
                          <span>
                            {this.state.loading ? "Please wait..." : "Load"}
                          </span>
                        </button>
                      </Form>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        Pay with new Card
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
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
                        <button
                          type="submit"
                          className="mr-2"
                          disabled={this.state.loading}
                        >
                          <span>
                            {this.state.loading ? "Please wait..." : "Load"}
                          </span>
                        </button>
                      </Form>
                    </AccordionItemPanel>
                  </AccordionItem>
                </Accordion>
              </>
            ) : (
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
                <button
                  type="submit"
                  className="mr-2"
                  disabled={this.state.loading}
                >
                  <span>{this.state.loading ? "Please wait..." : "Load"}</span>
                </button>
              </Form>
            )}
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  otpModal: state.modal.submitOTPModal,
  pinModal: state.modal.submitPinModal,
  creditCard: state.creditCard.creditCard,
  loading: state.creditCard.loading
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
