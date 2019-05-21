import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalBody } from "reactstrap";
import Header from "../../UI/Header/Header";
import {
  SignUpWrapper,
  Container,
  HeadingTwo,
  Form,
  FormItem,
  HalfColumn,
  LoginSignal
} from "../../styles/SignUpStyles";
import keys from "../../../config/keys";
import {
  authStart,
  authSuccess,
  authFail,
  authOTPGenerator
} from "../Login/actions/LoginActions";

class SignUp extends Component {
  state = {
    isOpen: false,
    otpModal: false,
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: "",
    loading: false,
    otpLoading: false
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggleOTPModal = () => {
    this.setState({ otpModal: !this.state.otpModal });
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  formIsValid = ({ name, phone, password, confirmPassword }) => {
    if (
      name.trim() === "" ||
      !isNaN(phone) !== true ||
      password.length !== 4 ||
      password.toLowerCase() !== confirmPassword.toLowerCase()
    ) {
      return false;
    }
    return true;
  };

  generateOTP = () => {
    return Math.floor(111111 + Math.random() * 999999);
  };

  isOTPValid = otp => {
    if (otp.trim() === "" || !isNaN(otp) !== true || otp.length !== 6) {
      return false;
    }
    return true;
  };

  handleOTPSubmit = event => {
    event.preventDefault();
    this.setState({ otpLoading: true });

    if (!this.isOTPValid(this.state.otp)) {
      this.setState({ otpModal: false, isOpen: true });
      return;
    }

    if (+this.state.otp !== this.props.otp) {
      this.setState({ otpModal: false, isOpen: true });
      return;
    }

    const newState = { ...this.state };
    const formState = {
      userName: newState.phone,
      password: newState.password,
      displayName: newState.name
    };

    formState["@class"] = ".RegistrationRequest";
    const formValue = JSON.stringify(formState);

    // console.log(formValue, formState);
    fetch(
      `https://${keys.apiKeyPrefix}.gamesparks.net/rs/debug/${
        keys.apiKeySuffix
      }/RegistrationRequest`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: formValue
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data.authToken) {
          localStorage.setItem("chopbarh-token:live", data.authToken);
          localStorage.setItem("chopbarh-id:live", data.userId);
          this.props.authSuccess(data.authToken, data.userId);
          this.setState({ otpModal: false });
          this.props.history.push("/user");
        } else {
          this.setState({ isOpen: true, otpModal: false });
          this.props.authFail();
        }
      })
      .catch(err => {
        this.props.authFail();
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (!this.formIsValid(this.state)) {
      this.setState({ isOpen: true });
      return;
    }

    // Generate six digits OTP
    const otp = this.generateOTP();

    const postData = {
      to: this.state.phone,
      message: `Your OTP for ChopBarh is ${otp}`,
      channel: "0001"
    };

    // Send the message
    // https://cors-anywhere.herokuapp.com/
    fetch(
      "https://v2.sling.com.ng/api/v1/send-sms",
      {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer sling_yf0sdglyznon7vzinojcjf7qy1oqw6xsz6x1mh5wbibjoer0dfpyiy"
        },
        body: JSON.stringify(postData)
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data.credit_used === 1) {
          this.props.authOTPGenerator(otp);
          this.setState({ loading: false, otpModal: true });
        } else {
          this.setState({ loading: false });
        }
      });

    // this.props.authStart();
  };
  render() {
    return (
      <>
        <Helmet>
          <title>Chopbarh &rarr; Sign Up</title>
        </Helmet>
        <Header />
        <SignUpWrapper>
          <Modal
            isOpen={this.state.otpModal}
            toggle={this.toggleOTPModal}
            style={{
              marginTop: "22rem"
            }}
          >
            <ModalBody className="text-center my-5 mx-3">
              <h2>Please enter the pin sent to your phone</h2>
              <Form onSubmit={this.handleOTPSubmit}>
                <FormItem>
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={this.state.otp}
                    onChange={this.handleInputChange}
                    required
                    minLength="6"
                    maxLength="6"
                  />
                </FormItem>
                <button
                  type="submit"
                  className="mr-2"
                  disabled={this.state.otpLoading}
                >
                  <span>
                    {this.state.otpLoading ? "Please wait..." : "Submit"}
                  </span>
                </button>
              </Form>
            </ModalBody>
          </Modal>
          <Modal
            isOpen={this.state.isOpen}
            toggle={this.toggle}
            className="pt-5 mt-4"
          >
            <ModalBody className="text-center">
              <h2>Ooops!</h2>
              <p>Something went wrong</p>
            </ModalBody>
          </Modal>
          <Container>
            <Form onSubmit={this.handleSubmit}>
              <HeadingTwo className="mb-4">Sign Up</HeadingTwo>
              <FormItem>
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  required
                />
              </FormItem>
              <FormItem>
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleInputChange}
                  required
                  minLength="11"
                  maxLength="11"
                />
              </FormItem>
              <HalfColumn>
                <FormItem className="mr-3">
                  <label>Enter Password Pin (4 digits)</label>
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    required
                    minLength="4"
                    maxLength="4"
                  />
                </FormItem>
                <FormItem>
                  <label>Re-enter Password Pin</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.handleInputChange}
                    required
                    minLength="4"
                    maxLength="4"
                  />
                </FormItem>
              </HalfColumn>
              <button
                type="submit"
                className="mr-2"
                disabled={this.state.loading}
              >
                <span>
                  {this.state.loading ? "Please wait..." : "Create Account"}
                </span>
              </button>
              <LoginSignal>
                <p>By clicking, you agree to our Terms and Conditions</p>
                <p>
                  Already have an account? <Link to="login">Login</Link>
                </p>
              </LoginSignal>
            </Form>
          </Container>
        </SignUpWrapper>
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  otp: state.auth.otp
});

const mapDispatchToProps = {
  authStart,
  authSuccess,
  authFail,
  authOTPGenerator
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignUp)
);
