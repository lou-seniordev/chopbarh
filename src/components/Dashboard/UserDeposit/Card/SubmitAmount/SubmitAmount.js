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

class SubmitAmount extends Component {
  state = {
    amount: "",
    loading: false
  };

  formIsValid = ({ amount }) => {
    if (!isNaN(amount) !== true) {
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
      email: `${this.props.playerData.PhoneNum}@mail.com`,
      amount: this.state.amount * 100,
      authorization_code: this.props.auth_code
    };

    try {
      const response = await fetch("https://api.paystack.co/charge/", {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `Bearer sk_test_c644c86e3b42191b981bbc1c263f98c7020c9841`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });

      const data = await response.json();
      if (data.data.status === "success") {
        this.setState({ loading: false });
        this.props.close();
        toast.success(`Transaction was successful`);
        const value = +data.data.amount / 100;
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
              <label>Enter Amount</label>
              <input
                type="text"
                name="amount"
                value={this.state.amount}
                onChange={this.handleInputChange}
                min="0"
                required
                placeholder="Amount"
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
  playerData: state.player.playerData
});

const mapDispatchToProps = {
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(memo(SubmitAmount))
);
