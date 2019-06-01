import React, { Component, memo } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import { fetchTransactionHistoryData } from "../../../../store/actions/transactionHistoryActions";

const TransactionTableWrapper = styled.div`
  margin-top: 6rem;
`;

class TransactionTable extends Component {
  state = {
    results: [
      {
        AMOUNT: 500,
        FROM: "Deposit",
        TO: "5cc6c6fa1f0e8c04de431b95",
        TimeStamp: 1557245334757,
        FromName: "Deposit",
        ToName: null
      },
      {
        AMOUNT: 500,
        FROM: "Deposit",
        TO: "5cc6c6fa1f0e8c04de431b95",
        TimeStamp: 1557245324379,
        FromName: "Deposit",
        ToName: null
      },
      {
        AMOUNT: 500,
        FROM: "Deposit",
        TO: "5cc6c6fa1f0e8c04de431b95",
        TimeStamp: 1557245247160,
        FromName: "Deposit",
        ToName: null
      },
      {
        AMOUNT: 500,
        FROM: "Deposit",
        TO: "5cc6c6fa1f0e8c04de431b95",
        TimeStamp: 1557245153164,
        FromName: "Deposit",
        ToName: null
      },
      {
        AMOUNT: 500,
        FROM: "Deposit",
        TO: "5cc6c6fa1f0e8c04de431b95",
        TimeStamp: 1557245136794,
        FromName: "Deposit",
        ToName: null
      },
      {
        AMOUNT: 500,
        FROM: "Deposit",
        TO: "5cc6c6fa1f0e8c04de431b95",
        TimeStamp: 1557245101754,
        FromName: "Deposit",
        ToName: null
      },
      {
        AMOUNT: 100,
        FROM: "Deposit",
        TO: "5cc6c6fa1f0e8c04de431b95",
        TimeStamp: 1557234436564,
        FromName: "Deposit",
        ToName: null
      },
      {
        AMOUNT: 1,
        FROM: "Deposit",
        TO: "5cc6c6fa1f0e8c04de431b95",
        TimeStamp: 1557221803777,
        FromName: "Deposit",
        ToName: null
      }
    ]
  };

  componentDidMount = () => {
    if (!this.props.transactionData) {
      this.props.fetchTransactionHistoryData();
    }
  };

  render() {
    return (
      <TransactionTableWrapper>
        {this.props.transactionData ? (
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
              {this.props.transactionData.map((transaction, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  <td>{`${new Date(
                    transaction.transaction_date
                  ).getDate()}-${new Date(
                    transaction.transaction_date
                  ).getMonth()}-${new Date(
                    transaction.transaction_date
                  ).getFullYear()}`}</td>
                  <td>Deposit</td>
                  <td>
                    &#8358;
                    {new Intl.NumberFormat().format(transaction.amount)}
                  </td>
                  <td>{transaction.channel}</td>
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
                <p>Transaction History not Available</p>
              </div>
            )}
          </>
        )}
      </TransactionTableWrapper>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.transaction.loading,
  error: state.transaction.error,
  transactionData: state.transaction.transactionHistory
});

const mapDispatchToProps = {
  fetchTransactionHistoryData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(TransactionTable));
