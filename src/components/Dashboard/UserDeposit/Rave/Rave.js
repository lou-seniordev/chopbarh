import React, { Component } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Spinner, Button, Modal, ModalBody } from "reactstrap";
import { RadioGroup, Radio } from "react-radio-group";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import {
  Form,
  FormItem,
  FormSubmitButton,
  ExistingCardForm,
  ExistingCardFormItem,
  Button as FormElementButton
} from "../../../styles/CardCharge";
import { setDepositHistory } from "../../../../store/actions/depositActions";
import {
  fetchRaveCardData,
  removeRaveCard
} from "../../../../store/actions/raveCardActions";
import CreditCard from "./CreditCard/CreditCard";

import "react-accessible-accordion/dist/fancy-example.css";

class RavePayment extends Component {
  state = {
    key: "FLWPUBK-d1914cca4535e30998a1289ca01a50b1-X",
    email: "chopbarh@mail.com",
    amount: "",
    selectedValue: null,
    removeRaveCardModal: false,
    authAmount: "",
    last4Digits: "",
    paying: false
  };

  // key: "FLWPUBK-d1914cca4535e30998a1289ca01a50b1-X",
  // key: "FLWPUBK_TEST-195cdc10fea3cdfc1be0d60cf6aa0c80-X",

  componentDidMount = () => {
    this.props.fetchRaveCardData();
  };

  getReference = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  componentDidUpdate = prevProps => {
    if (this.props !== prevProps) {
      try {
        this.props.raveCard.length &&
          this.setState({ selectedValue: this.props.raveCard[0].auth_code });
      } catch (err) {}
    }
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleRadioChange = value => {
    this.setState({ selectedValue: value, last4Digits: "" });
  };

  toggleRemoveCard = () => {
    this.setState({
      removeRaveCardModal: !this.state.removeRaveCardModal
    });
  };

  removeRaveCard = () => {
    this.setState({ removeRaveCardModal: false });
    this.props.removeRaveCard(null, this.state.selectedValue);
  };

  formIsValid = ({ amount }) => {
    if (!isNaN(amount) !== true) {
      return false;
    }
    return true;
  };

  handleAuthSubmit = async event => {
    event.preventDefault();

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

    const raveCardObject = this.props.raveCard.filter(
      card => card.auth_code === this.state.selectedValue
    );

    // console.log(raveCardObject);

    // if (raveCardObject[0].last_digits !== this.state.last4Digits) {
    //   // this.setState({ paying: false });
    //   toast.error(`Last 4 digits is not correct`);
    //   return;
    // }

    let reference = this.getReference();

    try {
      this.setState({ paying: true });

      const historyObject = {
        amount: this.state.authAmount,
        channel: "Card",
        transaction_date: new Date().toISOString(),
        fees: "0",
        reference: "--",
        status: "--",
        refId: `${this.props.playerData.PhoneNum}-${reference}`,
        gateway: "Flutterwave",
        made_by: this.props.playerData.PhoneNum
      };

      this.props.setDepositHistory(historyObject);

      const response = await fetch(
        "https://api.ravepay.co/flwv3-pug/getpaidx/api/tokenized/charge",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            SECKEY: "FLWSECK-152efa07e12758633c4da1be7a0067c4-X",
            token: raveCardObject[0].auth_code,
            currency: "NGN",
            amount: this.state.authAmount,
            email: `${this.props.playerData.PhoneNum}@mail.com`,
            txRef: `${this.props.playerData.PhoneNum}-${reference}`
          })
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        this.setState({ paying: false });
        toast.info("Transaction is processing");
      } else {
        this.setState({ paying: false });
        toast.error("Transaction not successful");
      }
    } catch (err) {}

