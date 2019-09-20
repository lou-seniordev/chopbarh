import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, Spinner, Button } from "reactstrap";
import styled from "styled-components";
import { Form, FormItem, FormSubmitButton } from "../../../styles/CardCharge";
import { toast } from "react-toastify";
import { setCashBalance } from "../../../../store/actions/cashBalanceActions";

import { setWithdrawalHistory } from "../../../../store/actions/withdrawalActions";
import { getReference } from "../../../../lib/getReference";

const FormWrapper = styled(Form)`
  min-height: 20rem;
  margin-bottom: 3.2rem;
`;

class Eyowo extends Component {
  state = {
    phone_number: "",
    amount: "",
    loading: false
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  formIsValid = ({ amount, phone_number }) => {
    if (
      !isNaN(amount) !== true ||
      !isNaN(phone_number) !== true ||
      phone_number.length === 11
    ) {
      return false;
    }
    return true;
  };

  handleSubmit = event => {
    event.preventDefault();

    // Validate the form filled
    if (!this.formIsValid(this.state)) {
      toast.error("Form is not valid");
      this.setState({ loading: false });
      return;
    }

    // Confirm they can withdraw that amount
    if (Number(this.state.amount) > this.props.playerData.RealCoins) {
      toast.error("You cannot withdraw more than you have won");
      this.setState({ loading: false });
      return;
    }

    if (Number(this.state.amount) < 200) {
      toast.error(`You cannot withdraw less than \u20a6${200}`);
      this.setState({ loading: false });
      return;
    }

    if (Number(this.state.amount) > 50000) {
      toast.error(
        `You cannot withdraw more than \u20a6${new Intl.NumberFormat().format(
          50000
        )} at once`
      );
      this.setState({ loading: false });
      return;
    }

    if (
      this.props.withdrawalStatus + Number(this.state.amount) >
      this.props.withdrawalLimit
    ) {
      toast.error(
        "Withdrawal could not be completed. Your daily limit will be exceeded."
      );
      this.setState({ loading: false });
      return;
    }

    // Do User authorization

    // Set the Withdrawal History

    // Send the money to them
  };

  render() {
    return (
      <FormWrapper onSubmit={this.handleSubmit}>
        <FormItem>
          <label>Phone Number</label>
          <input
            type="text"
            value={this.state.phone_number}
            onChange={this.handleInputChange}
            name="phone_number"
            required
            placeholder="Phone Number"
          />
        </FormItem>
        <FormItem>
          <label>Amount</label>
          <input
            type="text"
            value={this.state.amount}
            onChange={this.handleInputChange}
            name="amount"
            required
            placeholder="Amount(NGN)"
          />
        </FormItem>
        <FormSubmitButton
          type="submit"
          className="mr-2"
          disabled={this.state.loading}
        >
          <span>{this.state.loading ? "Processing..." : "Withdraw"}</span>
        </FormSubmitButton>
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  playerData: state.player.playerData,

  withdrawalStatus: state.withdrawal.withdrawalStatus,
  withdrawalAccount: state.withdrawalAccount.withdrawalAccount
});

const mapDispatchToProps = {
  setCashBalance,
  setWithdrawalHistory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Eyowo);
