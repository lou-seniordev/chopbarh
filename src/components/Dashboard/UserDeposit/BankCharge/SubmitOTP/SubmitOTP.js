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
import { setCoinBalance } from "../../../../../store/actions/coinBalanceActions";
import {
  openOTPModal,
  closeOTPModal
} from "../../../../../store/actions/modalActions";
import { setDepositHistory } from "../../../../../store/actions/depositActions";
import { setBankAccountData } from "../../../../../store/actions/bankAccountActions";

class SubmitOTP extends Component {
  state = {
    otp: "",
    loading: false
  };

  formIsValid = ({ otp }) => {
    if (!isNaN(otp) !== true || otp.length !== 6) {
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
      otp: this.state.otp,
      reference: this.props.reference
    };

    try {
      const response = await fetch(
        "https://api.paystack.co/charge/submit_otp",
        {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: `Bearer sk_live_f46f17bcba5eefbb48baabe5f54d10e67c90e83a `,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(postData)
        }
      );

      const data = await response.json();
      if (data.data.status === "success") {
        // Verify payment before adding
        this.props.closeOTPModal();
        this.setState({ loading: false });
        toast.info(`Transaction is processing`);
        // const value = +data.data.amount / 100;
        // this.props.setBankAccountData(data.data.authorization);
        // this.props.setDepositHistory(data.data);
        // this.props.setCoinBalance(value);
      } else if (data.data.status === "open_url") {
        this.props.closePinModal();
        window.open(data.data.url, "_self");
      } else {
        toast.error(`Please try again`);
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
              alignItems: "center"
            }}
            className="mt-5"
          >
            <Spinner />
          </div>
        ) : (
          <>
            <FormItem>
              <label>Enter OTP</label>
              <input
                type="text"
                name="otp"
                value={this.state.otp}
                onChange={this.handleInputChange}
                min="0"
                required
                placeholder="OTP"
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
  loading: state.coinBalance.loading
});

const mapDispatchToProps = {
  setCoinBalance,
  openOTPModal,
  setDepositHistory,
  setBankAccountData,
  closeOTPModal
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(memo(SubmitOTP))
);
