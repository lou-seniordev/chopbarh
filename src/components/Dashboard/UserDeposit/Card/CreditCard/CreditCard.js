import React, { Component } from "react";
import styled from "styled-components";
import VisaLogo from "../../../../assets/img/visa-logo.png";

const Image = styled.img`
  height: 4rem;
`;

const Container = styled.div`
  background: #eee;
  padding: 3px 10px;
  border-radius: 5px;
  min-width: 24rem;
  margin: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 25px;
`;

const CardComponent = styled.div`
  position: relative;
`;

const CardComponentHeader = styled.p`
  position: absolute;
  top: -35px;
  width: auto;
`;

export default class CreditCard extends Component {
  render() {
    let Logo = null;

    switch (this.props.type) {
      case "visa":
        Logo = <p>Visa Logo</p>;
        break;

      default:
        Logo = <Image src={VisaLogo} alt="Logo" />;
        break;
    }

    return (
      <Container>
        {Logo}
        <CardComponent>
          <CardComponentHeader>Card Number</CardComponentHeader>
          <p>*************</p>
        </CardComponent>
        <CardComponent>
          <CardComponentHeader>Card Expiry</CardComponentHeader>
          <p>****</p>
        </CardComponent>
      </Container>
    );
  }
}
