import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
// import NumberFormat from "react-number-format";
import { Modal, ModalBody } from "reactstrap";
import {
  Button
} from "../../../styles/CardCharge";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
//import scuid from "scuid";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";
import {
  openTransactionSuccessModal,
  openTransactionFailModal,
  closeTransactionFailModal,
  closeTransactionSuccessModal
} from "../../../../store/actions/modalActions";
import { setCashBalance } from "../../../../store/actions/cashBalanceActions";
import { setWithdrawalHistory } from "../../../../store/actions/withdrawalActions";
import { getReference } from "../../../../lib/getReference";

const Form = styled.form`
  position: relative;

  button {
    all: unset;
    padding: 0.5rem 1.3rem;
    display: inline-block;
    position: absolute;
    left: 50%;
    transform: skew(-20deg) translateX(-50%);
    transition: all 0.2s;
    color: ${color.colorWhite};
    background: ${color.colorPrimary};
    font-size: 1.3rem;
    z-index: 200;

    @media only screen and (max-width: ${breakPoints.mediumLite}) {
      font-size: 1.1rem;
    }

    span {
      display: inline-block;
      transform: skew(20deg);
      color: #fff;

      @media screen and (min-color-index: 0) and(-webkit-min-device-pixel-ratio:0) {
        color: #ffffff;
      }
    }

    &:hover {
      transform: translateY(-3px) skew(-20deg) translateX(-50%);
      background: ${color.colorPrimaryHover};
      color: ${color.colorWhite};
    }
  }
`;

const FormItem = styled.div`
  label {
    font-size: 1.4rem;
    font-weight: 600;
    color: #737773;
    margin-bottom: 1rem;
  }

  input,
  select {
    color: #8d8e8d;
    width: 100%;
    height: 3.4rem;
    margin-bottom: 2rem;
    border: 0;
    background: #f6f6f6;
    outline: none;
    padding: 3px 5px;
  }

  & > * {
    display: block;
    font-family: inherit;
  }
`;

const HalfColumn = styled.div`
  display: flex;

  @media only screen and (max-width: ${breakPoints.large}) {
    flex-direction: column;
  }

  div {
    width: 50%;

    @media only screen and (max-width: ${breakPoints.large}) {
      width: 100%;
    }
  }
`;

