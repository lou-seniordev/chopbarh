import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/Logo.png";
import color from "../../styles/colors";

const FooterWrapper = styled.footer`
  background: #353434;
  min-height: auto;
  padding: 5rem 2rem;
  position: relative;
  text-align: left !important;
`;

const FooterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;

  /* @media screen and (max-width: $bp-medium-lite) {
      justify-content: space-between;
      align-items: flex-start;
    } */

  & > * {
    margin-right: 0.8rem;
    margin-bottom: 0.5rem;
  }
`;

const FooterLinkHeader = styled.div`
  p {
    color: ${color.colorWhite};
    font-weight: 500;
    margin-bottom: 1.2rem;
    font-size: 1.4rem;
  }
`;

const FooterLinkContainer = styled.div`
  p {
    color: ${color.colorWhite};
  }

  a {
    color: #dddddd;
    text-decoration: none;
    transition: all 0.2s;
    font-size: 1.3rem;

    &:hover {
      color: ${color.colorWhite};
      cursor: pointer;
    }
  }
`;

export default function Footer() {
  return (
    <FooterWrapper className="footer">
      <FooterContainer className="footer__container">
        <div>
          <img src={Logo} alt="Logo" />
        </div>
        <div>
          <FooterLinkHeader>
            <p>Chopbarh</p>
          </FooterLinkHeader>
          <FooterLinkContainer>
            <p>
              <Link>About Us</Link>
            </p>
            <p>
              <Link>Terms and Conditions</Link>
            </p>
            <p>
              <Link>Privacy Policy</Link>
            </p>
            <p>
              <Link>Responsible Gambling</Link>
            </p>
            <p>
              <Link>Become a Partner</Link>
            </p>
          </FooterLinkContainer>
        </div>
        <div>
          <FooterLinkHeader>
            <p>Gaming</p>
          </FooterLinkHeader>
          <FooterLinkContainer>
            <p>
              <Link>How to Play</Link>
            </p>
            <p>
              <Link>Games</Link>
            </p>
            <p>
              <Link>Betting</Link>
            </p>
            <p>
              <Link>Download</Link>
            </p>
            <p>
              <Link>Talk to us</Link>
            </p>
          </FooterLinkContainer>
        </div>
        <div className="align-self-start">
          <FooterLinkHeader>
            <p>Contact Us</p>
          </FooterLinkHeader>
          <FooterLinkContainer>
            <p>Telephone: 09038764982</p>
            <p>Email: help@chopbarh.com</p>
            <p>&copy; 2019</p>
          </FooterLinkContainer>
        </div>
      </FooterContainer>
    </FooterWrapper>
  );
}
