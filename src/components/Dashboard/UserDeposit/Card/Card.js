import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, Spinner } from "reactstrap";
import { Form, FormItem, HalfColumn } from "../../../styles/CardCharge";
//import SubmitOTP from "../BankCharge/SubmitOTP/SubmitOTP";

class Card extends Component {
  state = {
    loading: false,
    formErrorModal: false,
    successModal: false,
    referenceValue: null,
    amount: "",
    card: "",
    expiry: "",
    cvv: "",
    pin: ""
  };

  formErrorModalToggle = () => {
    this.setState({ formErrorModal: !this.state.formErrorModal });
  };

  successModalToggle = () => {
    this.setState({ successModal: !this.state.successModal });
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });

    // console.log(formState);
    // if (Object.keys(formState.errors).length > 0) {
    //   setLoading(false);
    //   setFormErrorModal(true);
    //   return;
    // }

    // const cardExpirationData = formState.values.card_expiry.split("/");

    // const postData = {
    //   email: "somebody@nice.com",
    //   amount: formState.values.amount * 100,
    //   card: {
    //     number: formState.values.card_number,
    //     cvv: formState.values.cvv,
    //     expiry_month: cardExpirationData[0],
    //     expiry_year: cardExpirationData[1]
    //   },
    //   pin: formState.values.pin
    // };

    // const response = await fetch("https://api.paystack.co/charge", {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     Authorization: `Bearer sk_test_c644c86e3b42191b981bbc1c263f98c7020c9841`,
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(postData)
    // });
    // const data = await response.json();
    // setReferenceValue(data.data.reference);
    // increaseCoinBalance(+data.data.amount / 100)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     setLoading(false);
    //   });
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.state.formErrorModal}
          toggle={this.formErrorModalToggle}
          className="pt-5 mt-4"
        >
          <ModalBody className="text-center">
            <h2>Ooops!</h2>
            <p>Something went wrong. Please try again</p>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.successModal}
          toggle={this.successModalToggle}
          className="pt-5 mt-4"
        >
          <ModalBody className="text-center">
            <h2>Transaction Successful</h2>
            <p>We'll confirm your payment shortly</p>
          </ModalBody>
        </Modal>
        {this.state.loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "30rem"
            }}
            className="mt-5"
          >
            <Spinner />
          </div>
        ) : (
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              <label>Amount</label>
              <input
                type="text"
                onChange={this.handleInputChange}
                name="amount"
                value={this.state.amount}
                required
                placeholder="100"
              />
            </FormItem>
            <HalfColumn>
              <FormItem className="mr-3">
                <label>Card Number</label>
                <input
                  type="text"
                  onChange={this.handleInputChange}
                  name="card"
                  value={this.state.card}
                  required
                  placeholder="5078982018301145"
                />
              </FormItem>
              <FormItem>
                <label>Expiry</label>
                <input
                  type="text"
                  onChange={this.handleInputChange}
                  name="expiry"
                  value={this.state.expiry}
                  required
                  placeholder="MM/YY"
                />
              </FormItem>
            </HalfColumn>
            <HalfColumn>
              <FormItem className="mr-3">
                <label>CVV</label>
                <input
                  type="text"
                  onChange={this.handleInputChange}
                  name="cvv"
                  value={this.state.cvv}
                  required
                  placeholder="***"
                />
              </FormItem>
              <FormItem>
                <label>Pin</label>
                <input
                  type="text"
                  onChange={this.handleInputChange}
                  name="pin"
                  value={this.state.pin}
                  required
                  placeholder="****"
                  minLength="4"
                  maxLength="4"
                />
              </FormItem>
            </HalfColumn>
            <button type="submit" className="mr-2">
              <span>Load</span>
            </button>
          </Form>
        )}
      </>
    );
  }
}

const mapDispatchToProps = {};

export default connect(
  null,
  mapDispatchToProps
)(Card);
