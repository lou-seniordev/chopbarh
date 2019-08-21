import React, { Component } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Spinner, Button } from "reactstrap";
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
  ExistingCardFormItem
} from "../../../styles/CardCharge";
import { setDepositHistory } from "../../../../store/actions/depositActions";
import { fetchRaveCardData } from "../../../../store/actions/raveCardActions";
import CreditCard from "./CreditCard/CreditCard";

import "react-accessible-accordion/dist/fancy-example.css";

class RavePayment extends Component {
  state = {
    key: "FLWPUBK_TEST-195cdc10fea3cdfc1be0d60cf6aa0c80-X",
    email: "chopbarh@mail.com",
    amount: ""
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

  formIsValid = ({ amount }) => {
    if (!isNaN(amount) !== true) {
      return false;
    }
    return true;
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
      fees: "None",
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
            `https://SimultaneousSarcasticArchitecture--dotunalukosprin.repl.co/api/rave`,
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

  render() {
    return (
      <>
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
                          name="creditCard"
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
  fetchRaveCardData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RavePayment);
