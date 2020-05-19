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
      const response = await fetch(
        "https://api.paystack.co/charge/submit_phone",
        {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: `Bearer sk_live_f46f17bcba5eefbb48baabe5f54d10e67c90e83a`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      const data = await response.json();
      if (data.data.status === "success") {
        // Verify payment before adding
        this.props.closeOTPModal();
        this.setState({ loading: false });
        toast.info(`Transaction is processing`);
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
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(memo(SubmitPhone))
);
