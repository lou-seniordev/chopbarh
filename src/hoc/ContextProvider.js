import React, { Component } from "react";
import { AppContext } from "./AppContext";

export default class ContextProvider extends Component {
  state = {
    auth: localStorage.getItem("chopbarh-token") !== null
  };

  authUpdate = () => {
    this.setState({ auth: localStorage.getItem("chopbarh-token") !== null });
  };

  setUserInfo = userInfo => {
    console.log(userInfo);
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          authenticated: this.state.auth,
          authUpdate: this.authUpdate,
          setUserInfo: this.setUserInfo
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
