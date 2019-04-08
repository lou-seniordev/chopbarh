import React from "react";
import styled from "styled-components";
import LogoImage from "../../assets/img/Logo.png";

const Image = styled.img`
  object-fit: contain;
`;

export default function Logo({ width }) {
  return (
    <div>
      <Image src={LogoImage} width="70px" alt="Logo" />
    </div>
  );
}
