import React, { Component } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Form, FormItem, FormSubmitButton } from "../../../styles/CardCharge";
import { setDepositHistory } from "../../../../store/actions/depositActions";

class RavePayment extends Component {
  state = {
    key: "FLWPUBK-e87a9fb00e960628ab7fe30288405116-X",
    email: "chopbarh@mail.com",
    amount: ""
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

    let reference = this.getReference();

    const historyObject = {
      amount: this.state.amount,
      channel: "Card",
      transaction_date: new Date().toISOString(),
      fees: "--",
      reference: `${this.props.playerData.PhoneNum}-${reference}`,
      status: "--"
    };

    this.props.setDepositHistory(historyObject);

    window.getpaidSetup({
      PBFPubKey: this.state.key,
      customer_email: this.props.playerData.Email || this.state.email,
      customer_firstname:
        this.props.playerData.FullName.split(" ")[0] || "Chopbarh",
      customer_lastname:
        this.props.playerData.FullName.split(" ")[1] || "Tester",
      amount: Number(this.state.amount),
      customer_phone: this.props.playerData.PhoneNum,
      country: "NG",
      currency: "NGN",
      txref: `${this.props.playerData.PhoneNum}-${reference}`,
      onclose: function() {},
      callback: function(response) {
        let flw_ref = response.tx.flwRef; // collect flwRef returned and pass to a 					server page to complete status check.
        // console.log("This is the response returned after a charge", response);
        if (
          response.tx.chargeResponse == "00" ||
          response.tx.chargeResponse == "0"
        ) {
          // redirect to a success page
        } else {
          // redirect to a failure page.
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
        {/* <RavePaymentModal
          text="Make Deposit"
          class="payButton"
          // metadata={[{ metaname: 'Device', metavalue: 'IPhone X' }]}
          reference={this.getReference()}
          disabled={true}
          email={this.state.email}
          amount={this.state.amount}
          ravePubKey={this.state.key}
          callback={this.callback}
          close={this.close}
          isProduction={true}
          tag="button"
        /> */}
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
)(RavePayment);
