import React from "react";
import styled from "styled-components";
import LogoImage from "../../assets/img/FooterLogo.png";

const Image = styled.img`
  height: 15rem;
  margin-bottom: 1rem;
`;

export default function AlternateLogo() {
  return <Image src={LogoImage} alt="Chopbarh Logo" />;
}
