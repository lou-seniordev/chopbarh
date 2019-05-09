import React, { Component } from "react";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import { Form, FormItem } from "../../../../styles/CardCharge";
//import { increaseCoinBalance } from "../../../lib/increaseCoinBalance";

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

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (!this.formIsValid(this.state)) {
      this.setState({ loading: true });
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
            Authorization: `Bearer sk_test_c644c86e3b42191b981bbc1c263f98c7020c9841`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(postData)
        }
      );

      const data = await response.json();
      console.log(data);
      const value = +data.data.amount / 100;
      //   increaseCoinBalance(+data.data.amount / 100)
      //     .then(response => response.json())
      //     .then(data => {
      //       console.log(data);
      //       setCoinValue(value / 100);
      //       setLoading(false);
      //     })
      //     .catch(err => {
      //       console.log(err);
      //       setLoading(false);
      //     });
    } catch (err) {
      console.log(err);
      setLoading(false);
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
            <button type="submit" className="mr-2">
              <span>Submit</span>
            </button>
          </>
        )}
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  reference: state.charge.reference
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitOTP);
