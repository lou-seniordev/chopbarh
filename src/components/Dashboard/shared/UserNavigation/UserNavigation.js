import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import color from "../../../styles/colors";
import Icon from "../Icon/Icon";
import Home from "../../../assets/svg/home.svg";
import Deposit from "../../../assets/svg/Deposit.svg";
import Withdrawal from "../../../assets/svg/Withdrawal.svg";

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
    color: #737773;

    &:hover {
      text-decoration: none;
      color: ${color.colorPrimary};
    }
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
`;

export default function UserNavigation() {
  return (
    <HeaderWrapper>
      <NavItem>
        <Icon icon={Home} height="15" />
        <Link className="ml-2">Home</Link>
      </NavItem>
      <NavItem>
        <Icon icon={Deposit} height="15" />
        <Link className="ml-2">Deposit</Link>
      </NavItem>
      <NavItem>
        <Icon icon={Withdrawal} height="15" />
        <Link className="ml-2">Withdraw</Link>
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
