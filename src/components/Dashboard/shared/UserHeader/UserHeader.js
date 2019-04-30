import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import colors from "../../../styles/colors";
import Logo from "../../../UI/Logo/Logo";
import Icon from "../Icon/Icon";
import CoinSymbol from "../../../assets/svg/CoinSymbol.svg";
import VisibilityButton from "../../../assets/svg/VisibilityButton.svg";
import CashIcon from "../../../assets/svg/CashIcon.svg";

const HeaderWrapper = styled.div`
  background: ${colors.colorGrayDarkOne};
  min-height: 6rem;
  padding: 0.4rem 2rem;
  position: relative;
  z-index: 300;
  text-align: left !important;

  a {
    font-size: 1.35rem;
  }
`;

export default function UserHeader() {
  return (
    <HeaderWrapper>
      <nav
        className="navbar navbar-expand-lg navbar-expand-md navbar-dark mt-2"
        role="navigation"
      >
        <Link className="navbar-brand navbar-logo mt-n4" to="/">
          <Logo />
        </Link>
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto" />
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="" className="nav-link text-uppercase mr-5">
                <Icon icon={CoinSymbol} height="15" />
                167
                <Icon icon={VisibilityButton} height="10" />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="" className="nav-link text-uppercase mr-5">
                <Icon icon={CashIcon} height="18" />
                &#8358;43,590.55
                <Icon icon={VisibilityButton} height="10" />
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-uppercase"
                href="drop"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Alisson Becker
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="profile">
                  User Profile
                </Link>
                <Link className="dropdown-item" to="logout">
                  Logout
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </HeaderWrapper>
  );
}
