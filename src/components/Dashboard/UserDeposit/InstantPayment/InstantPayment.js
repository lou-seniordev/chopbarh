// import React, { Component } from "react";
// import { toast } from "react-toastify";
// import styled from "styled-components";
// import { connect } from "react-redux";
// import { Modal, ModalBody, Spinner, Button } from "reactstrap";
// import { Form, FormItem, FormSubmitButton } from "../../../styles/CardCharge";
// import { setDepositHistory } from "../../../../store/actions/depositActions";
// import {
//  fetchInstantPaymentAccountData,
//  setInstantPaymentAccountData,
//  removeInstantPaymentAccount
// } from "../../../../store/actions/instantPaymentActions";

// import "react-accessible-accordion/dist/fancy-example.css";

// const FormWrapper = styled(Form)`
//  min-height: 15rem;
// `;

// class InstantPayment extends Component {
//  state = {
//   key: "FLWPUBK-c5932c92f9633277760b44c1faf57207-X",
//   email: "chopbarh@mail.com",
//   amount: "",
//   account_active: false,
//   fetching: true,
//   loading: false,
//   successModal: false,
//   errorModal: false,
//   paymentData: {
//    accountnumber: null,
//    note: null
//   },
//   removing: false
//  };

//  componentDidMount = () => {
//   this.props.fetchInstantPaymentAccountData();
//  };

//  componentDidUpdate = prevProps => {
//   console.log("Updating...");
//   if (this.props !== prevProps) {
//    console.log(this.props);
//    this.setState({ fetching: false });
//   }
//  };

//  getReference = () => {
//   let text = "";
//   let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

//   for (let i = 0; i < 10; i++)
//    text += possible.charAt(Math.floor(Math.random() * possible.length));

//   return text;
//  };

//  toggleSuccessModal = () => {
//   this.setState({ successModal: !this.state.successModal });
//  };

//  toggleErrorModal = () => {
//   this.setState({ errorModal: !this.state.errorModal });
//  };

//  handleInputChange = ({ target }) => {
//   this.setState({ [target.name]: target.value });
//  };

//  formIsValid = ({ amount }) => {
//   if (!isNaN(amount) !== true) {
//    return false;
//   }
//   return true;
//  };

//  makePayment = async () => {
//   this.setState({ loading: true });
//   // Make request to Rave
//   const chargeData = {
//    seckey: "FLWSECK-6a2153446d5f15349075c71f591f9290-X",
//    narration: `CHOPBARH - ${this.props.playerData.NickName.toUpperCase()}`,
//    email: `${this.props.playerData.PhoneNum}@mail.com`,
//    is_permanent: true
//   };

//   fetch("https://api.ravepay.co/v2/banktransfers/accountnumbers", {
//    method: "POST",
//    headers: {
//     "Content-Type": "application/json"
//    },
//    body: JSON.stringify(chargeData)
//   })
//    .then(response => response.json())
//    .then(data => {
//     // Display the result in Modal
//     this.setState({
//      successModal: true,
//      paymentData: { ...data.data },
//      loading: false
//     });

//     //  Attach this account number to this person
//     this.props.setInstantPaymentAccountData({
//      account_number: data.data.accountnumber,
//      bank_name: data.data.bankname
//     });
//    })
//    .catch(err => {
//     // Display error modal
//     this.setState({
//      loading: false,
//      errorModal: true
//     });
//    });

//   // If the user has used the moethod before, it should not have them
//  };

//  deleteAccount = () => {
//   //  Delete Account
//   this.setState({ removing: true });
//   this.props.removeInstantPaymentAccount();
//  };

//  handleSubmit = event => {
//   event.preventDefault();

//   if (!this.formIsValid(this.state)) {
//    this.setState({ loading: false });
//    toast.error(`Amount is not valid`);
//    return;
//   }

//   if (+this.state.amount < 100) {
//    toast.error(`Minimum deposit is \u20a6${100}`);
//    this.setState({ loading: false });
//    return;
//   }

//   this.setState({ loading: true });

//   let reference = this.getReference();

//   const historyObject = {
//    amount: this.state.amount,
//    channel: "Bank Transfer",
//    transaction_date: new Date().toISOString(),
//    fees: "0",
//    reference: "--",
//    status: "--",
//    refId: `${this.props.playerData.PhoneNum}-${reference}`,
//    gateway: "Flutterwave",
//    made_by: this.props.playerData.PhoneNum
//   };

//   //   this.props.setDepositHistory(historyObject);

//   // Make request to Rave
//   const chargeData = {
//    seckey: "FLWSECK_TEST-98c53727b0776e98a1ad0e0dacc220f7-X",
//    narration: `CHOPBARH - ${this.props.playerData.NickName.toUpperCase()}`,
//    email: "chopbarh@mail.com",
//    is_permanent: true
//   };

//   fetch("https://api.ravepay.co/v2/banktransfers/accountnumbers", {
//    method: "POST",
//    headers: {
//     "Content-Type": "application/json"
//    },
//    body: JSON.stringify(chargeData)
//   })
//    .then(response => response.json())
//    .then(data => {
//     // Display the result in Modal
//     this.setState({
//      successModal: true,
//      paymentData: { ...data.data },
//      loading: false
//     });

//     //  Attach this account number to this person
//     this.props.setInstantPaymentAccountData({
//      account_number: data.data.accountnumber
//     });
//    })
//    .catch(err => {
//     // Display error modal
//     this.setState({ loading: false, errorModal: true });
//    });

//   // If the user has used the moethod before, it should not have them
//  };

