import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authLogout } from "./actions/LogoutActions";

class Logout extends Component {
  componentDidMount = () => {
    this.props.authLogout();
  };

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = {
  authLogout
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
