import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import colors from "../../../styles/colors";
import Icon from "../Icon/Icon";

const HeaderWrapper = styled.div`
  background: #dfebdf;
  min-height: 6rem;
  padding: 2rem 18rem;
  position: relative;
  z-index: 300;
  text-align: left !important;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    font-size: 1.35rem;
  }
`;

const NavItem = styled.div``;

export default function UserNavigation() {
  return (
    <HeaderWrapper>
      <NavItem>
        <p>Home</p>
      </NavItem>
      <NavItem>
        <p>Deposit</p>
      </NavItem>
      <NavItem>
        <p>Withdraw</p>
      </NavItem>
      <NavItem>
        <p>Play</p>
      </NavItem>
      <NavItem>
        <p>Transaction</p>
      </NavItem>
    </HeaderWrapper>
  );
}
