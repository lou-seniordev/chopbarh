import { Component } from "react";
import { connect } from "react-redux";
import { authLogout } from "../../../store/actions/authActions";

class Logout extends Component {
  componentDidMount = () => {
    this.props.authLogout();

    window.location = "/";
  };

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  authLogout
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
