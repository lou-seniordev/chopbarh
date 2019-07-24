import React, { Component, memo } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import { fetchDepositHistoryData } from "../../../../store/actions/depositActions";

const DepositTableWrapper = styled.div`
  margin-top: 1rem;
`;

class DepositTable extends Component {
  componentDidMount = () => {
    this.props.fetchDepositHistoryData();
    // if (!this.props.depositData) {
    // }
  };

  render() {
    return (
      <DepositTableWrapper>
        {!this.props.loading ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead
                style={{
                  background: "#8C1936",
                  color: "#fff",
                  textAlign: "center"
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
                {this.props.depositData.map((deposit, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    <td>{deposit.status}</td>
                    <td>{deposit.transaction_reference}</td>
                    <td>{`${new Date(
                      deposit.deposit_date
                    ).toLocaleDateString()}`}</td>
                    <td>{`${new Date(
                      deposit.deposit_date
                    ).toLocaleTimeString()}`}</td>
                    {/* <td>
                      &#8358;
                      {+deposit.transaction_fees &&
                      +deposit.transaction_fees < 100
                        ? "None"
                        : +deposit.transaction_fees}
                    </td> */}
                    <td>{deposit.transaction_fees}</td>
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
          </div>
        ) : (
          <>
            {!this.props.error ? (
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
  loading: state.deposit.loading,
  error: state.deposit.error,
  depositData: state.deposit.depositHistory
});

const mapDispatchToProps = {
  fetchDepositHistoryData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(DepositTable));
