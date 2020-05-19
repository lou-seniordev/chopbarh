import React, { Component } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Modal, ModalBody, Spinner, Button } from "reactstrap";
import { FormSubmitButton } from "../../../styles/CardCharge";
import {
  fetchInstantPaymentAccountData,
  setInstantPaymentAccountData,
  removeInstantPaymentAccount,
} from "../../../../store/actions/instantPaymentActions";

import "react-accessible-accordion/dist/fancy-example.css";

class InstantPayment extends Component {
  state = {
    key: "FLWPUBK-c5932c92f9633277760b44c1faf57207-X",
    email: "chopbarh@mail.com",
    amount: "",
    account_active: false,
    fetching: true,
    loading: false,
    successModal: false,
    errorModal: false,
    paymentData: {
      accountnumber: null,
      note: null,
    },
    removing: false,
  };

  componentDidMount = () => {
    this.props.fetchInstantPaymentAccountData();
  };

  componentDidUpdate = (prevProps) => {
    if (this.props !== prevProps) {
      this.setState({ fetching: false });
    }
  };

  getReference = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 25; i++)
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

  makePayment = async () => {
    this.setState({ loading: true });
    // Make request to Rave
    const chargeData = {
      seckey: "FLWSECK-6a2153446d5f15349075c71f591f9290-X",
      narration: `CHOPBARH - ${this.props.playerData.NickName.toUpperCase()}`,
      email: `${this.props.playerData.PhoneNum}@mail.com`,
      is_permanent: true,
      txRef: `${this.props.playerData.PhoneNum}-${this.getReference()}`,
      phonenumber: this.props.playerData.PhoneNum,
      firstname: `${this.props.playerData.PhoneNum}`,
      lastname: `${this.props.playerData.PhoneNum}`,
    };

    fetch("https://api.ravepay.co/v2/banktransfers/accountnumbers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chargeData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the result in Modal
        this.setState({
          successModal: true,
          paymentData: { ...data.data },
          loading: false,
        });

        //  Attach this account number to this person
        this.props.setInstantPaymentAccountData({
          account_number: data.data.accountnumber,
          bank_name: data.data.bankname,
        });
      })
      .catch((err) => {
        // Display error modal
        this.setState({
          loading: false,
          errorModal: true,
        });
      });

    // If the user has used the moethod before, it should not have them
  };

  deleteAccount = () => {
    //  Delete Account
    this.setState({ removing: true });
    this.props.removeInstantPaymentAccount();
  };

  handleSubmit = (event) => {
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

    // Make request to Rave
    const chargeData = {
      seckey: "FLWSECK_TEST-98c53727b0776e98a1ad0e0dacc220f7-X",
      narration: `CHOPBARH - ${this.props.playerData.NickName.toUpperCase()}`,
      email: "chopbarh@mail.com",
      is_permanent: true,
    };

    fetch("https://api.ravepay.co/v2/banktransfers/accountnumbers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chargeData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the result in Modal
        this.setState({
          successModal: true,
          paymentData: { ...data.data },
          loading: false,
        });

        //  Attach this account number to this person
        this.props.setInstantPaymentAccountData({
          account_number: data.data.accountnumber,
        });
      })
      .catch((err) => {
        // Display error modal
        this.setState({ loading: false, errorModal: true });
      });

    // If the user has used the moethod before, it should not have them
  };

  render() {
    return (
      <>
        {this.state.fetching ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : (
          <>
            {this.props.account !== null ? (
              <>
                <div className="text-center" style={{ minHeight: "5rem" }}>
                  <div
                    className="mb-2"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginRight: "3rem",
                    }}
                  >
                    <Button
                      onClick={this.deleteAccount}
                      disabled={this.state.removing}
                    >
                      {this.state.removing ? "Deleting..." : "X"}
                    </Button>
                  </div>
                  <p>
                    Please make Payment and save the Wema Account Number created
                    for you
                  </p>
                  <p>
                    You can use this account multiple times. All deposits to
                    this accounts will be automatically credited to your
                    chopbarh
                  </p>
                  <p>
                    Account Number:{" "}
                    <strong>{this.props.account.account_number}</strong>
                  </p>
                  <p>
                    Bank Name: <strong>{this.props.account.bank_name}</strong>
                  </p>
                  <p>
                    Funds Will be Automatically credited to your chopbarh
                    account within 2-5 minutes of successful deposit
                  </p>
                </div>
              </>
            ) : (
              <>
                <Modal
                  isOpen={this.state.errorModal}
                  toggle={this.toggleErrorModal}
                  style={{
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <ModalBody
                    className="text-center p-4"
                    style={{ minHeight: "9rem" }}
                  >
                    <p className="mt-4">
                      There was an error while carrying out this action. Please
                      try again later
                    </p>
                  </ModalBody>
                </Modal>
                <Modal
                  isOpen={this.state.successModal}
                  toggle={this.toggleSuccessModal}
                  style={{
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <ModalBody
                    className="text-center p-4"
                    style={{ minHeight: "12rem" }}
                  >
                    <p className="mt-4">
                      Please take note of the information below. The account
                      number provided should be used for subsequent transactions
                      that come through this channel
                    </p>
                    <p>
                      Account Number:{" "}
                      <strong>{this.state.paymentData.accountnumber}</strong>
                    </p>
                    <p>
                      Bank Name:{" "}
                      <strong>{this.state.paymentData.bankname}</strong>
                    </p>
                    <p>
                      Note: <strong>{this.state.paymentData.note}</strong>
                    </p>
                  </ModalBody>
                </Modal>
                <div className="text-center" style={{ minHeight: "6rem" }}>
                  <p>
                    This method gives you a custom account number through which
                    you can send subsequent transactions to in the future
                  </p>
                  <FormSubmitButton
                    type="submit"
                    className="mr-2"
                    disabled={this.state.loading}
                    onClick={this.makePayment}
                  >
                    <span>
                      {this.state.loading
                        ? "Please wait..."
                        : "Request Account Number"}
                    </span>
                  </FormSubmitButton>
                </div>
              </>
            )}
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(InstantPayment);
