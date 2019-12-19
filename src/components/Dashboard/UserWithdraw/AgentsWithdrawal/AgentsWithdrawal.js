import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  Form,
  FormItem,
  HalfColumn,
  FormSubmitButton
} from "../../../styles/CardCharge";
import firebase, { firestore } from "../../../../firebase";

const FormWrapper = styled(Form)`
  min-height: 20rem;
  margin-bottom: 3.2rem;
`;

class AgentsWithdrawal extends Component {
  state = {
    loading: false,
    phone_number: "",
    amount: "",
    currentTransferAmount: 0
  };

  componentDidMount = async () => {
    var now = new Date();
    var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var timestamp = startOfDay.getTime() / 1000;

    try {
      let snapshots = await firestore
        .collection("transfer_to_agent")
        .where("playerId", "==", localStorage.getItem("chopbarh-id:live"))
        .where("at", ">=", timestamp)
        .get();

      let data = snapshots.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      let totalTransferredSoFar = data.reduce(
        (acc, cur) => (acc += cur.amount),
        0
      );
      // console.log(data, totalTransferredSoFar);

      this.setState({ currentTransferAmount: totalTransferredSoFar });
    } catch (err) {
      // console.log(err);
    }
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  formIsValid = ({ amount, phone_number }) => {
    if (
      !isNaN(amount) !== true ||
      !isNaN(phone_number) !== true ||
      phone_number.length !== 11
    ) {
      return false;
    }
    return true;
  };

  handleSubmit = async event => {
    event.preventDefault();

    if (this.props.playerData.PlayerStatus === 0) {
      toast.error("Your account has been deactivated.");
      return;
    }

    this.setState({ loading: true });

    if (!this.formIsValid(this.state)) {
      toast.error("Form is not valid");
      this.setState({ loading: false });
      return;
    }

    if (Number(this.state.amount) > this.props.playerData.RealCoins) {
      toast.error("You cannot withdraw more than you have won");
      this.setState({ loading: false });
      return;
    }

    if (Number(this.state.amount) < 1000) {
      toast.error(
        `You cannot transfer less than \u20a6${new Intl.NumberFormat().format(
          1000
        )}`
      );
      this.setState({ loading: false });
      return;
    }

    if (Number(this.state.amount) > 20000) {
      toast.error(
        `You cannot transfer more than \u20a6${new Intl.NumberFormat().format(
          20000
        )}`
      );
      this.setState({ loading: false });
      return;
    }

    if (Number(this.state.currentTransferAmount) >= 20000) {
      toast.error(
        `You have exceeded your transfer limit of \u20a6${new Intl.NumberFormat().format(
          20000
        )}`
      );
      this.setState({ loading: false });
      return;
    }

    const context = this;

    try {
      const response = await fetch(
        "https://pay.chopbarh.com/ng/agents_withdrawal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            apiKey: "d979dfb8-5150-4b59-8402-4cc39e2e0f47"
          },
          body: JSON.stringify({
            amount: +this.state.amount,
            phone_number: this.state.phone_number,
            playerId: this.props.playerData.PlayerID
          })
        }
      );

      const data = await response.json();

      if (data.status === true) {
        try {
          const docRef = await firestore.collection("transfer_to_agent").add({
            amount: +this.state.amount,
            phone_number: this.state.phone_number,
            playerId: this.props.playerData.PlayerID,
            at: Date.now(),
            time: firebase.firestore.FieldValue.serverTimestamp(),
            date: new Date().toISOString()
          });
        } catch (err) {}

        toast.info("Transaction is processing");
        context.setState({ loading: false, amount: "", phone_number: "" });
      } else {
        toast.error("Request could not be processed due to an error");
        context.setState({ loading: false, amount: "", phone_number: "" });
      }
    } catch (err) {
      toast.error("Request could not be processed due to an error");
      context.setState({ loading: false, amount: "", phone_number: "" });
    }
  };

  render() {
    return (
      <>
        <div className="mb-4">
          <h5>
            <strong>Daily Transfer Limit:</strong> &#8358;
            {new Intl.NumberFormat().format(20000)}
          </h5>
          <h5>
            <strong>Current Daily Transfer:</strong> &#8358;
            {new Intl.NumberFormat().format(this.state.currentTransferAmount)}
          </h5>
          <h5>
            <strong>Allowable Transfer:</strong> &#8358;
            {new Intl.NumberFormat().format(
              20000 - this.state.currentTransferAmount
            )}
          </h5>
        </div>
        <FormWrapper onSubmit={this.handleSubmit}>
          <HalfColumn>
            <FormItem className="mr-3">
              <label>Agent's Phone Number</label>
              <input
                type="text"
                name="phone_number"
                onChange={this.handleInputChange}
                required
                placeholder="Agent's Phone Number"
              />
            </FormItem>
            <FormItem>
              <label>Amount</label>
              <input
                type="text"
                name="amount"
                onChange={this.handleInputChange}
                required
                placeholder="Amount(NGN)"
              />
            </FormItem>
          </HalfColumn>
          <FormSubmitButton type="submit" className="mr-2">
            <span>{this.state.loading ? "Processing..." : "Withdraw"}</span>
          </FormSubmitButton>
        </FormWrapper>
        {/* <div className="text-center" style={{ color: "#000" }}>
          <p>
            **For all withdrawals there is a &#8358;50 deducted from your cash
            balance**
          </p>
        </div> */}
      </>
    );
  }
}

const mapStateToProps = state => ({
  playerData: state.player.playerData
});

export default connect(mapStateToProps)(AgentsWithdrawal);
