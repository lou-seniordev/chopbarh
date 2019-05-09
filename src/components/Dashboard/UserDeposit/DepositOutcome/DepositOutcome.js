import React, { Component } from "react";
import UserHeader from "../../shared/UserHeader/UserHeader";
import Footer from "../../../UI/Footer/Footer";
import UserNavigation from "../../shared/UserNavigation/UserNavigation";

export default class DepositOutcome extends Component {
  render() {
    return (
      <>
        <UserHeader />
        <UserNavigation />
        <div style={{ minHeight: "36rem" }} />
        <Footer />
      </>
    );
  }
}
