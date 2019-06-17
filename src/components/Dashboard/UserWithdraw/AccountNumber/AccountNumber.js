import React, { Component, memo } from "react";
import { connect } from "react-redux";
// import NumberFormat from "react-number-format";
import styled from "styled-components";
import { Form, FormItem, HalfColumn } from "../../../styles/CardCharge";
import { toast } from "react-toastify";
import { setCashBalance } from "../../../../store/actions/cashBalanceActions";
import Banks from "./Banks";
import { setWithdrawalHistory } from "../../../../store/actions/withdrawalActions";

const FormWrapper = styled(Form)`
  min-height: 20rem;
`;

class AccountNumber extends Component {
  state = {
    loading: false,
    amount: "",
    bank: "",
    account_number: "",
    account_confirmed: false,
    account_name: ""
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  formIsValid = ({ amount, account_number }) => {
    if (
      !isNaN(amount) !== true ||
      !isNaN(account_number) !== true ||
      account_number.length < 10
    ) {
      return false;
    }
    return true;
  };

  verifyAccount = (account, bank) => {
    const postData = {
      recipientaccount: account,
      destbankcode: bank,
      PBFPubKey: "FLWPUBK_TEST-195cdc10fea3cdfc1be0d60cf6aa0c80-X"
    };

    return fetch(
      "https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/resolve_account",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      }
    ).then(response => response.json());
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (!this.formIsValid(this.state)) {
      toast.error("Form is not valid");
      this.setState({ loading: false });
      return;
    }

    // if (this.state.amount > this.props.playerData.RealCoins) {
    //   toast.error("You cannot withdraw more than you have won");
    //   return;
    // }

    // Verify the account here and return the account Name in the UI
    // this.verifyAccount(this.state.account_number, this.state.bank)
    //   .then(data => {
    //     console.log(data);
    //     if (data.data.data.accountname) {
    //       this.setState({
    //         account_confirmed: true,
    //         account_name: data.data.data.accountname
    //       });
    //       console.log("Confirmed");
    //     } else {
    //       this.setState({ loading: false });
    //       console.log("Not Confirmed");
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    const postData = {
      account_bank: this.state.bank,
      account_number: this.state.account_number,
      amount: this.state.amount,
      seckey: "FLWSECK_TEST-98c53727b0776e98a1ad0e0dacc220f7-X",
      narration: "Chopbarh Transfer",
      currency: "NGN",
      reference: `chopbarh-${new Date().getDate()}-${new Date().getDate()}-${new Date().getSeconds()}-jk`
    };

    try {
      const response = await fetch(
        "https://ravesandboxapi.flutterwave.com/v2/gpx/transfers/create",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(postData)
        }
      );
      const data = await response.json();
      console.log(data);

      if (data.status === "success") {
        toast.success("Transaction was Successful");
        this.setState({
          loading: false,
          amount: "",
          bank: "",
          account_number: ""
        });
        this.props.setCashBalance(data.data.amount, 2);
        this.props.setWithdrawalHistory(data.data);
      } else {
        toast.error("Transaction was not successful");
      }
    } catch (err) {
      this.setState({ loading: false });
      toast.error("Something went wrong");
    }
  };

  render() {
    return (
      <>
        <FormWrapper onSubmit={this.handleSubmit}>
          {this.state.account_confirmed && (
            <hgroup>
              <h4>Account Name</h4>
              <h5>{this.state.account_name}</h5>
            </hgroup>
          )}
          <FormItem>
            <label>Bank</label>
            <select
              name="bank"
              value={this.state.bank}
              onChange={this.handleInputChange}
              required
            >
              {Banks.map(bank => (
                <option key={bank.Id} value={bank.Code}>
                  {bank.Name}
                </option>
              ))}
            </select>
          </FormItem>
          <HalfColumn>
            <FormItem className="mr-3">
              <label>Account Number</label>
              <input
                type="text"
                value={this.state.account_number}
                onChange={this.handleInputChange}
                name="account_number"
                required
                placeholder="Account Number"
              />
              {/* <NumberFormat
                value={this.state.account_number}
                onChange={this.handleInputChange}
                name="account_number"
                required
                placeholder="Account Number"
              /> */}
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
              {/* <NumberFormat
                thousandSeparator
                value={this.state.amount}
                onChange={this.handleInputChange}
                name="amount"
                required
                placeholder="Amount(NGN)"
              /> */}
            </FormItem>
          </HalfColumn>
          <button type="submit" className="mr-2" disabled={this.state.loading}>
            <span>{this.state.loading ? "Processing..." : "Load"}</span>
          </button>
        </FormWrapper>
      </>
    );
  }
}

const mapStateToProps = state => ({
  playerData: state.player.playerData
});

const mapDispatchToProps = {
  setCashBalance,
  setWithdrawalHistory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(AccountNumber));
