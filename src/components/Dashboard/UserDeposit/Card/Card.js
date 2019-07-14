import React, { Component, memo } from "react";
import { connect } from "react-redux";
import {
  Modal,
  ModalBody,
  Spinner,
  Button,
  Popover,
  PopoverBody
} from "reactstrap";
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
import {
  Form,
  FormItem,
  HalfColumn,
  ExistingCardForm,
  ExistingCardFormItem,
  FormSubmitButton
} from "../../../styles/CardCharge";
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
  setCreditCardData,
  setCreditCardCVV,
  removeCreditCard
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
    authAmount: "",
    popoverOpen: false
  };

  componentDidMount = () => {
    if (!this.props.creditCard.length) {
      this.props.fetchCreditCardData();
    } else {
      this.setState({ selectedValue: this.props.creditCard[0].auth_code });
    }
    // if (!this.props.creditCard.length && !this.props.isDataFetched) {
    // }
  };

  componentDidUpdate = prevProps => {
    if (this.props !== prevProps) {
      this.props.creditCard.length &&
        this.setState({ selectedValue: this.props.creditCard[0].auth_code });
    }
  };

  toggleSubmitAmountModal = () => {
    this.setState({ submitAmountModal: !this.state.submitAmountModal });
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleRadioChange = value => {
    this.setState({ selectedValue: value, authCVV: "" });
  };

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
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

    const postData = {
      email: "somebody@nice.com",
      amount: authAmount * 100,
      authorization_code: creditCardObject[0].auth_code
    };

    try {
      const response = await fetch(
        "https://api.paystack.co/transaction/charge_authorization",
        {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: `Bearer sk_test_c644c86e3b42191b981bbc1c263f98c7020c9841`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(postData)
        }
      );
      const data = await response.json();
      this.setState({
        loading: false,
        authAmount: "",
        authCVV: ""
      });

      if (data.data.status === "success") {
        toast.success("Transaction was successful");

        const historyObject = {
          ...data.data,
          fees:
            +data.data.amount / 100 < 2500
              ? 0.015 * (+data.data.amount / 100)
              : 100
        };
        const value = +data.data.amount / 100;

        this.props.setDepositHistory(historyObject);
        this.props.setCoinBalance(value);
      } else {
        toast.error(`Transaction was not successful`);
      }
    } catch (err) {
      this.setState({ loading: false });
      toast.error(`Something went wrong`);
    }
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
      amount:
        Number(this.state.amount) >= 2500
          ? (Number(this.state.amount) + 100) * 100
          : Number(this.state.amount) * 100,
      card: {
        number: this.state.card,
        cvv: this.state.cvv,
        expiry_month: cardExpirationData[0],
        expiry_year: year
      }
    };

    this.props.setCreditCardCVV(this.state.cvv);

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
        const historyObject = {
          ...data.data,
          fees:
            +data.data.amount / 100 < 2500
              ? 0.015 * (+data.data.amount / 100)
              : 100
        };
        const value = +data.data.amount / 100;
        this.props.setDepositHistory(historyObject);
        this.props.setCoinBalance(value);
        this.props.setCreditCardData(payload);
      } else if (data.data.status === "open_url") {
        window.open(data.data.url, "_blank");
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
              <div style={{ minHeight: "20rem" }}>
                <Accordion preExpanded={["1"]}>
                  <AccordionItem uuid="1">
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        Pay with existing Card
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <ExistingCardForm onSubmit={this.handleAuthSubmit}>
                        <RadioGroup
                          name="creditCard"
                          selectedValue={this.state.selectedValue}
                          onChange={this.handleRadioChange}
                        >
                          {this.props.creditCard.map((card, index) => (
                            <div
                              className="d-flex align-items-center justify-content-center flex-wrap"
                              key={index}
                            >
                              <Radio value={card.auth_code} />
                              <CreditCard
                                type={card.card_type.split(" ")[0]}
                                number={card.last_digits}
                                month={card.exp_month}
                                year={card.exp_year}
                              />
                              <ExistingCardFormItem>
                                <input
                                  onChange={this.handleInputChange}
                                  className="mt-lg-4 mt-md-3"
                                  name="authCVV"
                                  value={
                                    this.state.selectedValue === card.auth_code
                                      ? this.state.authCVV
                                      : ""
                                  }
                                  disabled={
                                    this.state.selectedValue !== card.auth_code
                                  }
                                  minLength="1"
                                  placeholder="CVV"
                                />
                              </ExistingCardFormItem>
                              <Button
                                id="Popover"
                                type="button"
                                className="mb-lg-2 mb-md-2 mb-sm-3 ml-2"
                              >
                                &#10005;
                              </Button>
                              <Popover
                                placement="bottom"
                                isOpen={this.state.popoverOpen}
                                target="Popover"
                                toggle={this.toggle}
                              >
                                <PopoverBody className="text-center">
                                  This action will remove this Card from your
                                  account. Do you want to continue?
                                  <div className="d-flex justify-content-center">
                                    <Button
                                      className="mr-1"
                                      disabled={this.props.removingCard}
                                      onClick={e =>
                                        this.props.removeCreditCard(
                                          e,
                                          card.auth_code
                                        ) && this.toggle()
                                      }
                                    >
                                      {this.props.removingCard
                                        ? "Removing..."
                                        : "Yes"}
                                    </Button>
                                    {this.props.removingCard ? (
                                      <>{null}</>
                                    ) : (
                                      <Button
                                        className="btn-primary"
                                        disabled={this.props.removingCard}
                                        onClick={this.toggle}
                                      >
                                        No
                                      </Button>
                                    )}
                                  </div>
                                </PopoverBody>
                              </Popover>
                            </div>
                          ))}
                        </RadioGroup>
                        <ExistingCardFormItem className="ml-5">
                          <input
                            onChange={this.handleInputChange}
                            name="authAmount"
                            value={this.state.authAmount}
                            minLength="1"
                            required
                            placeholder="Amount(NGN)"
                          />
                        </ExistingCardFormItem>
                        <FormSubmitButton
                          type="submit"
                          className="mr-2 mt-n4"
                          disabled={this.state.loading}
                        >
                          <span>
                            {this.state.loading ? "Please wait..." : "Load"}
                          </span>
                        </FormSubmitButton>
                      </ExistingCardForm>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid="2">
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
                        <FormSubmitButton
                          type="submit"
                          className="mr-2"
                          disabled={this.state.loading}
                        >
                          <span>
                            {this.state.loading ? "Please wait..." : "Load"}
                          </span>
                        </FormSubmitButton>
                      </Form>
                    </AccordionItemPanel>
                  </AccordionItem>
                </Accordion>
              </div>
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
                <FormSubmitButton
                  type="submit"
                  className="mr-2"
                  disabled={this.state.loading}
                >
                  <span>{this.state.loading ? "Please wait..." : "Load"}</span>
                </FormSubmitButton>
              </Form>
            )}
          </>
        )}
        <div className="text-center" style={{ color: "#000" }}>
          <p>
            **For deposits of &#8358;2,500 and above, there is a &#8358;100
            charge added to the deposit amount**
          </p>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  otpModal: state.modal.submitOTPModal,
  pinModal: state.modal.submitPinModal,
  creditCard: state.creditCard.creditCard,
  loading: state.creditCard.loading,
  isDataFetched: state.creditCard.fetched,
  removingCard: state.creditCard.removing
});

const mapDispatchToProps = {
  setChargeReference,
  fetchCreditCardData,
  setDepositHistory,
  setCreditCardData,
  setCreditCardCVV,
  removeCreditCard,
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
