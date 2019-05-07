import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AppContext } from "../hoc/AppContext";
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

/*

This component implements routing. We should add React Suspense here.
Add auth logic here to change routes dynamically. Consider approach between 
initialising in constructor and using componentWillMount

*/

export default function Layout() {
  return (
    <AppContext.Consumer>
      {({ authenticated }) => {
        if (authenticated) {
          return (
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/games" component={GamesPage} />
              <Route path="/reset" component={ForgotPassword} />
              <Route path="/logout" component={Logout} />
              <Route path="/user" component={UserHome} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/edit-profile" component={EditProfilePage} />
              <Route path="/deposit" component={UserDeposit} />
              <Route path="/withdraw" component={UserWithdraw} />
              <Route path="/transaction" component={UserTransaction} />
              <Redirect to="/" />
            </Switch>
          );
        }
        return (
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
        );
      }}
    </AppContext.Consumer>
  );
}
