import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import color from "../../../styles/colors";
import Icon from "../Icon/Icon";
import Home from "../../../assets/svg/home.svg";
import Deposit from "../../../assets/svg/Deposit.svg";
import Withdrawal from "../../../assets/svg/Withdrawal.svg";
import Play from "../../../assets/svg/Play.svg";
import Transactions from "../../../assets/svg/Transaction.svg";

const HeaderWrapper = styled.div`
  background: #dfebdf;
  min-height: 6rem;
  padding: 2rem 18rem;
  position: relative;
  text-align: left !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  a {
    font-size: 1.34rem;
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
        <Icon icon={Home} height="18" />
        <Link to="user" className="ml-2">
          Home
        </Link>
      </NavItem>
      <NavItem>
        <Icon icon={Deposit} height="18" />
        <Link to="deposit" className="ml-2">
          Deposit
        </Link>
      </NavItem>
      <NavItem>
        <Icon icon={Withdrawal} height="18" />
        <Link to="withdraw" className="ml-2">
          Withdraw
        </Link>
      </NavItem>
      <NavItem>
        <Icon icon={Play} height="18" />
        <Link to="play" className="ml-2">
          Play
        </Link>
      </NavItem>
      <NavItem>
        <Icon icon={Transactions} height="18" />
        <Link to="transaction" className="ml-2">
          Transactions
        </Link>
      </NavItem>
    </HeaderWrapper>
  );
}
