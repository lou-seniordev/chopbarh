import React, { Component, memo } from "react";
import { Redirect } from "react-router-dom";
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
  setWithdrawalStatus,
} from "../../../store/actions/withdrawalActions";
import { fetchPlayerData } from "../../../store/actions/playerDataActions";
import { firestore } from "../../../firebase";

const Loading = () => (
  <div
    style={{
      height: "98vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Spinner type="grow" style={{ color: "#6D0A23" }} />
  </div>
);

class UserWithdraw extends Component {
  state = {
    dailyWithdrawals: null,
    loading: true,
  };

  componentDidMount = async () => {
    const now = new Date(); // now

    now.setHours(0); // set hours to 0
    now.setMinutes(0); // set minutes to 0
    now.setSeconds(0);

    const startOfDay = Math.floor(now);

    try {
      const { docs } = await firestore
        .collection("new_withdrawals")
        .where("playerId", "==", localStorage.getItem("chopbarh-id"))
        .where("status", "==", "SUCCESSFUL")
        .where("paid_at", ">=", startOfDay)
        .get();

      const dailyWithdrawals = docs.map(doc => ({ ...doc.data() }));

      if (dailyWithdrawals.length) {
        const currentDailyWithdrawalTotal = dailyWithdrawals.reduce(
          (acc, cur) => acc + Number(cur.amount),
          0
        );

        this.props.setWithdrawalStatus(currentDailyWithdrawalTotal);
      } else {
        this.props.setWithdrawalStatus(0);
      }
      this.setState({ dailyWithdrawals, loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <>
        {this.props.playerDataLoading && <Loading />}
        {this.props.playerData && this.props.playerData.PlayerStatus === 6 && (
          <Redirect to="/user" />
        )}
        <Helmet title={`Chopbarh \u{2192} Withdraw`} />
        <UserHeader />
        <UserNavigation />
        {this.props.playerData && (
          <>
            <div className="container">
              <div className="row ">
                <div className="col-lg-10 text-right mt-5 d-flex justify-content-end">
                  {this.state.loading ? (
                    <div className="pr-lg-5 pr-md-3">
                      <Spinner />
                    </div>
                  ) : (
                    <div className="pr-lg-5 pr-md-3">
                      <p style={{ fontWeight: "bold" }}>Withdrawal Status</p>
                      <p>
                        <strong>Daily Limit:</strong> &#8358;
                        {new Intl.NumberFormat().format(
                          this.props.withdrawalLimit
                        )}
                      </p>
                      <p>
                        <strong>Available for withdrawal</strong>: &#8358;
                        {new Intl.NumberFormat().format(
                          this.props.withdrawalLimit -
                            this.props.withdrawalStatus
                        )}
                      </p>
                      <p>
                        <strong>Cash Balance</strong>: &#8358;
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
          </>
        )}
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
  playerData: state.player.playerData,
  playerDataLoading: state.player.loading,
});

const mapDispatchToProps = {
  fetchWithdrawalHistoryData,
  setWithdrawalStatus,
  fetchPlayerData,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(UserWithdraw));
