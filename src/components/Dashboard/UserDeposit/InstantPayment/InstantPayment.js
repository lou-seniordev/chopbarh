import React, { Component } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { connect } from "react-redux";
import { Form, FormItem, FormSubmitButton } from "../../../styles/CardCharge";
import { setDepositHistory } from "../../../../store/actions/depositActions";

import "react-accessible-accordion/dist/fancy-example.css";

const FormWrapper = styled(Form)`
  min-height: 15rem;
`;

class InstantPayment extends Component {
  state = {
    key: "FLWPUBK-c5932c92f9633277760b44c1faf57207-X",
    email: "chopbarh@mail.com",
    amount: ""
  };

  // FLWPUBK-c5932c92f9633277760b44c1faf57207-X

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
      channel: "Transfer",
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
            `https://SimultaneousSarcasticArchitecture.dotunalukosprin.repl.co/ng/api/rave`,
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
      <div>
        <FormWrapper onSubmit={this.handleSubmit}>
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
            <span>{this.state.loading ? "Please wait..." : "Load"}</span>
          </FormSubmitButton>
        </FormWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playerData: state.player.playerData
});

const mapDispatchToProps = {
  setDepositHistory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstantPayment);
