import React, { Component, memo } from "react";
import styled from "styled-components";

const TransactionTableWrapper = styled.div`
  margin-top: 6rem;
`;

class TransactionTable extends Component {
  render() {
    return (
      <TransactionTableWrapper>
        <div>
          <table className="table table-striped">
            <thead style={{ background: "#8C1936", color: "#fff" }}>
              <tr>
                <th scope="col">Transactions</th>
                <th scope="col" />
                <th scope="col" />
                <th scope="col" />
                <th scope="col" />
                <th scope="col" />
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: "center" }}>
                <td>Time</td>
                <td>Type</td>
                <td>Trade Number</td>
                <td>Amount</td>
                <td>Status</td>
                <td>Balance</td>
                <td>Action</td>
              </tr>
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </TransactionTableWrapper>
    );
  }
}

export default memo(TransactionTable);
