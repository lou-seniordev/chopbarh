import React, { Component } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Modal, ModalBody, Spinner, Button } from "reactstrap";
import { FormSubmitButton } from "../../../styles/CardCharge";
import { firestore } from "../../../../firebase";

import "react-accessible-accordion/dist/fancy-example.css";

class MonnifyPaymentAccount extends Component {
  state = {
    loading: true,
    isRequestingAccount: false,
    error: false,
    emptyDataState: false,
    paymentAccountData: null,
    isRequestSuccessful: false,
    deactivatingAccount: false,
  };

  componentDidMount = () => {
    this.fetchPaymentAccount();
  };

  getReference = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 25; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };

  fetchPaymentAccount = async () => {
    this.setState({
      loading: true,
      emptyDataState: false,
      paymentAccountData: null,
    });

    try {
      let snapshots = await firestore
        .collection("monnify_payment_account")
        .where("playerId", "==", this.props.playerData.PlayerID)
        .get();

      let data = snapshots.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      if (data.length) {
        this.setState({ loading: false, paymentAccountData: data[0] });
      } else {
        this.setState({ emptyDataState: true, loading: false });
      }
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  };

  requestPaymentAccount = async () => {
    this.setState({ isRequestingAccount: true });
    // Make request to get an Account
    const postData = {
      phonenumber: this.props.playerData.PhoneNum,
      firstname: `${this.props.playerData.PhoneNum}`,
      lastname: `${this.props.playerData.PhoneNum}`,
      nickname: `${this.props.playerData.NickName.toUpperCase()}`,
      playerId: `${this.props.playerData.PlayerID}`,
    };

    fetch(
      "https://us-central1-dev-sample-31348.cloudfunctions.net/monnifydedicatedaccount/player/request/dedicated/account",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data.status === true) {
          this.fetchPaymentAccount();

          this.setState({
            isRequestSuccessful: true,
            isRequestingAccount: false,
          });
          toast.success("Payment Account Request was Successful");
        } else {
          this.setState({
            isRequestSuccessful: false,
            isRequestingAccount: false,
          });
          toast.error("Payment Account Request was not Successful");
        }
      })
      .catch(err => {
        // Display error modal
        this.setState({
          isRequestingAccount: false,
        });
        toast.error("An error occured while processing the request");
      });
  };

  deactivatePaymentAccount = async () => {
    this.setState({ deactivatingAccount: true });

    try {
      const accountDeactivationResponse = await (
        await fetch("https://backend.chopbarh.com/api/accounts/payment", {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "api-key": process.env.REACT_APP_API_KEY_PROD,
          },
          body: JSON.stringify({
            account_number: this.state.paymentAccountData.account_number,
            playerId: this.state.paymentAccountData.playerId,
          }),
        })
      ).json();

      if (accountDeactivationResponse.status === true) {
        await firestore
          .collection("monnify_payment_account")
          .doc(this.state.paymentAccountData.id)
          .delete();
        this.setState({ deactivatingAccount: false });
        toast.success("Your account was successfully deactivated");
        this.fetchPaymentAccount();
      } else {
        this.setState({ deactivatingAccount: false });
        toast.error("Your account was not successfully deactivated");
      }
    } catch (error) {
      this.setState({ deactivatingAccount: false });
      toast.error("An error occured while deactivating your account");
    }
  };

  render() {
    return (
      <>
        {this.state.loading && (
          <div className="text-center">
            <Spinner />
          </div>
        )}
        {!this.state.loading && this.state.error && (
          <div className="text-center">
            An error occurred while fetching your account. Please try again
            later.
          </div>
        )}
        {!this.state.loading && this.state.emptyDataState && (
          <div className="text-center" style={{ minHeight: "6rem" }}>
            <p>
              This method gives you a custom account number through which you
              can send subsequent transactions to in the future
            </p>
            <FormSubmitButton
              type="submit"
              className="mr-2"
              disabled={this.state.isRequestingAccount}
              onClick={this.requestPaymentAccount}
            >
              <span>
                {this.state.isRequestingAccount
                  ? "Please wait..."
                  : "Request Account Number"}
              </span>
            </FormSubmitButton>
          </div>
        )}
        {!this.state.loading && this.state.paymentAccountData && (
          <div className="text-center" style={{ minHeight: "5rem" }}>
            {/* <div
              className="mb-2"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "3rem",
              }}
            >
              <Button
                onClick={this.deactivatePaymentAccount}
                disabled={this.state.deactivatingAccount}
              >
                {this.state.deactivatingAccount ? "Deleting..." : "X"}
              </Button>
            </div> */}
            <p>
              Please make Payment and save the Account Number created for you
            </p>
            <p>
              You can use this account multiple times. All deposits to this
              accounts will be automatically credited to your chopbarh
            </p>
            <p>
              Account Number:{" "}
              <strong>{this.state.paymentAccountData.account_number}</strong>
            </p>
            <p>
              Bank Name:{" "}
              <strong>{this.state.paymentAccountData.bank_name}</strong>
            </p>
            <p>
              Funds Will be Automatically credited to your chopbarh account
              within 30 minutes to 1 hour of successful deposit.
              <br />
              However deposits could take up to 24 hours due to occasional
              banking delays.
            </p>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  playerData: state.player.playerData,
  account: state.instantPayment.account,
  error: state.instantPayment.error,
  loading: state.instantPayment.loading,
});

export default connect(mapStateToProps)(MonnifyPaymentAccount);
