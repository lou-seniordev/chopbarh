import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import NumberFormat from "react-number-format";
// import { Modal, ModalBody } from "reactstrap";
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

    const newState = { ...this.state };
    let sliced_phone_number = `234${newState.phone
      .split("")
      .slice(1)
      .join("")}`;

    let hashParameter = "referenceNumber,amount,destinationAccount";

    let params = ("" + hashParameter).split(",");
    const body = {
      referenceNumber: `chopbarh-${new Date().getDate()}-${new Date().getDate()}-${new Date().getSeconds()}-ref`,
      amount: this.state.amount,
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
      "d98076e2d14c4045970edc466faa2ec8cc47c9b89b654001b5e4db27179a0b9559bee92b78034c558a9d24aca2fa4135db8938a3f4a74b7da1157dee68e15213";
    let hash = CryptoJS.SHA512(hashParameter);
    hash = hash.toString(CryptoJS.enc.Hex);

    fetch(
      "https://qa1.mypaga.com/paga-webservices/business-rest/secured/moneyTransfer",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Principal: "98F32858-CC3B-42D4-95A3-742110A8D405",
          Credentials: "rR9@f8u@bBES",
          Hash: hash
        },
        body: JSON.stringify(body)
      }
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.responseCode === 0) {
          this.props.setCashBalance(this.state.amount, 2);
          this.setState({ loading: false, phone: "", amount: "" });
          // this.props.openTransactionSuccessModal();
          toast.success(`Transaction was successful`);

          // Send mail here
        } else {
          this.setState({ loading: false });
          // this.props.openTransactionFailModal();
          toast.error(`Transaction was not successful`);
        }
      })
      .catch(err => {
        console.log("Error", err);
        // this.setState({ formErrorModal: true });
        toast.error(`Something went wrong`);
      });
  };

  render() {
    return (
      <>
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
            <span>{this.state.loading ? "Processing..." : "Withdraw"}</span>
          </button>
        </Form>
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
)(Paga);
