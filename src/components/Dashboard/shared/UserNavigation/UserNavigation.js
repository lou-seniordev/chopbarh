import React, { memo } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import color from "../../../styles/colors";
import breakpoint from "../../../styles/breakpoints";
import Icon from "../Icon/Icon";
import Home from "../../../assets/svg/home.svg";
import Deposit from "../../../assets/svg/Deposit.svg";
import Withdrawal from "../../../assets/svg/Withdrawal.svg";
import Play from "../../../assets/svg/Play.svg";
import Transactions from "../../../assets/svg/Transaction.svg";

const HeaderWrapper = styled.div`
  background: #8c1936;
  color: ${color.colorWhite};
  min-height: 6rem;
  padding: 2rem 12rem;
  position: relative;
  text-align: left !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media only screen and (max-width: ${breakpoint.mediumLite}) {
    padding: 2rem 6rem;
  }

  @media only screen and (max-width: ${breakpoint.small}) {
    padding: 2rem 3rem;
    display: none;
  }

  a {
    font-size: 1.34rem;
    color: #eeeeee;

    &:hover {
      text-decoration: none;
      color: ${color.colorWhite};
    }
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
`;

function UserNavigation() {
  return (
    <HeaderWrapper>
      <NavItem>
        <Icon icon={Home} height="18" color="#fff" />
        <NavLink activeClassName="active" to="user" className="ml-2">
          Home
        </NavLink>
      </NavItem>
      <NavItem>
        <Icon icon={Deposit} height="18" />
        <NavLink to="deposit" className="ml-2">
          Deposit
        </NavLink>
      </NavItem>
      <NavItem>
        <Icon icon={Withdrawal} height="18" />
        <NavLink to="withdraw" className="ml-2">
          Withdraw
        </NavLink>
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

export default memo(UserNavigation);
