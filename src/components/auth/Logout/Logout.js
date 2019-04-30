import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Logout extends Component {
  componentDidMount = () => {
    localStorage.removeItem("chopbarh-token");
    localStorage.removeItem("chopbarh-id");
  };

  render() {
    return <Redirect to="/" />;
  }
}
