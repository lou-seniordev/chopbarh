import React, { Component, memo } from "react";
import { Helmet } from "react-helmet";
import { withRouter, Link } from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { withLastLocation } from "react-router-last-location";
import {
  AuthWrapper,
  HeadingTwo,
  ImageContainer,
  Image,
  FormWrapper,
  FormItem,
  FormCheckBox,
  FormAction,
  SignUpSignal,
} from "../../styles/LoginStyles";
import {
  authStart,
  authSuccess,
  authFail,
} from "../../../store/actions/authActions";
import Logo from "../../UI/Logo/Logo";
import firebase from "../../../firebase";

const appRoutes = [
  "/edit-profile",
  "/change-pin",
  "/deposit",
  "/withdraw",
  "/play",
  "/transaction",
  "/user",
];

class Login extends Component {
  state = {
    formErrorModal: false,
    accountErrorModal: false,
    userName: "",
    password: "",
    loading: false,
  };

  componentDidMount = () => {
    localStorage.removeItem("chopbarh-token");
    localStorage.removeItem("chopbarh-id");
  };

  toggleformErrorModal = () => {
    this.setState({ formErrorModal: !this.state.formErrorModal });
  };

  toggleAccountErrorModal = () => {
    this.setState({ accountErrorModal: !this.state.accountErrorModal });
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  formIsValid = ({ userName, password }) => {
    if (userName.length !== 11 || !isNaN(userName) !== true) {
      return false;
    }
    return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (!this.formIsValid(this.state)) {
      this.setState({ formErrorModal: true });
      return;
    }
    this.props.authStart();

    const newState = { ...this.state };
    const formState = {
      phone_number: newState.userName,
      password: newState.password,
    };

    const formValue = JSON.stringify(formState);

    const context = this;

    fetch(
      "https://us-central1-dev-sample-31348.cloudfunctions.net/userAuth/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: formValue,
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data.status === true) {
          // localStorage.setItem("chopbarh-token", data.authToken);
          // localStorage.setItem("chopbarh-id", data.userId);
          // this.props.authSuccess(data.authToken, data.userId);
          // if (
          //   this.props.lastLocation !== null &&
          //   appRoutes.includes(this.props.lastLocation.pathname)
          // ) {
          //   this.props.history.push(this.props.lastLocation.pathname);
          // } else {
          //   this.props.history.push("/user");
          // }
          return firebase
            .auth()
            .signInWithCustomToken(data.data.serviceToken)
            .then(info => {
              localStorage.setItem("chopbarh-token", data.data.userToken);
              localStorage.setItem("chopbarh-id", data.data.PlayerID);
              context.props.authSuccess(
                data.data.userToken,
                data.data.PlayerID
              );
              if (
                context.props.lastLocation !== null &&
                appRoutes.includes(context.props.lastLocation.pathname)
              ) {
                context.props.history.push(context.props.lastLocation.pathname);
              } else {
                context.props.history.push("/user");
              }
            });
        } else {
          context.setState({ accountErrorModal: true });
          context.props.authFail();
        }
      })
      .catch(err => {
        context.props.authFail();
      });
  };

  render() {
    return (
      <AuthWrapper>
        <Helmet title={`Chopbarh \u{2192} Login`} />
        <ImageContainer />
        <Image />

        <Modal
          isOpen={this.state.formErrorModal}
          toggle={this.toggleformErrorModal}
          className="pt-5 mt-4"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ModalBody className="text-center">
            <h2>Ooops!</h2>
            <p>There was an error in the form!</p>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.accountErrorModal}
          toggle={this.toggleAccountErrorModal}
          className="pt-5 mt-4"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ModalBody className="text-center">
            <h2>Ooops!</h2>
            <p>
              Incorrect account information. Please, check your info and try
              again or sign up if you don't have an account
            </p>
          </ModalBody>
        </Modal>

        <FormWrapper>
          <Link to="/">
            <Logo width="110px" />
          </Link>
          <form onSubmit={this.handleSubmit} className="mt-5">
            <HeadingTwo className="mb-4">Login</HeadingTwo>
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
              <label>Enter Password</label>
              <input
                type="password"
                name="password"
                onChange={this.handleInputChange}
                value={this.state.password}
                required
                minLength="4"
                maxLength="12"
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
                <span style={{ color: "#ffffff" }}>
                  {this.props.loading ? "Please wait..." : "Login"}
                </span>
              </button>
            </FormAction>
            <SignUpSignal>
              <span>No Account?</span>
              <br />
              <Link to="signup">
                <span>Create Account</span>
              </Link>
            </SignUpSignal>
          </form>
        </FormWrapper>
      </AuthWrapper>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = {
  authStart,
  authSuccess,
  authFail,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(memo(withLastLocation(Login)))
);
