import React from "react";
import styled from "styled-components";
import colors from "../styles/colors";

const HeaderWrapper = styled.div`
  background: ${colors.colorGrayDarkOne} !important;
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

export default function Header() {
  return (
    <HeaderWrapper>
      <nav
        class="navbar navbar-expand-lg navbar-expand-md navbar-dark mt-2"
        role="navigation"
      >
        <a class="navbar-brand navbar-logo" href="index.html">
          <img src="assets/img/Chopbarr@2x.png" alt="Logo" />
        </a>
        <button
          class="navbar-toggler custom-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto" />
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link text-uppercase mr-5" href="home">
                How To <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-uppercase mr-5" href="games">
                Games
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link mr-5" href="faqs">
                FAQs
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-uppercase mr-5" href="about">
                About Us
              </a>
            </li>
            <button class="mr-2">
              <span>Login</span>
            </button>
            <button class="hero__button">
              <span>Sign Up</span>
            </button>
          </ul>
          {/* <form class="form-inline my-2 my-lg-0">
            <div class="form__container mr-sm-2">
              <input
                class="form-login mr-sm-2"
                type="tel"
                placeholder="Phone Number"
                aria-label="Phone Number"
              />
            </div>
            <div class="form__container">
              <input
                class="form-login mr-sm-2"
                type="password"
                placeholder="Password"
                aria-label="Password"
              />
              <button>Login</button>
            </div>
            <button class="btn my-2 my-sm-0" type="submit">
              Sign Up
            </button>
          </form>  */}
        </div>
      </nav>
    </HeaderWrapper>
  );
}
