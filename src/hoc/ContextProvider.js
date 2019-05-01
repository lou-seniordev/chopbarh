import React, { Component } from "react";
import { AppContext } from "./AppContext";

export default class ContextProvider extends Component {
  state = {
    auth: localStorage.getItem("chopbarh-token") !== null,
    userInfo: {
      displayName: "Nutod"
    }
  };

  authUpdate = () => {
    this.setState({ auth: localStorage.getItem("chopbarh-token") !== null });
  };

  setUserInfo = userInfo => {
    this.setState({ userInfo });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          authenticated: this.state.auth,
          authUpdate: this.authUpdate,
          setUserInfo: this.setUserInfo,
          getUserInfo: this.state.userInfo
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
