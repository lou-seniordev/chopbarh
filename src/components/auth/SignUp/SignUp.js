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
  authFail
} from "../Login/actions/LoginActions";

class SignUp extends Component {
  state = {
    isOpen: false,
    name: "",
    phone: "",
    password: "",
    confirmPassword: ""
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
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

  handleSubmit = event => {
    event.preventDefault();

    if (!this.formIsValid(this.state)) {
      this.setState({ isOpen: true });
      return;
    }
    this.props.authStart();

    const newState = { ...this.state };
    const formState = {
      userName: newState.phone,
      password: newState.password,
      displayName: newState.name
    };

    formState["@class"] = ".RegistrationRequest";
    const formValue = JSON.stringify(formState);
    fetch(
      `https://${keys.apiKeyPrefix}.preview.gamesparks.net/rs/debug/${
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
          this.props.history.push("/otp");
        } else {
          this.props.authFail();
        }
      })
      .catch(err => {
        this.props.authFail();
      });
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
                disabled={this.props.loading}
              >
                <span>
                  {this.props.loading ? "Please wait..." : "Create Account"}
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
  loading: state.auth.loading
});

const mapDispatchToProps = {
  authStart,
  authSuccess,
  authFail
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignUp)
);
