import React, { Component, memo } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import { fetchDepositHistoryData } from "../../../../store/actions/depositActions";

const DepositTableWrapper = styled.div`
  margin-top: 6rem;
`;

class DepositTable extends Component {
  componentDidMount = () => {
    if (!this.props.depositData) {
      this.props.fetchDepositHistoryData();
    }
  };

  render() {
    return (
      <DepositTableWrapper>
        {this.props.depositData ? (
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
              {this.props.depositData.map((deposit, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  <td>{`${new Date(deposit.deposit_date).getDate()}-${new Date(
                    deposit.deposit_date
                  ).getMonth()}-${new Date(
                    deposit.deposit_date
                  ).getFullYear()}`}</td>
                  <td>Deposit</td>
                  <td>
                    &#8358;
                    {new Intl.NumberFormat().format(deposit.amount)}
                  </td>
                  <td>{deposit.channel}</td>
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
