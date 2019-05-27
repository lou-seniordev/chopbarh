import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody } from "reactstrap";
import styled from "styled-components";
//import scuid from 'scuid'
import { Form, FormItem, HalfColumn } from "../../../styles/CardCharge";
import {
  openTransactionSuccessModal,
  openTransactionFailModal,
  closeTransactionFailModal,
  closeTransactionSuccessModal
} from "../../../../store/actions/modalActions";
import { setCashBalance } from "../../../../store/actions/cashBalanceActions";

const FormWrapper = styled(Form)`
  min-height: 20rem;
`;

// export default {
//   secretKey: "FLWSECK_TEST-98c53727b0776e98a1ad0e0dacc220f7-X"
// };

class AccountNumber extends Component {
  state = {
    loading: false,
    formErrorModal: false,
    overdraftModal: false,
    successModal: false,
    amount: "",
    bank: "",
    account_number: "",
    account_confirmed: false,
    account_name: ""
  };

  formErrorModalToggle = () => {
    this.setState({ formErrorModal: !this.state.formErrorModal });
  };

  successModalToggle = () => {
    this.setState({ successModal: !this.state.successModal });
  };

  overdraftModalToggle = () => {
    this.setState({ overdraftModal: !this.state.overdraftModal });
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
      this.setState({ formErrorModal: true });
      this.setState({ loading: false });
      return;
    }

    if (this.state.amount > this.props.playerData.RealCoins) {
      this.setState({ overdraftModal: true });
      return;
    }

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
      this.setState({
        loading: false,
        amount: "",
        bank: "",
        account_number: ""
      });
      if (response.status === 200) {
        this.props.openTransactionSuccessModal();
        this.props.setCashBalance(data.data.amount, 2);
      } else {
        this.props.openTransactionFailModal();
      }
    } catch (err) {
      this.setState({ loading: false });
      this.setState({ formErrorModal: true });
    }
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.state.formErrorModal}
          toggle={this.formErrorModalToggle}
          style={{
            marginTop: "22rem"
          }}
        >
          <ModalBody className="text-center" style={{ height: "20vh" }}>
            <h2>Ooops!</h2>
            <p>Something went wrong. Please try again</p>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.props.transactionSuccessModal}
          toggle={this.props.closeTransactionSuccessModal}
          style={{
            marginTop: "22rem"
          }}
        >
          <ModalBody
            className="text-center"
            style={{ height: "20vh", paddingTop: "4rem" }}
          >
            <h2>Success!</h2>
            <p>The Transaction was successful</p>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.props.transactionFailModal}
          toggle={this.props.closeTransactionFailModal}
          style={{
            marginTop: "22rem"
          }}
        >
          <ModalBody
            className="text-center"
            style={{ height: "20vh", paddingTop: "4rem" }}
          >
            <h2>Failed!</h2>
            <p>The transaction was not successful. Please try again</p>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.overdraftModal}
          toggle={this.overdraftModalToggle}
          style={{
            marginTop: "22rem"
          }}
        >
          <ModalBody
            className="text-center"
            style={{ height: "20vh", paddingTop: "4rem" }}
          >
            <h2>Oh Snap!</h2>
            <p>The amount is above your winnings</p>
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
  transactionSuccessModal: state.modal.transactionSuccessModal,
  transactionFailModal: state.modal.transactionFailModal,
  playerData: state.player.playerData
});

const mapDispatchToProps = {
  openTransactionSuccessModal,
  openTransactionFailModal,
  closeTransactionFailModal,
  closeTransactionSuccessModal,
  setCashBalance
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountNumber);
