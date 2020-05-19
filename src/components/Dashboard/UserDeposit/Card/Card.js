import React, { Component, memo } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, Spinner, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { RadioGroup, Radio } from "react-radio-group";
import {
  Form,
  FormItem,
  HalfColumn,
  ExistingCardForm,
  ExistingCardFormItem,
  FormSubmitButton,
  Button as FormElementButton,
} from "../../../styles/CardCharge";
import SubmitOTP from "./SubmitOTP/SubmitOTP";
import SubmitPin from "./SubmitPin/SubmitPin";
import SubmitPhone from "./SubmitPhone/SubmitPhone";
import { setChargeReference } from "../../../../store/actions/chargeActions";
import { setDepositHistory } from "../../../../store/actions/depositActions";
import {
  openOTPModal,
  closeOTPModal,
  openPinModal,
  closePinModal,
  openCardPinModal,
  closeCardPinModal,
  openCardOTPModal,
  closeCardOTPModal,
  openCardPhoneModal,
  closeCardPhoneModal,
  openCardBirthdayModal,
  closeCardBirthdayModal,
} from "../../../../store/actions/modalActions";
import {
  fetchCreditCardData,
  setCreditCardData,
  setCreditCardCVV,
  removeCreditCard,
} from "../../../../store/actions/creditCardActions";
// import SubmitAmount from "./SubmitAmount/SubmitAmount";

import "react-accessible-accordion/dist/fancy-example.css";
import CreditCard from "./CreditCard/CreditCard";

// Test sk_test_c644c86e3b42191b981bbc1c263f98c7020c9841
// sk_live_f46f17bcba5eefbb48baabe5f54d10e67c90e83a

function referenceId() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < 25; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

class Card extends Component {
  state = {
    loading: false,
    submitOTPModal: false,
    submitPinModal: false,
    submitAmountModal: false,
    submitPhoneModal: true,
    selectedValue: null,
    amount: "",
    card: "",
    expiry: "",
    cvv: "",
    auth_code: "",
    authCVV: "",
    authAmount: "",
    popoverOpen: false,
    modalOpen: false,
    paying: false,
    removeCardModal: false,
  };

  componentDidMount = () => {
    this.props.fetchCreditCardData();
    // if (!this.props.creditCard.length) {
    // } else {
    //   this.setState({ selectedValue: this.props.creditCard[0].auth_code });
    // }
  };

