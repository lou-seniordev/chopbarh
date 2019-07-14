import React, { Component, memo } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody } from "reactstrap";
// import NumberFormat from "react-number-format";
import styled from "styled-components";
import {
  Form,
  FormItem,
  HalfColumn,
  FormSubmitButton,
  Button
} from "../../../styles/CardCharge";
import { toast } from "react-toastify";
import { setCashBalance } from "../../../../store/actions/cashBalanceActions";
import Banks from "./Banks";
import { setWithdrawalHistory } from "../../../../store/actions/withdrawalActions";
import { getReference } from "../../../../lib/getReference";

const FormWrapper = styled(Form)`
  min-height: 20rem;
  margin-bottom: 3.2rem;
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

    if (Number(this.state.amount) + 50 > this.props.playerData.RealCoins) {
      toast.error("You cannot withdraw more than you have won");
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

    // Add new logic here to send to the withdraws ledger

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

    // Add logic to filter amount based on the value to factor in fees to be paid

    const postData = {
      account_bank: this.state.bank,
      account_number: this.state.account_number,
      amount: +this.state.amount + 50,
      seckey: "FLWSECK_TEST-98c53727b0776e98a1ad0e0dacc220f7-X",
      narration: "Chopbarh Withdrawal",
      currency: "NGN",
      reference: getReference()
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

      // Confirm withdrawal actually goes through here
      if (data.status === "success") {
        const payload = {
          status: "Success",
          amount: +data.data.amount - 50,
          date: data.data.date_created,
          reference: data.data.reference,
          fee: 50,
          channel: "AZA"
        };
        toast.success("Transaction was Successful");
        this.setState({
          loading: false,
          amount: "",
          bank: "",
          account_number: ""
        });
        this.props.setCashBalance(Number(data.data.amount), 2);
        this.props.setWithdrawalHistory(payload);
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
        <Modal
          isOpen={true}
          toggle={this.toggleModal}
          style={{
            marginTop: "22rem"
          }}
        >
          <ModalBody className="text-center mt-5" style={{ height: "20vh" }}>
            <p>
              <strong>Account: {this.state.account_name}</strong>
            </p>
            <p>Proceed with withdrawal?</p>
            <div className="d-flex justify-content-center">
              <Button className="mr-1">
                <span>Yes</span>
              </Button>
              <Button className="ml-1">
                <span>No</span>
              </Button>
            </div>
          </ModalBody>
        </Modal>
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
          <FormSubmitButton
            type="submit"
            className="mr-2"
            disabled={this.state.loading}
          >
            <span>{this.state.loading ? "Processing..." : "Load"}</span>
          </FormSubmitButton>
        </FormWrapper>
        <div className="text-center" style={{ color: "#000" }}>
          <p>
            **For all withdrawals there is a &#8358;50 deducted from your cash
            balance**
          </p>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  playerData: state.player.playerData,
  withdrawalLimit: state.withdrawal.withdrawalLimit,
  withdrawalStatus: state.withdrawal.withdrawalStatus
});

const mapDispatchToProps = {
  setCashBalance,
  setWithdrawalHistory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(AccountNumber));
