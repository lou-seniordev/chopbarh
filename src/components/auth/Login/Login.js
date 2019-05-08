import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { Modal, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import {
  AuthWrapper,
  HeadingTwo,
  ImageContainer,
  FormWrapper,
  FormItem,
  FormCheckBox,
  FormAction,
  SignUpSignal,
  ErrorText
} from "../../styles/LoginStyles";
import { authStart, authSuccess, authFail } from "./actions/LoginActions";

class Login extends Component {
  state = {
    isOpen: false,
    userName: "",
    password: "",
    loading: false
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  formIsValid = ({ userName, password }) => {
    if (
      userName.length !== 11 ||
      !isNaN(userName) !== true ||
      password.length !== 4
    ) {
      return false;
    }
    return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (!this.formIsValid(this.state)) {
      this.setState({ isOpen: true });
      return;
    }
    this.props.authStart();

    const newState = { ...this.state };
    const formState = {
      userName: newState.userName,
      password: newState.password
    };
    formState["@class"] = ".AuthenticationRequest";
    const formValue = JSON.stringify(formState);
    console.log(formState, formValue);

    fetch(
      "https://c373328ysyuR.preview.gamesparks.net/rs/debug/AtfFvlREyWLhhmtWKbG13ASCyTCLLlm5/AuthenticationRequest",
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
        console.log(data);
        if (data.authToken) {
          localStorage.setItem("chopbarh-token", data.authToken);
          localStorage.setItem("chopbarh-id", data.userId);
          this.props.authSuccess(data.authToken, data.userId);
          //this.props.history.push("/user");
          console.log(this.props);
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
      <AuthWrapper>
        <Helmet>
          <title>Chopbarh &rarr; Login</title>
        </Helmet>
        <ImageContainer />
        <FormWrapper>
          <Modal
            isOpen={this.state.isOpen}
            toggle={this.toggle}
            className="pt-5 mt-4"
          >
            <ModalBody className="text-center">
              <h2>Ooops!</h2>
              <p>There was an error in the form!</p>
            </ModalBody>
          </Modal>
          <form onSubmit={this.handleSubmit}>
            <HeadingTwo className="mb-5 mt-n5">Login</HeadingTwo>
            <FormItem>
              <label>Phone Number</label>
              <input
                type="text"
                name="userName"
                onChange={this.handleInputChange}
                value={this.state.userName}
                required
                minLength="11"
                maxLength="11"
              />
            </FormItem>
            <FormItem>
              <label>Enter Pin</label>
              <input
                type="password"
                name="password"
                onChange={this.handleInputChange}
                value={this.state.password}
                required
                minLength="4"
                maxLength="4"
              />
            </FormItem>
            <FormAction>
              <FormCheckBox>
                <label>Remember Me</label>
                <input type="checkbox" />
              </FormCheckBox>
              <button
                type="submit"
                disabled={this.props.loading}
                className="mr-2"
              >
                <span>{this.props.loading ? "Please wait..." : "Login"}</span>
              </button>
            </FormAction>
            <SignUpSignal>
              <span>No Account? </span>
              <Link to="signup">Sign Up</Link>
            </SignUpSignal>
          </form>
        </FormWrapper>
      </AuthWrapper>
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
  )(Login)
);
