import React, { Component, memo } from "react";
import { withRouter } from "react-router";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Form, FormItem } from "../../../../styles/CardCharge";
import {
  openOTPModal,
  closeOTPModal,
  openPinModal,
  closePinModal
} from "../../../../../store/actions/modalActions";
import { setCoinBalance } from "../../../../../store/actions/coinBalanceActions";

class SubmitPhone extends Component {
  state = {
    phone: "",
    loading: false
  };

  formIsValid = ({ phone }) => {
    if (!isNaN(phone) !== true || phone.length !== 11) {
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
      reference: this.props.reference
    };

    try {
      const response = await fetch(
        "https://api.paystack.co/charge/submit_pin",
        {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: `Bearer sk_test_c644c86e3b42191b981bbc1c263f98c7020c9841`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(postData)
        }
      );

      const data = await response.json();
      console.log(data);
      this.setState({ loading: false });
      if (data.data.status === "send_otp") {
        this.props.closePinModal();
        this.props.openOTPModal();
      } else if (data.data.status === "success") {
        this.props.closePinModal();
        toast.success("Transaction was successful");
        const value = +data.data.amount / 100;
        this.props.setCoinBalance(value);
      } else {
        this.props.closePinModal();
        toast.error(`Please try again`);
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
              <label>Enter Phone Number</label>
              <input
                type="password"
                name="phone"
                value={this.state.phone}
                onChange={this.handleInputChange}
                required
                placeholder="Phone Number"
              />
            </FormItem>
            <button
              type="submit"
              className="mr-2"
              disabled={this.state.loading}
            >
              <span>{this.state.loading ? "Processing..." : "Submit"}</span>
            </button>
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
  openOTPModal,
  closeOTPModal,
  openPinModal,
  closePinModal,
  setCoinBalance
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(memo(SubmitPhone))
);
