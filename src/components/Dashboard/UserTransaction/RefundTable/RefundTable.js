import React, { Component, memo } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import { fetchRefundHistoryData } from "../../../../store/actions/refundActions";

const RefundTableWrapper = styled.div`
  margin-top: 1rem;
`;

class RefundTable extends Component {
  componentDidMount = () => {
    this.props.fetchRefundHistoryData();
    // if (!this.props.refundData) {
    // }
  };

  render() {
    return (
      <RefundTableWrapper>
        {!this.props.loading && this.props.refundData.length ? (
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
                  <th scope="col">Refund Date</th>
                  <th scope="col">Refund Time</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Bank</th>
                </tr>
              </thead>
              <tbody>
                {this.props.refundData.map((refund, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    <td>{refund.status}</td>
                    <td>{refund.transaction_reference}</td>
                    <td>{`${new Date(
                      refund.refund_date
                    ).toLocaleDateString()}`}</td>
                    <td>{`${new Date(
                      refund.refund_date
                    ).toLocaleTimeString()}`}</td>

                    <td>
                      &#8358;
                      {new Intl.NumberFormat().format(refund.amount)}
                    </td>
                    <td>{refund.bank}</td>
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
                <p>Refund History not Available</p>
              </div>
            )}
          </>
        )}
      </RefundTableWrapper>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.refunds.loading,
  error: state.refunds.error,
  refundData: state.refunds.refundHistory
});

const mapDispatchToProps = {
  fetchRefundHistoryData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(RefundTable));
