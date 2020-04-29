import React, { Component, memo } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { firestore } from "../../../../firebase";

const DepositTableWrapper = styled.div`
  margin-top: 1rem;
`;

class DepositTable extends Component {
  state = {
    loading: true,
    error: false,
    depositData: [],
    lastVisible: null,
    hasMore: true,
    limit: 20,
  };

  componentDidMount = async () => {
    try {
      let snapshots = await firestore
        .collection("new_deposits")
        .where("playerId", "==", this.props.playerId)
        .orderBy("time", "desc")
        .limit(this.state.limit)
        .get();

      let data = snapshots.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      let lastVisible = snapshots.docs[snapshots.docs.length - 1];

      if (data.length === 0) {
        this.setState({ loading: false, error: true });
        return;
      }

      if (data.length < this.state.limit) {
        this.setState({ depositData: data, loading: false, hasMore: false });
        return;
      }

      this.setState(() => ({
        depositData: data,
        lastVisible,
        loading: false,
      }));
    } catch (err) {
      this.setState({ error: true, loading: false });
    }
  };

  fetchMoreData = async () => {
    try {
      let additionalQuery = await firestore
        .collection("new_deposits")
        .where("playerId", "==", this.props.playerId)
        .orderBy("time", "desc")
        .startAfter(this.state.lastVisible)
        .limit(this.state.limit);

      let snapshots = await additionalQuery.get();
      let data = snapshots.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      let lastVisible = snapshots.docs[snapshots.docs.length - 1];

      if (!data.length) {
        this.setState({ hasMore: false, loading: false });
        return;
      }
      // Set State
      this.setState({
        depositData: [...this.state.depositData, ...data],
        lastVisible,
      });
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  };

  render() {
    return (
      <DepositTableWrapper>
        {!this.state.loading && this.state.depositData.length ? (
          <div
            className="table-responsive"
            id="scrollableDiv"
            style={{ height: 500, overflow: "auto" }}
          >
            <InfiniteScroll
              dataLength={this.state.depositData.length}
              next={this.fetchMoreData}
              loader={
                <div className="text-center mx-auto">
                  <Spinner />
                </div>
              }
              endMessage={
                <div style={{ textAlign: "center" }}>
                  <p>You have seen it all!</p>
                </div>
              }
              hasMore={this.state.hasMore}
              scrollableTarget="scrollableDiv"
            >
              <table className="table table-striped">
                <thead
                  style={{
                    background: "#8C1936",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  <tr>
                    <th scope="col">Status</th>
                    <th scope="col">Reference</th>
                    <th scope="col">Transaction Date</th>
                    <th scope="col">Transaction Time</th>
                    <th scope="col">Transaction Fees</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Channel</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.depositData.map((deposit, index) => (
                    <tr key={index} style={{ textAlign: "center" }}>
                      <td>{deposit.status.toUpperCase()}</td>
                      <td>{deposit.refId}</td>
                      <td>{`${new Date(
                        deposit.deposit_date
                      ).toLocaleDateString()}`}</td>
                      <td>{`${new Date(
                        deposit.deposit_date
                      ).toLocaleTimeString()}`}</td>
                      <td>
                        {deposit.transaction_fees === "None" ||
                        deposit.transaction_fees === "--"
                          ? `\u20a6${0}`
                          : `\u20a6${Math.floor(deposit.transaction_fees)}`}
                      </td>
                      <td>
                        &#8358;
                        {new Intl.NumberFormat().format(deposit.amount)}
                      </td>
                      <td>
                        {deposit.channel.charAt(0).toUpperCase() +
                          deposit.channel.slice(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </InfiniteScroll>
          </div>
        ) : (
          <>
            {!this.state.error ? (
              <div className="text-center mx-auto">
                <Spinner />
              </div>
            ) : (
              <div className="text-center mx-auto">
                <p>Deposit History not Available</p>
              </div>
            )}
          </>
        )}
      </DepositTableWrapper>
    );
  }
}

const mapStateToProps = state => ({
  playerId: state.player.playerData
    ? state.player.playerData.PlayerID
    : localStorage.getItem("chopbarh-id:live"),
  loading: state.deposit.loading,
  error: state.deposit.error,
  depositData: state.deposit.depositHistory,
});

export default connect(mapStateToProps)(memo(DepositTable));
