import React, { Component, memo } from "react";
import { withRouter } from "react-router";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { FormItem, FormSubmitButton } from "../../../../styles/CardCharge";
import {
  openOTPModal,
  closeOTPModal,
  openPinModal,
  closePinModal,
  openPhoneModal,
  closePhoneModal,
  openCardPinModal,
  closeCardPinModal,
  openCardOTPModal,
  closeCardOTPModal,
  openCardPhoneModal,
  closeCardPhoneModal,
  openCardBirthdayModal,
  closeCardBirthdayModal,
} from "../../../../../store/actions/modalActions";
import {
  setCreditCardData,
  fetchCreditCardData,
} from "../../../../../store/actions/creditCardActions";

const Form = styled.form`
  min-height: 12rem;
`;

// sk_live_f46f17bcba5eefbb48baabe5f54d10e67c90e83a
class SubmitPin extends Component {
  state = {
    pin: "",
    loading: false,
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
      reference: this.props.reference,
    };

    try {
      const submitPinResponse = await fetch(
        "http://us-central1-dev-sample-31348.cloudfunctions.net/paystackchargeresolvers/player/deposit/submit_pin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-api-key": process.env.REACT_APP_FUNCTIONS_API_KEY,
          },
          body: JSON.stringify(postData),
        }
      );

      const data = await submitPinResponse.json();

      console.log(data);

      this.setState({ loading: false });
      if (data.status === true) {
        if (data.data.status === "send_otp") {
          this.props.closeCardPinModal();
          this.props.openCardOTPModal();
        } else if (data.data.status === "send_phone") {
          this.props.closeCardPinModal();
          this.props.openCardPhoneModal();
        } else if (data.data.status === "open_url") {
          this.props.closeCardPinModal();
          window.open(data.data.url, "_self");
        } else if (data.data.status === "success") {
          this.props.closeCardPinModal();
          toast.info("Transaction is processing");
        } else {
          this.props.closeCardPinModal();
          toast.error(`Please try again`);
        }
      } else {
        this.props.closeCardPinModal();
        toast.error(`Transaction Declined`);
      }
    } catch (err) {
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
              alignItems: "center",
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
  cvv: state.creditCard.cvv,
});

const mapDispatchToProps = {
  openOTPModal,
  closeOTPModal,
  openPinModal,
  closePinModal,
  openPhoneModal,
  closePhoneModal,
  setCreditCardData,
  fetchCreditCardData,

  openCardPinModal,
  closeCardPinModal,
  openCardOTPModal,
  closeCardOTPModal,
  openCardPhoneModal,
  closeCardPhoneModal,
  openCardBirthdayModal,
  closeCardBirthdayModal,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(memo(SubmitPin))
);
