import React, { Component } from "react";
import { AppContext } from "./AppContext";

export default class ContextProvider extends Component {
  state = {
    auth: localStorage.getItem("chopbarh-token") !== null
  };

  authUpdate = () => {
    this.setState({ auth: localStorage.getItem("chopbarh-token") !== null });
  };

  render() {
    return (
      <AppContext.Provider
        value={{ authenticated: this.state.auth, authUpdate: this.authUpdate }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
