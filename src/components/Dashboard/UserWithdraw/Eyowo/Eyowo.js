import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, Spinner, Button } from "reactstrap";
import styled from "styled-components";
import {
  Form,
  FormItem,
  HalfColumn,
  FormSubmitButton,
  ExistingCardForm,
  ExistingCardFormItem,
  Button as FormElementButton
} from "../../../styles/CardCharge";
import { toast } from "react-toastify";
import { setCashBalance } from "../../../../store/actions/cashBalanceActions";

import { setWithdrawalHistory } from "../../../../store/actions/withdrawalActions";
import { getReference } from "../../../../lib/getReference";

const FormWrapper = styled(Form)`
  min-height: 20rem;
  margin-bottom: 3.2rem;
`;

class Eyowo extends Component {
  render() {
    return (
      <FormWrapper onSubmit={this.handleSubmit}>
        <FormItem className="mr-3">
          <label>Phone Number</label>
          <input
            type="text"
            value={this.state.account_number}
            onChange={this.handleInputChange}
            name="account_number"
            required
            placeholder="Account Number"
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Eyowo);
