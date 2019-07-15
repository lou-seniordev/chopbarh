import React, { Component, memo } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, Spinner } from "reactstrap";
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

import { setWithdrawalHistory } from "../../../../store/actions/withdrawalActions";
import { getReference } from "../../../../lib/getReference";

const FormWrapper = styled(Form)`
  min-height: 20rem;
  margin-bottom: 3.2rem;
`;

// API.... sk_live_f46f17bcba5eefbb48baabe5f54d10e67c90e83a   Secret
// API.... pk_live_208123773de037158fe467875f0501886d105a8f  Public

class AccountNumber extends Component {
  state = {
    loading: false,
    amount: "",
    bank: "",
    account_number: "",
    account_confirmed: false,
    account_name: "",
    modal: false,
    bankList: null,
    error: false,
    dataLoading: true,
    paying: false
  };

  componentDidMount = () => {
    fetch(
      "https://api.ravepay.co/v2/banks/ng?public_key=FLWPUBK-e87a9fb00e960628ab7fe30288405116-X",
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          bankList: data.data.Banks,
          dataLoading: false,
          bank: data.data.Banks[0].Code
        });
      })
      .catch(err => this.setState({ error: err, dataLoading: false }));
  };

  toggleModal = () => {
    this.setState({ modal: !this.state.modal, loading: false });
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

  verifyAccount = (account, bank) => {};

  withdrawCash = async () => {
    this.setState({ paying: true });

    const valueCharged = +this.state.amount + 50;
    const postData = {
      account_bank: this.state.bank,
      account_number: this.state.account_number,
      amount: valueCharged,
      seckey: "FLWSECK-6c50f0fa49045876075058059855ff70-X",
      narration: "Chopbarh Payment",
      currency: "NGN",
      reference: `${this.props.playerData.PhoneNum}-${getReference()}`
    };

    try {
      // prod https://api.ravepay.co/v2/gpx/transfers/create
      const response = await fetch(
        "https://api.ravepay.co/v2/gpx/transfers/create",
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
          status: "Pending",
          amount: +this.state.amount,
          date: data.data.date_created,
          reference: data.data.reference,
          fee: 50,
          channel: "AZA"
        };
        this.setState({
          amount: "",
          bank: "",
          account_number: "",
          paying: false,
          modal: false
        });
        this.props.setCashBalance(Number(valueCharged), 2);
        this.props.setWithdrawalHistory(payload);
        toast.info("Transaction is being processed");
      } else {
        this.setState({
          amount: "",
          bank: "",
          account_number: "",
          paying: false,
          modal: false
        });
        toast.error("Transaction was not successful");
      }
    } catch (err) {
      this.setState({ loading: false, modal: false });
      toast.error("Something went wrong");
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (!this.formIsValid(this.state)) {
      toast.error("Form is not valid");
      this.setState({ loading: false });
      return;
    }

    if (Number(this.state.amount) < 50) {
      toast.error(`You cannot withdraw less than \u20a6${50}`);
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

    // if (Number(this.state.amount) + 50 > this.props.playerData.RealCoins) {
    //   toast.error("You cannot withdraw more than you have won");
    //   this.setState({ loading: false });
    //   return;
    // }

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

    const postData = {
      recipientaccount: this.state.account_number,
      destbankcode: this.state.bank,
      PBFPubKey: "FLWPUBK-e87a9fb00e960628ab7fe30288405116-X"
    };

    fetch("https://api.ravepay.co/flwv3-pug/getpaidx/api/resolve_account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.data.data.accountname) {
          this.setState({
            account_confirmed: true,
            account_name: data.data.data.accountname,
            modal: true
          });
        } else {
          this.setState({ loading: false });
          toast.error(
            "Account verification not successful. Please check your details again"
          );
        }
      })
      .catch(err => {
        this.setState({ loading: false });
        toast.error("Something went wrong");
      });
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          style={{
            marginTop: "22rem"
          }}
        >
          <ModalBody
            className="text-center mt-5 mb-5"
            style={{ miHeight: "20vh" }}
          >
            <p>
              <strong>Account: {this.state.account_name}</strong>
            </p>
            <p>
              <strong>
                Amount: &#8358;
                {new Intl.NumberFormat().format(+this.state.amount)}
              </strong>
            </p>
            <p>
              <strong>Transaction Fee: &#8358;{50}</strong>
            </p>
            <p>
              <strong>
                Total: &#8358;
                {new Intl.NumberFormat().format(+this.state.amount + 50)}
              </strong>
            </p>
            <p>Proceed with withdrawal?</p>
            <div className="d-flex justify-content-center">
              <Button className="mr-1" onClick={this.withdrawCash}>
                <span>Yes</span>
              </Button>
              <Button onClick={this.toggleModal} className="ml-1">
                <span>No</span>
              </Button>
            </div>
          </ModalBody>
        </Modal>
        {!this.state.dataLoading ? (
          <>
            {this.state.bankList ? (
              <>
                <FormWrapper onSubmit={this.handleSubmit}>
                  <FormItem>
                    <label>Bank</label>
                    <select
                      name="bank"
                      value={this.state.bank}
                      onChange={this.handleInputChange}
                      required
                    >
                      {this.state.bankList.map(bank => (
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
                    <span>
                      {this.state.loading ? "Processing..." : "Withdraw"}
                    </span>
                  </FormSubmitButton>
                </FormWrapper>
                <div className="text-center" style={{ color: "#000" }}>
                  <p>
                    **For all withdrawals there is a &#8358;50 deducted from
                    your cash balance**
                  </p>
                </div>
              </>
            ) : (
              <div className="mt-5 text-center" style={{ minHeight: "30vh" }}>
                <p>Something went wrong</p>
              </div>
            )}
          </>
        ) : (
          <div className="mt-5 text-center" style={{ minHeight: "30vh" }}>
            <Spinner />
          </div>
        )}
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
