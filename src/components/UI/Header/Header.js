import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import colors from "../../styles/colors";
import breakPoints from "../../styles/breakpoints";
import Logo from "../Logo/Logo";
import WhatsAppIcon from "../../assets/svg/WhatsAppIcon.svg";

const HeaderWrapper = styled.div`
  background: ${props =>
    props.transparent ? "transparent" : `${colors.colorGrayDarkOne}`};
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
      color: #fff;

      @media screen and (min-color-index: 0) and (-webkit-min-device-pixel-ratio: 0) {
        color: #ffffff;
      }
    }

    &:hover {
      transform: translateY(-3px) skew(-20deg);
      background: ${colors.colorPrimary};
      color: ${colors.colorWhite};
      border: 3px solid ${colors.colorPrimary};
    }
  }
`;

class Header extends Component {
  render() {
    return (
      <HeaderWrapper transparent={this.props.transparent}>
        <nav
          className="navbar navbar-expand-lg navbar-dark mt-2"
          role="navigation"
        >
          <Link className="navbar-brand navbar-logo mt-n4" to="/">
            <Logo />
          </Link>
          <MediaQuery maxDeviceWidth={991}>
            <Link to="contacts">
              <div
                // className="nav-item mt-4"
                style={{
                  color: "#fff",
                  textTransform: "uppercase",
                  fontSize: "1.35rem",
                  marginLeft: "-1.2rem",
                  border: "1px solid #aaa",
                  padding: ".5rem",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                <span className="mr-3">Contact Us:</span>
                <img src={WhatsAppIcon} alt="Whatsapp Icon" height="20" />
              </div>
            </Link>
          </MediaQuery>
          <button
            className="navbar-toggler custom-toggler mt-3"
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
            <ul className="navbar-nav ml-auto mr-auto">
              <MediaQuery minDeviceWidth={991}>
                <Link to="contacts">
                  <div
                    // className="nav-item mt-4"
                    style={{
                      color: "#fff",
                      textTransform: "uppercase",
                      fontSize: "1.35rem",
                      marginLeft: "-1.2rem",
                      border: "1px solid #aaa",
                      padding: ".5rem",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "2px",
                      cursor: "pointer",
                    }}
                  >
                    <span className="mr-3">Contact Us:</span>
                    <img src={WhatsAppIcon} alt="Whatsapp Icon" height="20" />
                  </div>
                </Link>
              </MediaQuery>
            </ul>
            <ul className="navbar-nav">
              {/* <li className="nav-item">
                <a
                  href="https://chopbarh.zendesk.com/hc"
                  className="nav-link text-uppercase mr-5"
                >
                  How to
                </a>
              </li> */}
              <li className="nav-item">
                <Link to="games" className="nav-link text-uppercase mr-5">
                  Games
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="vendors" className="nav-link text-uppercase mr-5">
                  Become a Chopbarh Agent
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to="faqs" className="nav-link text-uppercase mr-5">
                  FAQs
                </Link>
              </li>
              <li className="nav-item">
                <Link to="about" className="nav-link text-uppercase mr-5">
                  About Us
                </Link>
              </li>
              {this.props.isAuthenticated && (
                <li className="nav-item">
                  <Link to="user" className="nav-link text-uppercase mr-5">
                    Dashboard
                  </Link>
                </li>
              )}
              {!this.props.isAuthenticated && (
                <div>
                  <button className="mr-2">
                    <Link to="login">
                      <span style={{ color: "#ffffff" }}>Login</span>
                    </Link>
                  </button>
                  <button>
                    <Link to="signup">
                      <span style={{ color: "#ffffff" }}>Sign Up</span>
                    </Link>
                  </button>
                </div>
              )}
            </ul>
          </div>
        </nav>
      </HeaderWrapper>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(Header);
