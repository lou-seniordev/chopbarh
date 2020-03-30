import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Header from "../UI/Header/Header";
import { Phone } from "grommet-icons";
import WhatsAppIcon from "../assets/svg/WhatsAppIcon.svg";
import { HeadingTwo } from "../Home/Hero/Hero";

const ContactUsWrapper = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  p {
    font-size: 1.9rem;
  }
`;

const ImageContainer = styled.div``;

export default function ContactUs() {
  return (
    <>
      <Helmet title={`Chopbarh \u{2192} Contact Us`} />
      <Header />
      <ContactUsWrapper>
        <HeadingTwo>Contact Us</HeadingTwo>
        <ImageContainer className="mb-3">
          <Phone />
          <img
            src={WhatsAppIcon}
            alt="Whatsapp Icon"
            className="ml-3"
            height="30"
          />
        </ImageContainer>
        <p>0814-597-1022</p>
        <p>0704-388-8516</p>
        <p>0903-662-3253</p>
      </ContactUsWrapper>
    </>
  );
}