    // Fetch Flutterwave here
  };

  handleSubmit = event => {
    event.preventDefault();

    if (!this.formIsValid(this.state)) {
      this.setState({ loading: false });
      toast.error(`Amount is not valid`);
      return;
    }

    if (+this.state.amount < 100) {
      toast.error(`Minimum deposit is \u20a6${100}`);
      this.setState({ loading: false });
      return;
    }

    let reference = this.getReference();

    const historyObject = {
      amount: this.state.amount,
      channel: "Card",
      transaction_date: new Date().toISOString(),
      fees: "0",
      reference: "--",
      status: "--",
      refId: `${this.props.playerData.PhoneNum}-${reference}`,
      gateway: "Flutterwave",
      made_by: this.props.playerData.PhoneNum
    };

    this.props.setDepositHistory(historyObject);

    window.getpaidSetup({
      PBFPubKey: this.state.key,
      customer_email:
        this.props.playerData.Email ||
        `${this.props.playerData.PhoneNum}@mail.com`,
      customer_firstname:
        this.props.playerData.FullName.split(" ")[0] || "Chopbarh",
      customer_lastname:
        this.props.playerData.FullName.split(" ")[1] ||
        `${this.props.playerData.PhoneNum}`,
      amount: Number(this.state.amount),
      customer_phone: this.props.playerData.PhoneNum,
      country: "NG",
      currency: "NGN",
      txref: `${this.props.playerData.PhoneNum}-${reference}`,
      // redirect_url: "https://www.chopbarh.com/user",
      onclose: function() {},
      callback: async response => {
        let flw_ref = response.tx.txRef;
        console.log("This is the response returned after a charge", response);
        if (
          response.tx.chargeResponseCode == "00" ||
          response.tx.chargeResponseCode == "0"
        ) {
          // window.location = `https://SimultaneousSarcasticArchitecture--dotunalukosprin.repl.co/api/rave?ref=${flw_ref}`;
          const response = await fetch(
            `https://pay.chopbarh.com/ng/api/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                ref: flw_ref
              })
            }
          );
          // redirect to a success page
          // window.open("https://www.chopbarh.com/user");
          // window.open("localhost:3000/user");
        } else {
          // redirect to a failure page.
          // window.open("https://www.chopbarh.com/user");
          // window.open("localhost:3000/user");
        }
      }
    });
  };

  // Add handleAuthSubmit

  // Add hanldInputChange, authAmount

  render() {
    return (
      <>
        <Modal
          isOpen={this.state.removeRaveCardModal}
          toggle={this.toggleRemoveCard}
          style={{
            top: "50%",
            transform: "translateY(-50%)"
          }}
        >
          <ModalBody className="text-center p-4" style={{ minHeight: "12rem" }}>
            <p className="mt-4">
              This action will remove this card from your account. Do you want
              to continue?
            </p>
            <div className="d-flex justify-content-center">
              <FormElementButton className="mr-2" onClick={this.removeRaveCard}>
                <span>Yes</span>
              </FormElementButton>
              <FormElementButton onClick={this.toggleRemoveCard}>
                <span>No</span>
              </FormElementButton>
            </div>
          </ModalBody>
        </Modal>
        {this.props.loading ? (
          <div className="mt-5 text-center" style={{ minHeight: "30vh" }}>
            <Spinner />
          </div>
        ) : (
          <>
            {this.props.raveCard.length > 0 ? (
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
                          name="raveCard"
                          selectedValue={this.state.selectedValue}
                          onChange={this.handleRadioChange}
                        >
                          {this.props.raveCard.map((card, index) => (
                            <div
                              className="d-flex align-items-center justify-content-center flex-wrap"
                              key={index}
                            >
                              <Radio value={card.auth_code} />
                              <CreditCard
                                type={card.card_type}
                                number={card.last_digits}
                                expiry={card.expiry}
                              />
                              {/* <ExistingCardFormItem>
                                <input
                                  onChange={this.handleInputChange}
                                  className="mt-lg-4 mt-md-3"
                                  name="last4Digits"
                                  value={
                                    this.state.selectedValue === card.auth_code
                                      ? this.state.last4Digits
                                      : ""
                                  }
                                  disabled={
                                    this.state.selectedValue !== card.auth_code
                                  }
                                  minLength="1"
                                  placeholder="Last 4 Card Digits"
                                />
                              </ExistingCardFormItem> */}
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
                          disabled={this.state.paying}
                        >
                          <span>
                            {this.state.paying ? "Please wait..." : "Load"}
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
              <div>
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
              </div>
            )}
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  playerData: state.player.playerData,
  raveCard: state.raveCard.raveCard,
  loading: state.raveCard.loading
});

const mapDispatchToProps = {
  setDepositHistory,
  fetchRaveCardData,
  removeRaveCard
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RavePayment);