class Paga extends Component {
  state = {
    loading: false,
    formErrorModal: false,
    overdraftModal: false,
    successModal: false,
    amount: "",
    phone: ""
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

  formIsValid = ({ amount, phone }) => {
    if (
      !isNaN(amount) !== true ||
      !isNaN(phone) !== true ||
      phone.length < 10
    ) {
      return false;
    }
    return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (!this.formIsValid(this.state)) {
      this.setState({ formErrorModal: true });
      toast.error(`Form field not valid`);
      return;
    }

    if (this.state.amount > this.props.playerData.RealCoins) {
      this.setState({ loading: false });
      toast.error(`You can't withdraw more than you've earned`);
      return;
    }

    if (Number(this.state.amount) < 200) {
      toast.error(`You cannot withdraw less than \u20a6${200}`);
      this.setState({ loading: false });
      return;
    }

    this.setState({ loading: false, confirmModal: true });
  };

  activatePaga = async () => {
    const newState = { ...this.state };
    let sliced_phone_number = `234${newState.phone
      .split("")
      .slice(1)
      .join("")}`;

    let hashParameter = "referenceNumber,amount,destinationAccount";

    let transactionReference = getReference();

    let params = ("" + hashParameter).split(",");
    const body = {
      referenceNumber: transactionReference,
      amount: Number(this.state.amount) - 50,
      minRecipientKYCLevel: "KYC2",
      destinationAccount: sliced_phone_number,
      alternateSenderName: "Chopbarh"
    };

    hashParameter = "";
    for (let i in params) {
      hashParameter += body[params[i]] || "";
    }
    hashParameter =
      hashParameter +
      "67152bc549c44f20a577e1f4ec30bd5fb0cd7d8e5d914344a9b9315f6c513df532be1e52e4f14ba48b8a600413be2fd6a706436b855d45b583f1364813e95674";
    let hash = CryptoJS.SHA512(hashParameter);
    hash = hash.toString(CryptoJS.enc.Hex);

    // console.log(hash);

    // Add new logic for withdrawals ledger

    await fetch(
      "https://mypaga.com/paga-webservices/business-rest/secured/moneyTransfer",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          Principal: "EC7C101A-542C-40D5-8BD8-F1B598E20B67",
          Credentials: "yS4%fg7RnEYnpft",
          Hash: hash
        },
        body: JSON.stringify(body)
      }
    )
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        if (data.responseCode === 0) {
          const payload = {
            status: "SUCCESSFUL",
            amount: this.state.amount,
            fee: 50,
            reference: transactionReference,
            channel: "Paga",
            date: new Date().toISOString()
          };
          this.props.setCashBalance(Number(this.state.amount), 2);
          this.setState({ loading: false, phone: "", amount: "" });
          toast.success(`Transaction was successful`);
          this.props.setWithdrawalHistory(payload);
          // Send mail here
        } else {
          this.setState({ loading: false });
          toast.error(`Transaction was not successful`);
        }
      })
      .catch(err => {
        console.log("Error", err);
        toast.error(`Something went wrong`);
      });
  };

  toggleConfirmModal = () => {
    this.setState({
      confirmModal: !this.state.confirmModal
    });
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.state.confirmModal}
          toggle={this.toggleConfirmModal}
          style={{
            top: "50%",
            transform: "translateY(-50%)"
          }}
        >
          <ModalBody className="text-center p-4" style={{ minHeight: "12rem" }}>
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
                {new Intl.NumberFormat().format(+this.state.amount - 50)}
              </strong>
            </p>
            <p>Proceed with withdrawal?</p>
            <div className="d-flex justify-content-center">
              <Button className="mr-1" onClick={this.activatePaga}>
                <span>{this.state.authorizing ? "Processing..." : "Yes"}</span>
              </Button>
              {!this.state.authorizing ? (
                <Button
                  onClick={() => this.setState({ confirmModal: false })}
                  className="ml-1"
                >
                  <span>No</span>
                </Button>
              ) : (
                <>{null}</>
              )}
            </div>
          </ModalBody>
        </Modal>
        <Form onSubmit={this.handleSubmit}>
          <HalfColumn>
            <FormItem className="mr-3">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                value={this.state.amount}
                onChange={this.handleInputChange}
                placeholder="Amount(NGN)"
                required
              />
              {/* <NumberFormat
                thousandSeparator
                name="amount"
                value={this.state.amount}
                onChange={this.handleInputChange}
                placeholder="Amount(NGN)"
                required
              /> */}
            </FormItem>
            <FormItem>
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={this.state.phone}
                onChange={this.handleInputChange}
                placeholder="Phone Number"
                minLength={11}
                maxLength={11}
                required
              />
              {/* <NumberFormat
                name="phone"
                value={this.state.phone}
                onChange={this.handleInputChange}
                placeholder="Phone Number"
                required
              /> */}
            </FormItem>
          </HalfColumn>
          <button type="submit" className="mr-2" disabled={this.state.loading}>
            <span style={{ color: "#ffffff" }}>
              {this.state.loading ? "Processing..." : "Withdraw"}
            </span>
          </button>
        </Form>
        <div className="container">
          <div className="text-center" style={{ marginTop: "5rem" }}>
            <p>&rarr; Dail *242# to Register for First time Users</p>
            <p>
              &rarr; Dial *242*2*Amount*AccountNumber# for instant transfer to
              any bank
            </p>
            <p>&rarr; Dial *242*3*Amount# to Withdraw at any Paga Agent</p>
            <p>
              &rarr; Dial *242*4*Amount# to Withdraw at any ATM without a card
              or bank account
            </p>
          </div>
        </div>
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
  transactionSuccessModal: state.modal.transactionSuccessModal,
  transactionFailModal: state.modal.transactionFailModal,
  playerData: state.player.playerData
});

const mapDispatchToProps = {
  openTransactionSuccessModal,
  openTransactionFailModal,
  closeTransactionFailModal,
  closeTransactionSuccessModal,
  setWithdrawalHistory,
  setCashBalance
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Paga);
