import React, { Component, memo } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import MediaQuery from "react-responsive";
import UserHeader from "../shared/UserHeader/UserHeader";
import Footer from "../../UI/Footer/Footer";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import WithdrawTabs from "./WithdrawTabs/WithdrawTabs";
import WithdrawSmallScreens from "./WithdrawSmallScreens/WithdrawSmallScreens";
import { fetchWithdrawalHistoryData } from "../../../store/actions/withdrawalActions";

class UserWithdraw extends Component {
  componentDidMount = () => {
    this.props.fetchWithdrawalHistoryData();
  };

  componentDidUpdate = prevProps => {
    if (this.props !== prevProps) {
      console.log("Updating...", this.props.withdrawals);
    }
  };

  render() {
    return (
      <>
        <Helmet title={`Chopbarh \u{2192} Withdraw`} />
        <UserHeader />
        <UserNavigation />
        <div className="container">
          <div className="row ">
            <div className="col-lg-8 mt-5 d-flex justify-content-end">
              <div className="pr-5">
                <p>Withdrawal Status</p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ minHeight: "80vh" }}>
          <MediaQuery minDeviceWidth={767}>
            <WithdrawTabs />
          </MediaQuery>
          <MediaQuery maxDeviceWidth={767}>
            <WithdrawSmallScreens />
          </MediaQuery>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => ({
  withdrawals: state.withdrawal.withdrawalHistory
});

const mapDispatchToProps = {
  fetchWithdrawalHistoryData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(UserWithdraw));
