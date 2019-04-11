import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";
// import ErrorBoundary from "../hoc/ErrorBoundary";
import color from "../components/styles/colors";
import Home from "../components/Home/Home";
import Games from "../components/Games/Games";
import Login from "../components/auth/Login/Login";
import ForgotPassword from "../components/auth/ForgotPassword/ForgotPassword";
import SignUp from "../components/auth/SignUp/SignUp";
import UserHome from "../components/Dashboard/UserHome/UserHome";
import UserProfile from "../components/Dashboard/UserProfile/UserProfile";
import UserDeposit from "../components/Dashboard/UserDeposit/UserDeposit";

/*

To prevent this component from bloat, consider moving the
globalStyles to a different component. Also, move the 
components that render Pages to the Pages folder. ,ove ErrorBoundary
to the App component

*/

const GlobalStyles = createGlobalStyle`
  *, 
  *:after, 
  *:before {
    padding: 0;
    margin: 0;
    box-sizing:inherit;
  }

  *::selection {
    background: ${color.colorPrimaryHover}
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2rem;
    color: #737773;
  }
`;

export default class Layout extends Component {
  render() {
    return (
      <>
        <GlobalStyles />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/games" component={Games} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/reset" component={ForgotPassword} />
          <Route path="/user" component={UserHome} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/deposit" component={UserDeposit} />
          <Redirect to="/" />
        </Switch>
      </>
    );
  }
}
