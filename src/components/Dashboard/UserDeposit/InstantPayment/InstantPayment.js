import React, { Component } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { connect } from "react-redux";
import { Modal, ModalBody, Spinner, Button } from "reactstrap";
import { Form, FormItem, FormSubmitButton } from "../../../styles/CardCharge";
import { setDepositHistory } from "../../../../store/actions/depositActions";
import {
 fetchInstantPaymentAccountData,
 setInstantPaymentAccountData
} from "../../../../store/actions/instantPaymentActions";

import "react-accessible-accordion/dist/fancy-example.css";

const FormWrapper = styled(Form)`
 min-height: 15rem;
`;

class InstantPayment extends Component {
 state = {
  key: "FLWPUBK-c5932c92f9633277760b44c1faf57207-X",
  email: "chopbarh@mail.com",
  amount: "",
  loading: false,
  successModal: false,
  errorModal: false,
  paymentData: {
   accountnumber: null,
   note: null
  }
 };

 componentDidMount = () => {
  this.props.fetchInstantPaymentAccountData();
 };

 //  TODO: Add componentDidUpdate here

 getReference = () => {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < 10; i++)
   text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
 };

 toggleSuccessModal = () => {
  this.setState({ successModal: !this.state.successModal });
 };

 toggleErrorModal = () => {
  this.setState({ errorModal: !this.state.errorModal });
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

  if (+this.state.amount < 100) {
   toast.error(`Minimum deposit is \u20a6${100}`);
   this.setState({ loading: false });
   return;
  }

  this.setState({ loading: true });

  let reference = this.getReference();

  const historyObject = {
   amount: this.state.amount,
   channel: "Bank Transfer",
   transaction_date: new Date().toISOString(),
   fees: "0",
   reference: "--",
   status: "--",
   refId: `${this.props.playerData.PhoneNum}-${reference}`,
   gateway: "Flutterwave",
   made_by: this.props.playerData.PhoneNum
  };

  //   this.props.setDepositHistory(historyObject);

  // Make request to Rave
  const chargeData = {
   seckey: "FLWSECK_TEST-98c53727b0776e98a1ad0e0dacc220f7-X",
   narration: `CHOPBARH - ${this.props.playerData.NickName.toUpperCase()}`,
   email: "chopbarh@mail.com",
   is_permanent: true
  };

  fetch("https://api.ravepay.co/v2/banktransfers/accountnumbers", {
   method: "POST",
   headers: {
    "Content-Type": "application/json"
   },
   body: JSON.stringify(chargeData)
  })
   .then(response => response.json())
   .then(data => {
    // Display the result in Modal
    this.setState({
     successModal: true,
     paymentData: { ...data.data },
     loading: false
    });

    //  Attach this account number to this person
    this.props.setInstantPaymentAccountData({
     account_number: data.data.accountnumber
    });
   })
   .catch(err => {
    // Display error modal
    this.setState({ loading: false, errorModal: true });
   });

  // If the user has used the moethod before, it should not have them
 };

 render() {
  return (
   <>
    <Modal
     isOpen={this.state.errorModal}
     toggle={this.toggleErrorModal}
     style={{
      top: "50%",
      transform: "translateY(-50%)"
     }}
    >
     <ModalBody className="text-center p-4" style={{ minHeight: "9rem" }}>
      <p className="mt-4">
       There was an error while carrying out this action. Please try again later
      </p>
     </ModalBody>
    </Modal>
    <Modal
     isOpen={this.state.successModal}
     toggle={this.toggleSuccessModal}
     style={{
      top: "50%",
      transform: "translateY(-50%)"
     }}
    >
     <ModalBody className="text-center p-4" style={{ minHeight: "12rem" }}>
      <p className="mt-4">
       Please take note of the information below. The account number provided
       should be used for subsequent transactions that come through this channel
      </p>
      <p>
       Account Number: <strong>{this.state.paymentData.accountnumber}</strong>
      </p>
      <p>
       Note: <strong>{this.state.paymentData.note}</strong>
      </p>
     </ModalBody>
    </Modal>
    <div>
     <FormWrapper onSubmit={this.handleSubmit}>
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
     </FormWrapper>
    </div>
   </>
  );
 }
}

const mapStateToProps = state => ({
 playerData: state.player.playerData
});

const mapDispatchToProps = {
 setDepositHistory,
 fetchInstantPaymentAccountData,
 setInstantPaymentAccountData
};

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(InstantPayment);
