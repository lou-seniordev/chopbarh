import React, { Component } from "react";
import styled from "styled-components";
import VisaLogo from "../../../../assets/img/visa-logo.png";
import MasterCardLogo from "../../../../assets/img/mastercard-logo.png";

const Image = styled.img`
  height: 4rem;
`;

const Container = styled.div`
  background: #eee;
  padding: 0px 10px;
  border-radius: 5px;
  min-width: 24rem;
  margin: 14px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 37px;

  p {
    margin-bottom: 0;
  }
`;

const CardComponent = styled.div`
  position: relative;
  margin-right: 2rem;
`;

const CardComponentHeader = styled.p`
  position: absolute;
  top: -29px;
  width: 9rem;
  left: -10px;
`;

export default class CreditCard extends Component {
  render() {
    let Logo = null;

    switch (this.props.type) {
      case "visa":
        Logo = <Image src={VisaLogo} alt="Logo" />;
        break;
      case "mastercard":
        Logo = <Image src={MasterCardLogo} alt="Logo" />;
        break;
      default:
        Logo = <p>Visa Logo</p>;
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
          <CardComponentHeader>Expiry</CardComponentHeader>
          <p>****</p>
        </CardComponent>
      </Container>
    );
  }
}