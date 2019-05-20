import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authSuccess } from "../components/auth/Login/actions/LoginActions";
import { fetchPlayerData } from "../components/Dashboard/shared/actions/playerDataActions";
import LandingPage from "../Pages/LandingPage";
import GamesPage from "../Pages/GamesPage";
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";
import CompleteProfilePage from "../Pages/CompleteProfilePage";
import EditProfilePage from "../Pages/EditProfilePage";
import ProfilePage from "../Pages/ProfilePage";
import ForgotPassword from "../components/auth/ForgotPassword/ForgotPassword";
import Logout from "../components/auth/Logout/Logout";
import OTP from "../components/auth/OTP/OTP";
import SetNickname from "../components/auth/SetNickname/SetNickname";
import UserHome from "../components/Dashboard/UserHome/UserHome";
import UserDeposit from "../components/Dashboard/UserDeposit/UserDeposit";
import UserWithdraw from "../components/Dashboard/UserWithdraw/UserWithdraw";
import UserTransaction from "../components/Dashboard/UserTransaction/UserTransaction";
import DepositOutcome from "../components/Dashboard/UserDeposit/DepositOutcome/DepositOutcome";

/*

This component implements routing. We should add React Suspense here.
Add auth logic here to change routes dynamically. Consider approach between 
initialising in constructor and using componentWillMount

*/

class Layout extends Component {
  UNSAFE_componentWillMount = () => {
    if (this.props.isAuthenticated) {
      this.props.authSuccess(
        localStorage.getItem("chopbarh-token:live"),
        localStorage.getItem("chopbarh-id:live")
      );
      //this.props.fetchPlayerData();
    }
  };

  componentDidMount = () => {
    if (localStorage.getItem("chopbarh-token")) {
      localStorage.getItem("chopbarh-token");
      localStorage.getItem("chopbarh-id");
    }
  };

  render() {
    return (
      <>
        {this.props.isAuthenticated ? (
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/games" component={GamesPage} />
            <Route path="/reset" component={ForgotPassword} />
            <Route path="/logout" component={Logout} />
            <Route path="/user" component={UserHome} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/edit-profile" component={EditProfilePage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/deposit/charge" component={DepositOutcome} />
            <Route path="/deposit" component={UserDeposit} />
            <Route path="/withdraw" component={UserWithdraw} />
            <Route path="/transaction" component={UserTransaction} />
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/games" component={GamesPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/otp" component={OTP} />
            <Route path="/set-nickname" component={SetNickname} />
            <Route path="/complete_profile" component={CompleteProfilePage} />
            <Redirect to="/" />
          </Switch>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
