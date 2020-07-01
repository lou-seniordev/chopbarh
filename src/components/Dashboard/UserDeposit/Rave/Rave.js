import React, { Component } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Spinner, Button, Modal, ModalBody } from "reactstrap";
import { RadioGroup, Radio } from "react-radio-group";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import {
  FormItem,
  FormSubmitButton,
  ExistingCardForm,
  ExistingCardFormItem,
  Button as FormElementButton,
} from "../../../styles/CardCharge";
import {
  fetchRaveCardData,
  removeRaveCard,
} from "../../../../store/actions/raveCardActions";
import CreditCard from "./CreditCard/CreditCard";
import firebase from "../../../../firebase";
import "react-accessible-accordion/dist/fancy-example.css";

const Form = styled.form`
  position: relative;
  min-height: 20rem;
`;

class RavePayment extends Component {
  state = {
    key: "FLWPUBK-48046ea864f738ab3e4506a5f741f99b-X",
    email: "chopbarh@mail.com",
    amount: "",
    selectedValue: null,
    removeRaveCardModal: false,
    authAmount: "",
    last4Digits: "",
    paying: false,
  };

  componentDidMount = async () => {
    this.props.fetchRaveCardData();
  };

  getReference = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 25; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
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
      removeRaveCardModal: !this.state.removeRaveCardModal,
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

    if (+this.state.authAmount > 250000) {
      // toast.error(`Minimum deposit is \u20a6${100}`);
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

    this.setState({ paying: true });

    try {
      const idToken = await firebase.auth().currentUser.getIdToken();

      const response = await fetch(
        "https://us-central1-dev-sample-31348.cloudfunctions.net/ravecardcharge/player/deposit/card",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            amount: +this.state.authAmount,
            phone_number: this.props.playerData.PhoneNum,
            token: raveCardObject[0].auth_code,
            reference: `${this.props.playerData.PhoneNum}-${reference}`,
            email: raveCardObject[0].email,
            playerId: this.props.playerData.PlayerID,
          }),
        }
      );

      const data = await response.json();

      if (data.status === true) {
        this.setState({ paying: false });
        toast.info("Transaction is processing");
      } else {
        this.setState({ paying: false });
        toast.error("Transaction not successful");
      }
    } catch (err) {}

    // Fetch Flutterwave here
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true });

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

    if (+this.state.amount > 500000) {
      this.setState({ loading: false });
      return;
    }

    let reference = this.getReference();

    try {
      const idToken = await firebase.auth().currentUser.getIdToken();

      const raveModalRecordResponse = await (
        await fetch(
          "https://us-central1-dev-sample-31348.cloudfunctions.net/ravemodal/player/deposit/record",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({
              amount: +this.state.amount,
              transaction_reference: `${this.props.playerData.PhoneNum}-${reference}`,
              transaction_fees: 0,
              refId: `${this.props.playerData.PhoneNum}-${reference}`,
              phone_number: `${this.props.playerData.PhoneNum}`,
              playerId: `${this.props.playerData.PlayerID}`,
            }),
          }
        )
      ).json();

      this.setState({ loading: false });

      if (raveModalRecordResponse.status === true) {
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
          onclose: function () {},
          callback: async response => {
            let flw_ref = response.tx.txRef;
            if (
              response.tx.chargeResponseCode === "00" ||
              response.tx.chargeResponseCode === "0"
            ) {
              await fetch(`https://pay.chopbarh.com/ng/api/verify`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ref: flw_ref,
                }),
              });
            }
          },
        });
      } else {
        toast.error("An error occured. Please try again later");
      }
    } catch (error) {
      toast.error("An error occured while processing the request");
    }
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.state.removeRaveCardModal}
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
                      <Form
                        onSubmit={this.handleSubmit}
                        style={{ minHeight: "15rem !important" }}
                      >
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
  loading: state.raveCard.loading,
});

const mapDispatchToProps = {
  fetchRaveCardData,
  removeRaveCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(RavePayment);
