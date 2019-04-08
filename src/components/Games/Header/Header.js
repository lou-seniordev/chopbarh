import React from "react";
import styled from "styled-components";
import colors from "../../styles/colors";
import breakPoints from "../../styles/breakpoints";
import Logo from "../Logo/Logo";

const HeaderWrapper = styled.div`
  background: blue !important;
  min-height: 6rem;
  padding: 0.4rem 2rem;
  position: relative;
  z-index: 300;
  text-align: left !important;

  a {
    font-size: 1.3rem;
  }

  button {
    all: unset;
    border: 3px solid ${colors.colorWhite};
    padding: 0.5rem 1.3rem;
    transform: skew(-20deg);
    display: inline-block;
    transition: all 0.2s;
    color: ${colors.colorWhite};
    font-size: 1.3rem;
    z-index: 200;

    @media only screen and (max-width: ${breakPoints.mediumLite}) {
      align-self: flex-start;
      padding: 0.5rem 1.7rem;
      margin-bottom: 0.5rem;
      margin-top: 0.5rem;
    }

    span {
      display: inline-block;
      transform: skew(20deg);
    }

    &:hover {
      transform: translateY(-3px) skew(-20deg);
      background: ${colors.colorPrimary};
      color: ${colors.colorWhite};
      border: 3px solid ${colors.colorPrimary};
    }
  }
`;

export default function Header({ transparent }) {
  return (
    <HeaderWrapper transparent={transparent}>
      <nav
        className="navbar navbar-expand-lg navbar-expand-md navbar-dark mt-2"
        role="navigation"
      >
        <a className="navbar-brand navbar-logo mt-n4" href="index">
          <Logo />
        </a>
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
            <li className="nav-item active">
              <a className="nav-link text-uppercase mr-5" href="home">
                How To <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-uppercase mr-5" href="games">
                Games
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-uppercase mr-5" href="partner">
                Become a Partner
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link mr-5" href="faqs">
                FAQs
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-uppercase mr-5" href="about">
                About Us
              </a>
            </li>
            <div>
              <button className="mr-2">
                <span>Login</span>
              </button>
              <button className="hero__button">
                <span>Sign Up</span>
              </button>
            </div>
          </ul>
        </div>
      </nav>
    </HeaderWrapper>
  );
}
