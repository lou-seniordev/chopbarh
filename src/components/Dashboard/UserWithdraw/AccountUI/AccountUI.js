import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  background: #eee;
  padding: 0px 10px;
  border-radius: 5px;
  min-width: 26rem;
  margin: 14px;
  margin-right: 7px;
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
  margin-right: 1rem;
`;

const CardComponentHeader = styled.p`
  position: absolute;
  top: -29px;
  width: 11rem;
`;

export default class AccountUI extends Component {
  render() {
    return (
      <Container>
        <CardComponent>
          <CardComponentHeader>Account Number</CardComponentHeader>
          <p>{this.props.number}</p>
        </CardComponent>
        <CardComponent>
          <CardComponentHeader>Bank</CardComponentHeader>
          <p>{this.props.bank}</p>
        </CardComponent>
      </Container>
    );
  }
}
