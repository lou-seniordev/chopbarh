import React, { Component } from "react";
import { AppContext } from "./AppContext";

export default class ContextProvider extends Component {
  state = {
    auth: localStorage.getItem("chopbarh-token") !== null
  };

  render() {
    return (
      <AppContext.Provider value={{ authState: this.state.auth }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
