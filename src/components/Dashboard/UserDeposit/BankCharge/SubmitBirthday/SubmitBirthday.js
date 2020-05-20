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
  openPhoneModal,
  closeBirthdayModal,
  openBankOTPModal,
  closeBankOTPModal,
  openBankPhoneModal,
  closeBankBirthdayModal,
} from "../../../../../store/actions/modalActions";

const Form = styled.form`
  min-height: 12rem;
`;

class SubmitBirthday extends Component {
  state = {
    birthday: "",
    loading: false,
  };

  // formIsValid = ({ otp }) => {
  //   if (!isNaN(otp) !== true) {
  //     return false;
  //   }
  //   return true;
  // };

  getDate = date => {
    const month =
      Number(new Date(date.split("/").reverse().join("/")).getMonth()) + 1;
    return `${new Date(
      date.split("/").reverse().join("/")
    ).getFullYear()}-0${month}-${new Date(
      date.split("/").reverse().join("/")
    ).getDate()}`;
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });

    const postData = {
      birthday: this.getDate(this.state.birthday),
      reference: this.props.reference,
    };

    try {
      const submitBirthdayResponse = await fetch(
        "https://us-central1-dev-sample-31348.cloudfunctions.net/paystackchargeresolvers/player/deposit/submit_birthday",
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

      const data = await submitBirthdayResponse.json();

      if (data.status === true) {
        if (data.data.status === "success") {
          this.props.closeBankBirthdayModal();
          this.setState({ loading: false });
          toast.info(`Transaction is processing`);
        } else if (data.data.status === "send_otp") {
          this.props.closeBankBirthdayModal();
          this.props.openBankOTPModal();
        } else if (data.data.status === "send_phone") {
          this.props.closeBankBirthdayModal();
          this.props.openBankPhoneModal();
        } else if (data.data.status === "open_url") {
          this.props.closePinModal();
          window.open(data.data.url, "_self");
        } else {
          this.props.closeBankBirthdayModal();
          toast.error(data.data.message);
          this.setState({ loading: false });
        }
      } else {
        this.props.closeBankBirthdayModal();
        toast.error("Transaction Declined");
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
              <label>Enter Birthday</label>
              <input
                type="date"
                name="birthday"
                value={this.state.birthday}
                onChange={this.handleInputChange}
                required
                placeholder="Birthday"
                max="2010-01-01"
              />
            </FormItem>
            <FormSubmitButton
              type="submit"
              className="mr-2"
              disabled={this.state.loading || this.state.birthday === ""}
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
  closeBirthdayModal,
  openPhoneModal,

  openBankOTPModal,
  closeBankOTPModal,
  openBankPhoneModal,
  closeBankBirthdayModal,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(memo(SubmitBirthday))
);
