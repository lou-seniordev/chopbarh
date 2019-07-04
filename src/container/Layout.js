import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authSuccess } from "../store/actions/authActions";
import { fetchPlayerData } from "../store/actions/playerDataActions";
import { Spinner } from "reactstrap";

const LandingPage = lazy(() => import("../Pages/LandingPage"));
const GamesPage = lazy(() => import("../Pages/GamesPage"));
const LoginPage = lazy(() => import("../Pages/LoginPage"));
const SignUpPage = lazy(() => import("../Pages/SignUpPage"));
const ChangePinPage = lazy(() => import("../Pages/ChangePinPage"));
const CompleteProfilePage = lazy(() => import("../Pages/CompleteProfilePage"));
const ForgotPassword = lazy(() =>
  import("../components/auth/ForgotPassword/ForgotPassword")
);
const Logout = lazy(() => import("../components/auth/Logout/Logout"));
const SetNickname = lazy(() =>
  import("../components/auth/SetNickname/SetNickname")
);
const UserHomePage = lazy(() => import("../Pages/UserHomePage"));
const UserPlayPage = lazy(() => import("../Pages/UserPlayPage"));
const UserEditProfilePage = lazy(() => import("../Pages/UserEditProfilePage"));
const UserProfilePage = lazy(() => import("../Pages/UserProfilePage"));
const UserDepositPage = lazy(() => import("../Pages/UserDepositPage"));
const UserWithdrawPage = lazy(() => import("../Pages/UserWithdrawPage"));
const UserTransactionPage = lazy(() => import("../Pages/UserTransactionPage"));

const Loading = () => (
  <div
    style={{
      height: "98vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <Spinner type="grow" style={{ color: "#6D0A23" }} />
  </div>
);

class Layout extends Component {
  constructor(props) {
    super(props);

    this.props.isAuthenticated &&
      this.props.authSuccess(
        localStorage.getItem("chopbarh-token:live"),
        localStorage.getItem("chopbarh-id:live")
      );
  }

  // UNSAFE_componentWillMount = () => {
  //   if (this.props.isAuthenticated) {
  //     this.props.authSuccess(
  //       localStorage.getItem("chopbarh-token:live"),
  //       localStorage.getItem("chopbarh-id:live")
  //     );
  //     //this.props.fetchPlayerData();
  //   }
  //   // if (localStorage.getItem("chopbarh-token:live")) {
  //   //   localStorage.removeItem("chopbarh-token:live");
  //   //   localStorage.removeItem("chopbarh-id:live");
  //   //   this.props.history.replace("/");
  //   // }
  // };

  render() {
    return (
      <>
        {this.props.isAuthenticated ? (
          <Suspense fallback={Loading()}>
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/games" component={GamesPage} />
              <Route path="/reset" component={ForgotPassword} />
              <Route path="/logout" component={Logout} />
              <Route path="/user" component={UserHomePage} />
              <Route path="/profile" component={UserProfilePage} />
              <Route path="/edit-profile" component={UserEditProfilePage} />
              <Route path="/change-pin" component={ChangePinPage} />
              <Route path="/deposit" component={UserDepositPage} />
              <Route path="/withdraw" component={UserWithdrawPage} />
              <Route path="/play" component={UserPlayPage} />
              <Route path="/transaction" component={UserTransactionPage} />
              <Redirect to="/" />
            </Switch>
          </Suspense>
        ) : (
          <Suspense fallback={Loading()}>
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/games" component={GamesPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignUpPage} />
              <Route path="/set-nickname" component={SetNickname} />
              <Route path="/complete_profile" component={CompleteProfilePage} />
              <Redirect push to="/login" />
            </Switch>
          </Suspense>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: localStorage.getItem("chopbarh-token:live") !== null
});

const mapDispatchToProps = {
  authSuccess,
  fetchPlayerData
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Layout)
);
