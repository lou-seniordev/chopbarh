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
      const today = new Date().toLocaleDateString();
      const withdrawalsMade = this.props.withdrawals.filter(
        withdrawal =>
          new Date(withdrawal.withdrawal_date).toLocaleDateString() === today
      );
      // const withdrawalTotal = withdrawalsMade.reduce(
      //   (acc, current) => acc + Number(current.amount)
      // );
      console.log("Updating...", withdrawalsMade);
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
            <div className="col-lg-10 text-right mt-5 d-flex justify-content-end">
              <div className="pr-5">
                <p>Withdrawal Status</p>
                <p>
                  Daily Limit: &#8358;
                  {new Intl.NumberFormat().format(
                    this.props.withdrawalLimit - this.props.withdrawalStatus
                  )}
                </p>
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
  withdrawals: state.withdrawal.withdrawalHistory,
  withdrawalLimit: state.withdrawal.withdrawalLimit,
  withdrawalStatus: state.withdrawal.withdrawalStatus
});

const mapDispatchToProps = {
  fetchWithdrawalHistoryData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(UserWithdraw));
