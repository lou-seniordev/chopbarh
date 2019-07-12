import React, { Component, memo } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Spinner } from "reactstrap";
import MediaQuery from "react-responsive";
import UserHeader from "../shared/UserHeader/UserHeader";
import Footer from "../../UI/Footer/Footer";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import WithdrawTabs from "./WithdrawTabs/WithdrawTabs";
import WithdrawSmallScreens from "./WithdrawSmallScreens/WithdrawSmallScreens";
import {
  fetchWithdrawalHistoryData,
  setWithdrawalStatus
} from "../../../store/actions/withdrawalActions";

class UserWithdraw extends Component {
  componentDidMount = () => {
    this.props.fetchWithdrawalHistoryData();
  };

  componentDidUpdate = prevProps => {
    if (this.props !== prevProps) {
      const today = new Date().toLocaleDateString();
      if (this.props.withdrawals) {
        const withdrawalsMade = this.props.withdrawals.filter(
          withdrawal =>
            new Date(withdrawal.withdrawal_date).toLocaleDateString() === today
        );

        if (withdrawalsMade.length) {
          const withdrawalsTotal = withdrawalsMade.reduce(
            (acc, current) => acc + Number(current.amount),
            0
          );
          this.props.setWithdrawalStatus(withdrawalsTotal);
        } else {
          this.props.setWithdrawalStatus(0);
        }
      }
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
              {this.props.loading ? (
                <div className="pr-lg-5 pr-md-3">
                  <Spinner />
                </div>
              ) : (
                <div className="pr-lg-5 pr-md-3">
                  <p style={{ fontWeight: "bold" }}>Withdrawal Status</p>
                  <p>
                    Daily Limit: &#8358;
                    {new Intl.NumberFormat().format(
                      this.props.withdrawalLimit - this.props.withdrawalStatus
                    )}
                  </p>
                  <p>
                    Cash Balance: &#8358;
                    {new Intl.NumberFormat().format(
                      this.props.playerData.RealCoins
                    )}
                  </p>
                </div>
              )}
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
  loading: state.withdrawal.loading,
  withdrawals: state.withdrawal.withdrawalHistory,
  withdrawalLimit: state.withdrawal.withdrawalLimit,
  withdrawalStatus: state.withdrawal.withdrawalStatus,
  playerData: state.player.playerData
});

const mapDispatchToProps = {
  fetchWithdrawalHistoryData,
  setWithdrawalStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(UserWithdraw));
