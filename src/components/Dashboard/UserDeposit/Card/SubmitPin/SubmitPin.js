import React, { Component, memo } from "react";
import { withRouter } from "react-router";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  Form,
  FormItem,
  FormSubmitButton
} from "../../../../styles/CardCharge";
import {
  openOTPModal,
  closeOTPModal,
  openPinModal,
  closePinModal,
  openPhoneModal,
  closePhoneModal
} from "../../../../../store/actions/modalActions";
import { setCoinBalance } from "../../../../../store/actions/coinBalanceActions";
import { setDepositHistory } from "../../../../../store/actions/depositActions";
import {
  setCreditCardData,
  fetchCreditCardData
} from "../../../../../store/actions/creditCardActions";

class SubmitPin extends Component {
  state = {
    pin: "",
    loading: false
  };

  formIsValid = ({ pin }) => {
    if (!isNaN(pin) !== true || pin.length !== 4) {
      return false;
    }
    return true;
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (!this.formIsValid(this.state)) {
      this.setState({ loading: false });
      // Handle Error
      return;
    }

    const postData = {
      pin: this.state.pin,
      reference: this.props.reference
    };

    try {
      const response = await fetch(
        "https://api.paystack.co/charge/submit_pin",
        {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: `Bearer sk_live_f46f17bcba5eefbb48baabe5f54d10e67c90e83a`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(postData)
        }
      );

      const data = await response.json();
      this.setState({ loading: false });
      if (data.data.status === "send_otp") {
        this.props.closePinModal();
        this.props.openOTPModal();
      } else if (data.data.status === "send_phone") {
        this.props.closePinModal();
        this.props.openPhoneModal();
      }else if (data.data.status === "open_url") {
        this.props.closePinModal();
        window.open(data.data.url, "_blank");
      } else if (data.data.status === "success") {
        this.props.closePinModal();
        toast.info("Transaction is processing");
        const payload = {
          ...data.data.authorization,
          cvv: this.props.cvv
        };
        // const historyObject = {
        //   ...data.data,
        //   fees: +data.data.amount / 100 < 2500 ? 0 : 100
        // };
        // const value = +data.data.amount / 100;
        // this.props.setDepositHistory(historyObject);
        // this.props.setCoinBalance(value);
        this.props.setCreditCardData(payload);
      } else {
        this.props.closePinModal();
        toast.error(`Please try again`);
      }
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
      toast.error(`Something went wrong`);
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.state.loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            className="mt-5"
          >
            <Spinner />
          </div>
        ) : (
          <>
            <FormItem>
              <label>Enter Pin</label>
              <input
                type="password"
                name="pin"
                value={this.state.pin}
                onChange={this.handleInputChange}
                required
                placeholder="Pin"
              />
            </FormItem>
            <FormSubmitButton
              type="submit"
              className="mr-2"
              disabled={this.state.loading}
            >
              <span>{this.state.loading ? "Processing..." : "Submit"}</span>
            </FormSubmitButton>
          </>
        )}
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  reference: state.charge.reference,
  loading: state.coinBalance.loading,
  cvv: state.creditCard.cvv
});

const mapDispatchToProps = {
  openOTPModal,
  closeOTPModal,
  openPinModal,
  closePinModal,
  openPhoneModal,
  closePhoneModal,
  setCoinBalance,
  setDepositHistory,
  setCreditCardData,
  fetchCreditCardData
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(memo(SubmitPin))
);
