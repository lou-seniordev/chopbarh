import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import GamesPage from "../Pages/GamesPage";
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";
import ForgotPassword from "../components/auth/ForgotPassword/ForgotPassword";
import UserHome from "../components/Dashboard/UserHome/UserHome";
import UserProfile from "../components/Dashboard/UserProfile/UserProfile";
import UserDeposit from "../components/Dashboard/UserDeposit/UserDeposit";
import UserWithdraw from "../components/Dashboard/UserWithdraw/UserWithdraw";
import UserTransaction from "../components/Dashboard/UserTransaction/UserTransaction";

/*

This component implements routing. We should add React Suspense here.
Add auth logic here to change routes dynamically

*/

export default class Layout extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/games" component={GamesPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/reset" component={ForgotPassword} />
          <Route path="/user" component={UserHome} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/deposit" component={UserDeposit} />
          <Route path="/withdraw" component={UserWithdraw} />
          <Route path="/transaction" component={UserTransaction} />
          <Redirect to="/" />
        </Switch>
      </>
    );
  }
}
