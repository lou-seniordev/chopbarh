import React, { Component, memo } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { FormItem, FormSubmitButton } from "../../../../styles/CardCharge";
import {
  openOTPModal,
  closeOTPModal,
  openBankOTPModal,
  closeBankOTPModal,
  closeBankPhoneModal,
} from "../../../../../store/actions/modalActions";

const Form = styled.form`
  min-height: 12rem;
`;

class SubmitPhone extends Component {
  state = {
    phone: "",
    loading: false,
  };

  formIsValid = ({ phone }) => {
    if (!isNaN(phone) !== true) {
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
      phone: this.state.phone,
      reference: this.props.reference,
    };

    try {
      const submitPhoneResponse = await fetch(
        "http://localhost:5000/dev-sample-31348/us-central1/paystackchargeresolvers/player/deposit/submit_phone",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-api-key": process.env.REACT_APP_FUNCTIONS_API_KEY,
          },
          body: JSON.stringify(postData),
        }
      );

      const data = await submitPhoneResponse.json();

      if (data.status === true) {
        if (data.data.status === "success") {
          this.setState({ loading: false });
          toast.info(`Transaction is processing`);
        } else if (data.data.status === "open_url") {
          window.open(data.data.url, "_self");
        } else if (data.data.status === "send_otp") {
          this.props.closeBankPhoneModal();
          this.props.openBankOTPModal();
        } else {
          toast.error(`Please try again`);
          this.setState({ loading: false });
        }
      } else {
        toast.error(`Transaction Declined`);
        this.setState({ loading: false });
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
              <label>Enter Phone</label>
              <input
                type="text"
                name="phone"
                value={this.state.phone}
                onChange={this.handleInputChange}
                required
                placeholder="Phone Number"
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
});

const mapDispatchToProps = {
  openOTPModal,
  closeOTPModal,

  openBankOTPModal,
  closeBankOTPModal,
  closeBankPhoneModal,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(memo(SubmitPhone))
);
