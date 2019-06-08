import React, { Component, memo } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import { fetchWithdrawalHistoryData } from "../../../../store/actions/withdrawalActions";

const WithdrawalTableWrapper = styled.div`
  margin-top: 1rem;
`;

class WithdrawalTable extends Component {
  componentDidMount = () => {
    if (!this.props.withdrawalData) {
      this.props.fetchWithdrawalHistoryData();
    }
  };

  render() {
    return (
      <WithdrawalTableWrapper>
        {this.props.withdrawalData ? (
          <table className="table table-striped">
            <thead
              style={{
                background: "#8C1936",
                color: "#fff",
                textAlign: "center"
              }}
            >
              <tr>
                <th scope="col">Transaction Date</th>
                <th scope="col">Type</th>
                <th scope="col">Amount</th>
                <th scope="col">Channel</th>
                {/*<th scope="col">Balance</th>
                <th scope="col">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {this.props.withdrawalData.map((withdrawal, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  <td>{`${new Date(
                    withdrawal.withdrawal_date
                  ).getDate()}-${new Date(
                    withdrawal.withdrawal_date
                  ).getMonth()}-${new Date(
                    withdrawal.withdrawal_date
                  ).getFullYear()}`}</td>
                  <td>Withdrawal</td>
                  <td>
                    &#8358;
                    {new Intl.NumberFormat().format(withdrawal.amount)}
                  </td>
                  <td>{withdrawal.channel}</td>
                  {/*<td>Balance</td>
                  <td>Action</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            {!this.props.error ? (
              <div className="text-center mx-auto">
                <Spinner />
              </div>
            ) : (
              <div className="text-center mx-auto">
                <p>Withdrawal History not Available</p>
              </div>
            )}
          </>
        )}
      </WithdrawalTableWrapper>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.withdrawal.loading,
  error: state.withdrawal.error,
  withdrawalData: state.withdrawal.withdrawalHistory
});

const mapDispatchToProps = {
  fetchWithdrawalHistoryData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(WithdrawalTable));