//  render() {
//   return (
//    <>
//     {this.state.fetching ? (
//      <div className="text-center">
//       <Spinner />
//      </div>
//     ) : (
//      <>
//       {this.props.account !== null ? (
//        <>
//         <div className="text-center" style={{ minHeight: "5rem" }}>
//          <p>Please make Payment to the account number:</p>
//          <p>
//           Account Number: <strong>{this.props.account.account_number}</strong>
//          </p>
//          <p>
//           Bank Name: <strong>{this.props.account.bank_name}</strong>
//          </p>
//          <Button onClick={this.deleteAccount} disabled={this.state.removing}>
//           {this.state.removing ? "Deleting..." : "Delete Account"}
//          </Button>
//         </div>
//        </>
//       ) : (
//        <>
//         <Modal
//          isOpen={this.state.errorModal}
//          toggle={this.toggleErrorModal}
//          style={{
//           top: "50%",
//           transform: "translateY(-50%)"
//          }}
//         >
//          <ModalBody className="text-center p-4" style={{ minHeight: "9rem" }}>
//           <p className="mt-4">
//            There was an error while carrying out this action. Please try again
//            later
//           </p>
//          </ModalBody>
//         </Modal>
//         <Modal
//          isOpen={this.state.successModal}
//          toggle={this.toggleSuccessModal}
//          style={{
//           top: "50%",
//           transform: "translateY(-50%)"
//          }}
//         >
//          <ModalBody className="text-center p-4" style={{ minHeight: "12rem" }}>
//           <p className="mt-4">
//            Please take note of the information below. The account number
//            provided should be used for subsequent transactions that come through
//            this channel
//           </p>
//           <p>
//            Account Number:{" "}
//            <strong>{this.state.paymentData.accountnumber}</strong>
//           </p>
//           <p>
//            Bank Name: <strong>{this.state.paymentData.bankname}</strong>
//           </p>
//           <p>
//            Note: <strong>{this.state.paymentData.note}</strong>
//           </p>
//          </ModalBody>
//         </Modal>
//         <div className="text-center" style={{ minHeight: "5rem" }}>
//          <p>
//           This method gives you a custom account number through which you can
//           send subsequent transactions to in the future
//          </p>
//          <FormSubmitButton
//           type="submit"
//           className="mr-2"
//           disabled={this.state.loading}
//           onClick={this.makePayment}
//          >
//           <span>
//            {this.state.loading ? "Please wait..." : "Request Account Number"}
//           </span>
//          </FormSubmitButton>
//         </div>
//        </>
//       )}
//      </>
//     )}
//    </>
//   );
//  }
// }

// const mapStateToProps = state => ({
//  playerData: state.player.playerData,
//  account: state.instantPayment.account
// });

// const mapDispatchToProps = {
//  setDepositHistory,
//  fetchInstantPaymentAccountData,
//  setInstantPaymentAccountData,
//  removeInstantPaymentAccount
// };

// export default connect(
//  mapStateToProps,
//  mapDispatchToProps
// )(InstantPayment);

import React, { Component } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { connect } from "react-redux";
import { Form, FormItem, FormSubmitButton } from "../../../styles/CardCharge";
import { setDepositHistory } from "../../../../store/actions/depositActions";

import "react-accessible-accordion/dist/fancy-example.css";

const FormWrapper = styled(Form)`
 min-height: 15rem;
`;

class InstantPayment extends Component {
 state = {
  key: "FLWPUBK-c5932c92f9633277760b44c1faf57207-X",
  email: "chopbarh@mail.com",
  amount: ""
 };

 // FLWPUBK-c5932c92f9633277760b44c1faf57207-X

 getReference = () => {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < 10; i++)
   text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
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

  this.props.setDepositHistory(historyObject);

  window.getpaidSetup({
   PBFPubKey: this.state.key,
   customer_email:
    this.props.playerData.Email || `${this.props.playerData.PhoneNum}@mail.com`,
   customer_firstname:
    this.props.playerData.FullName.split(" ")[0] || "Chopbarh",
   customer_lastname:
    this.props.playerData.FullName.split(" ")[1] ||
    `${this.props.playerData.PhoneNum}`,
   amount: Number(this.state.amount),
   customer_phone: this.props.playerData.PhoneNum,
   country: "NG",
   currency: "NGN",
   txref: `${this.props.playerData.PhoneNum}-${reference}`,
   // redirect_url: "https://www.chopbarh.com/user",
   onclose: function() {},
   callback: async response => {
    let flw_ref = response.tx.txRef;
    console.log("This is the response returned after a charge", response);
    if (
     response.tx.chargeResponseCode == "00" ||
     response.tx.chargeResponseCode == "0"
    ) {
     // window.location = `https://SimultaneousSarcasticArchitecture--dotunalukosprin.repl.co/api/rave?ref=${flw_ref}`;
     const response = await fetch(
      `https://SimultaneousSarcasticArchitecture.dotunalukosprin.repl.co/ng/api/rave`,
      {
       method: "POST",
       headers: {
        "Content-Type": "application/json"
       },
       body: JSON.stringify({
        ref: flw_ref
       })
      }
     );
     // redirect to a success page
     // window.open("https://www.chopbarh.com/user");
     // window.open("localhost:3000/user");
    } else {
     // redirect to a failure page.
     // window.open("https://www.chopbarh.com/user");
     // window.open("localhost:3000/user");
    }
   }
  });
 };

 render() {
  return (
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
  );
 }
}

const mapStateToProps = state => ({
 playerData: state.player.playerData
});

const mapDispatchToProps = {
 setDepositHistory
};

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(InstantPayment);
