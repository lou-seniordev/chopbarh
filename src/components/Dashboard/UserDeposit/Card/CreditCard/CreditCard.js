import React, { Component } from "react";

export default class CreditCard extends Component {
  render() {
    return (
      <div
        style={{
          background: "#eee",
          padding: "5px",
          borderRadius: "5px",
          margin: "5px",
          marginLeft: "0",
          cursor: "pointer",
          display: "flex"
        }}
      >
        <p>Logo</p>
        <div>
          <p>Card Number</p>
          <p>*************</p>
        </div>
        <div>
          <p>Card Expiry</p>
          <p>*************</p>
        </div>
      </div>
    );
  }
}
