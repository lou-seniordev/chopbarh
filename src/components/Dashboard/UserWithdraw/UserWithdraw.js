import React, { Component } from "react";
import { connect } from "react";
import { Helmet } from "react-helmet";
import MediaQuery from "react-responsive";
import UserHeader from "../shared/UserHeader/UserHeader";
import Footer from "../../UI/Footer/Footer";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import WithdrawTabs from "./WithdrawTabs/WithdrawTabs";
import WithdrawSmallScreens from "./WithdrawSmallScreens/WithdrawSmallScreens";

class UserWithdraw extends Component {
  render() {
    return (
      <>
        <Helmet title={`Chopbarh \u{2192} Withdraw`} />
        <UserHeader />
        <UserNavigation />
        <div style={{ minHeight: "80vh" }}>
          <MediaQuery minDeviceWidth={767}>
            <WithdrawTabs />
          </MediaQuery>
          <MediaQuery maxDeviceWidth={767}>
            <WithdrawSmallScreens />
          </MediaQuery>
        </div>
        <div className="container">
          <p>Withdrawal Status</p>
        </div>
        <Footer />
      </>
    );
  }
}

export default connect(
  null,
  null
)(UserWithdraw);
