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
  openPhoneModal,
  closeBirthdayModal
} from "../../../../../store/actions/modalActions";

class SubmitBirthday extends Component {
  state = {
    birthday: "",
    loading: false
  };

  // formIsValid = ({ otp }) => {
  //   if (!isNaN(otp) !== true) {
  //     return false;
  //   }
  //   return true;
  // };

  getDate = date => {
    const month =
      Number(
        new Date(
          date
            .split("/")
            .reverse()
            .join("/")
        ).getMonth()
      ) + 1;
    return `${new Date(
      date
        .split("/")
        .reverse()
        .join("/")
    ).getFullYear()}-0${month}-${new Date(
      date
        .split("/")
        .reverse()
        .join("/")
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
      reference: this.props.reference
    };

    try {
      const response = await fetch(
        "https://api.paystack.co/charge/submit_birthday",
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
      if (data.data.status === "success") {
        // Verify payment before adding
        this.props.closeBirthdayModal();
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
              alignItems: "center"
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
  reference: state.charge.reference
});

const mapDispatchToProps = {
  openOTPModal,
  closeOTPModal,
  closeBirthdayModal
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(memo(SubmitBirthday))
);
