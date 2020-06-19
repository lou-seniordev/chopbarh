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
  };

  componentDidMount = async () => {
    // Try to fetch the details from firestore
    try {
      let snapshots = await firestore
        .collection("monnify_payment_account")
        .where("playerId", "==", this.props.playerData.PlayerID)
        .get();

      let data = snapshots.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      console.log(data);
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  };

  getReference = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 25; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
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
      "https://us-central1-dev-sample-31348.cloudfunctions.net/raveinstantpayment/player/request/account",
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
        } else {
        }
      })
      .catch(err => {
        // Display error modal
        this.setState({
          isRequestingAccount: false,
          errorModal: true,
        });
      });
  };

  //   deleteAccount = () => {
  //     //  Delete Account
  //     this.setState({ removing: true });
  //     this.props.removeInstantPaymentAccount();
  //   };

  render() {
    return (
      <>
        {this.state.loading && (
          <div className="text-center">
            <Spinner />
          </div>
        )}
        {this.state.error &&
          !this.state.loading(
            <div className="text-center">
              An error occurred while fetching your account. Please try again
              later.
            </div>
          )}
        {this.state.emptyDataState &&
          !this.state.loading(
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

const mapDispatchToProps = {
  fetchInstantPaymentAccountData,
  setInstantPaymentAccountData,
  removeInstantPaymentAccount,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonnifyPaymentAccount);