  componentDidUpdate = prevProps => {
    if (this.props !== prevProps) {
      try {
        this.props.creditCard.length &&
          this.setState({ selectedValue: this.props.creditCard[0].auth_code });
      } catch (err) {}
    }
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleRadioChange = value => {
    this.setState({ selectedValue: value, authCVV: "" });
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen, loading: false });
  };

  toggleRemoveCard = () => {
    this.setState({
      removeCardModal: !this.state.removeCardModal,
    });
  };

  toggleSubmitPhoneModal = () => {
    this.setState({ submitPhoneModal: !this.state.submitPhoneModal });
  };

  removeCreditCard = () => {
    this.setState({ removeCardModal: false });
    this.props.removeCreditCard(null, this.state.selectedValue);
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

    const { authAmount, selectedValue } = this.state;

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

    if (+this.state.authAmount < 100) {
      toast.error(`Minimum deposit is \u20a6${100}`);
      this.setState({ loading: false });
      return;
    }

    if (+this.state.authAmount > 250000) {
      // toast.error(`Minimum deposit is \u20a6${100}`);
      this.setState({ loading: false });
      return;
    }

    this.setState({ modalOpen: true });
  };

  payAuthMoney = async () => {
    this.setState({ paying: true, loading: false });

    const creditCardObject = this.props.creditCard.filter(
      card => card.auth_code === this.state.selectedValue
    );

    if (creditCardObject[0].cvv !== this.state.authCVV) {
      this.setState({ paying: false });
      toast.error(`CVV is not correct`);
      return;
    }

    let refId = `${this.props.playerData.PhoneNum}-${referenceId()}`;
    let reference = `${this.props.playerData.PhoneNum}-${referenceId()}`;

    const postData = {
      email: `${this.props.playerData.PhoneNum}@mail.com`,
      amount:
        Number(this.state.authAmount) >= 2500
          ? (Number(this.state.authAmount) + 100) * 100
          : Number(this.state.authAmount) * 100,
      authorization_code: creditCardObject[0].auth_code,
      reference,
      metadata: {
        phone: this.props.playerData.PhoneNum,
        refId,
      },
    };

    try {
      const paystackAuthChargeResponse = await fetch(
        "http://us-central1-dev-sample-31348.cloudfunctions.net/paystackauthdeposit/player/deposit/charge_authorization",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-api-key": process.env.REACT_APP_FUNCTIONS_API_KEY,
          },
          body: JSON.stringify({
            amount: Number(this.state.authAmount),
            email: `${this.props.playerData.PhoneNum}@mail.com`,
            phone_number: this.props.playerData.PhoneNum,
            playerId: this.props.playerData.PlayerID,
            authorization_code: creditCardObject[0].auth_code,
            transaction_reference: reference,
            refId,
          }),
        }
      );
      const data = await paystackAuthChargeResponse.json();

      this.setState({
        loading: false,
        authAmount: "",
        authCVV: "",
        modalOpen: false,
        paying: false,
      });

      if (data.status === true) {
        toast.info("Transaction is processing");
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

    if (+this.state.amount < 100) {
      toast.error(`Minimum deposit is \u20a6${100}`);
      this.setState({ loading: false });
      return;
    }

    if (+this.state.amount > 250000) {
      // toast.error(`Minimum deposit is \u20a6${100}`);
      this.setState({ loading: false });
      return;
    }

    this.setState({ modalOpen: true });
  };

  payMoney = async () => {
    this.setState({ paying: true, loading: false });

    let refId = `${this.props.playerData.PhoneNum}-${referenceId()}`;
    let reference = `${this.props.playerData.PhoneNum}-${referenceId()}`;

    const historyObject = {
      amount: this.state.amount,
      channel: "Card",
      transaction_date: new Date().toISOString(),
      fees: this.state.amount < 2500 ? 0 : 100,
      reference,
      status: "--",
      refId,
      gateway: "Paystack",
      made_by: this.props.playerData.PhoneNum,
    };

    // this.props.setDepositHistory(historyObject);

    const cardExpirationData = this.state.expiry.split("/");
    const year = `20${cardExpirationData[1]}`;

    const postData = {
      email: `${this.props.playerData.PhoneNum}@mail.com`,
      amount:
        Number(this.state.amount) >= 2500
          ? (Number(this.state.amount) + 100) * 100
          : Number(this.state.amount) * 100,
      card: {
        number: this.state.card,
        cvv: this.state.cvv,
        expiry_month: cardExpirationData[0],
        expiry_year: year,
      },
      reference,
      metadata: {
        phone: this.props.playerData.PhoneNum,
        refId,
        cvv: this.state.cvv,
      },
    };

    this.props.setCreditCardCVV(this.state.cvv);

    try {
      const paystackCardChargeResponse = await fetch(
        "http://localhost:5000/dev-sample-31348/us-central1/paystackcarddeposit/player/deposit/card_charge",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-api-key": process.env.REACT_APP_FUNCTIONS_API_KEY,
          },
          body: JSON.stringify({
            email: `${this.props.playerData.PhoneNum}@mail.com`,
            amount: Number(this.state.amount),
            phone_number: this.props.playerData.PhoneNum,
            playerId: this.props.playerData.PlayerID,
            expiry_month: cardExpirationData[0],
            expiry_year: year,
            card_number: this.state.card,
            cvv: this.state.cvv,
            transaction_reference: reference,
            refId,
          }),
        }
      );
      const data = await paystackCardChargeResponse.json();

      this.setState({
        loading: false,
        amount: "",
        card: "",
        expiry: "",
        cvv: "",
        modalOpen: false,
        paying: false,
      });

      if (data.status === true) {
        if (data.data.status === "send_otp") {
          this.props.setChargeReference(data.data.reference);
          this.props.openCardOTPModal();
        } else if (data.data.status === "send_pin") {
          this.props.setChargeReference(data.data.reference);
          this.props.openCardPinModal();
        } else if (data.data.status === "success") {
          toast.info("Transaction is processing");
        } else if (data.data.status === "pending") {
          toast.info("Transaction is processing");
        } else if (data.data.status === "open_url") {
          this.props.setChargeReference(data.data.reference);
          window.open(data.data.url, "_self");
        } else {
          toast.error(`Please try again`);
        }
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
          isOpen={this.state.removeCardModal}
          toggle={this.toggleRemoveCard}
          style={{
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ModalBody className="text-center p-4" style={{ minHeight: "12rem" }}>
            <p className="mt-4">
              This action will remove this card from your account. Do you want
              to continue?
            </p>
            <div className="d-flex justify-content-center">
              <FormElementButton
                className="mr-2"
                onClick={this.removeCreditCard}
              >
                <span>Yes</span>
              </FormElementButton>
              <FormElementButton onClick={this.toggleRemoveCard}>
                <span>No</span>
              </FormElementButton>
            </div>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.props.cardPinModal}
          toggle={this.props.closeCardPinModal}
          style={{
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ModalBody className="text-center" style={{ minHeight: "5rem" }}>
            <SubmitPin />
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.props.cardOTPModal}
          toggle={this.props.closeCardOTPModal}
          style={{
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ModalBody className="text-center" style={{ minHeight: "5rem" }}>
            <SubmitOTP />
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.props.cardPhoneModal}
          toggle={this.props.closeCardPhoneModal}
          style={{
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ModalBody className="text-center" style={{ minHeight: "5rem" }}>
            <SubmitPhone />
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.modalOpen}
          toggle={this.toggleModal}
          style={{
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ModalBody
            className="text-center mt-5 mb-5"
            style={{ minHeight: "5rem" }}
          >
            {this.state.amount ? (
              <>
                <p>
                  <strong>
                    Amount: &#8358;
                    {new Intl.NumberFormat().format(+this.state.amount)}
                  </strong>
                </p>
                <p>
                  <strong>
                    Transaction Fee:{" "}
                    {+this.state.amount < 2500 ? `\u20a6${0}` : `\u20a6${100}`}
                  </strong>
                </p>
                <p>
                  <strong>
                    Total:{" "}
                    {+this.state.amount < 2500
                      ? `\u20a6${new Intl.NumberFormat().format(
                          +this.state.amount
                        )}`
                      : `\u20a6${new Intl.NumberFormat().format(
                          +this.state.amount + 100
                        )}`}
                  </strong>
                </p>
                <p>Proceed with deposit?</p>
                <div className="d-flex justify-content-center">
                  <FormElementButton
                    className="mr-1"
                    disabled={this.state.paying}
                    onClick={this.payMoney}
                  >
                    <span>{this.state.paying ? "Processing..." : "Yes"}</span>
                  </FormElementButton>
                  {!this.state.paying ? (
                    <FormElementButton
                      onClick={this.toggleModal}
                      className="ml-1"
                    >
                      <span>No</span>
                    </FormElementButton>
                  ) : (
                    <>{null}</>
                  )}
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>
                    Amount: &#8358;
                    {new Intl.NumberFormat().format(+this.state.authAmount)}
                  </strong>
                </p>
                <p>
                  <strong>
                    Transaction Fee:{" "}
                    {+this.state.authAmount < 2500
                      ? `\u20a6${0}`
                      : `\u20a6${100}`}
                  </strong>
                </p>
                <p>
                  <strong>
                    Total:{" "}
                    {+this.state.authAmount < 2500
                      ? `\u20a6${new Intl.NumberFormat().format(
                          +this.state.authAmount
                        )}`
                      : `\u20a6${new Intl.NumberFormat().format(
                          +this.state.authAmount + 100
                        )}`}
                  </strong>
                </p>
                <p>Proceed with deposit?</p>
                <div className="d-flex justify-content-center">
                  <FormElementButton
                    className="mr-1"
                    disabled={this.state.paying}
                    onClick={this.payAuthMoney}
                  >
                    <span>{this.state.paying ? "Processing..." : "Yes"}</span>
                  </FormElementButton>
                  {!this.state.paying ? (
                    <FormElementButton
                      onClick={this.toggleModal}
                      className="ml-1"
                    >
                      <span>No</span>
                    </FormElementButton>
                  ) : (
                    <>{null}</>
                  )}
                </div>
              </>
            )}
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
                                className="mb-lg-2 mb-md-2 mb-sm-5 ml-2"
                                onClick={this.toggleRemoveCard}
                                disabled={
                                  card.auth_code !== this.state.selectedValue
                                }
                              >
                                &#10005;
                              </Button>
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
        <div className="text-center mt-4" style={{ color: "#000" }}>
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
  cardPinModal: state.modal.cardPinModal,
  cardOTPModal: state.modal.cardOTPModal,
  cardPhoneModal: state.modal.cardPhoneModal,
  cardBirthdayModal: state.modal.cardBirthdayModal,
  creditCard: state.creditCard.creditCard,
  loading: state.creditCard.loading,
  isDataFetched: state.creditCard.fetched,
  removingCard: state.creditCard.removing,
  playerData: state.player.playerData,
});

const mapDispatchToProps = {
  setChargeReference,
  fetchCreditCardData,
  setDepositHistory,
  setCreditCardData,
  setCreditCardCVV,
  removeCreditCard,
  openOTPModal,
  closeOTPModal,
  openPinModal,
  closePinModal,

  openCardPinModal,
  closeCardPinModal,
  openCardOTPModal,
  closeCardOTPModal,
  openCardPhoneModal,
  closeCardPhoneModal,
  openCardBirthdayModal,
  closeCardBirthdayModal,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(memo(Card))
);
