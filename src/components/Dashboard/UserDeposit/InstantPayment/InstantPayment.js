import React, { Component } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Form, FormItem, FormSubmitButton } from "../../../styles/CardCharge";
import { setDepositHistory } from "../../../../store/actions/depositActions";

import "react-accessible-accordion/dist/fancy-example.css";

class InstantPayment extends Component {
  state = {
    key: "FLWPUBK-d1914cca4535e30998a1289ca01a50b1-X",
    email: "chopbarh@mail.com",
    amount: ""
  };

  // key: "FLWPUBK-d1914cca4535e30998a1289ca01a50b1-X",
  // key: "FLWPUBK_TEST-195cdc10fea3cdfc1be0d60cf6aa0c80-X",

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
      channel: "NIP",
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

  render() {
    return (
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
            <span>{this.state.loading ? "Please wait..." : "Load"}</span>
          </FormSubmitButton>
        </Form>
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
