import React, { Component, memo } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import { fetchTransferCreditData } from "../../../../store/actions/transferActions";

const TransferTableWrapper = styled.div`
  margin-top: 1rem;
`;

class TransferTable extends Component {
  componentDidMount = () => {
    // if (!this.props.withdrawalData) {
    // }
    this.props.fetchTransferCreditData();
  };

  render() {
    return (
      <TransferTableWrapper>
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
                  <th scope="col">Transaction Date</th>
                  <th scope="col">Transaction Time</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Type</th>
                </tr>
              </thead>
              <tbody>
                {this.props.transferData.map((transfer, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    <td>{transfer.status}</td>
                    <td>{`${new Date(
                      transfer.transfer_date
                    ).toLocaleDateString()}`}</td>
                    <td>{`${new Date(
                      transfer.transfer_date
                    ).toLocaleTimeString()}`}</td>
                    <td>
                      &#8358;
                      {new Intl.NumberFormat().format(transfer.amount)}
                    </td>
                    <td>{transfer.type}</td>
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
                <p>Transfer History not Available</p>
              </div>
            )}
          </>
        )}
      </TransferTableWrapper>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.transfer.loading,
  error: state.transfer.error,
  transferData: state.transfer.transferHistory
});

const mapDispatchToProps = {
  fetchTransferCreditData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(TransferTable));
