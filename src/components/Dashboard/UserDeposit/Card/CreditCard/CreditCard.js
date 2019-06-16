import React, { Component } from "react";

export default class CreditCard extends Component {
  render() {
    let Logo = null;

    switch (this.props.type) {
      case "visa":
        Logo = <p>Visa Logo</p>;
        break;

      default:
        break;
    }

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
        <Logo />
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
