import React from "react";
import styled from "styled-components";
import color from "../../styles/colors";
import Header from "../../UI/Header/Header";
import Background from "../../assets/svg/WavyHeader.svg";

const SignUpWrapper = styled.div`
  height: 30vh;
`;

const Image = styled.img`
  width: 100%;
  margin-top: -8rem;
`;

export default function SignUp() {
  return (
    <>
      <Header transparent />
      <Image src={Background} alt="Background" />
      <SignUpWrapper />
    </>
  );
}
