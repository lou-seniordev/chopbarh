import React from "react";
import styled from "styled-components";
import color from "../../styles/colors";
import Header from "../../UI/Header/Header";

const SignUpWrapper = styled.div`
  background: ${color.colorPrimary};
`;

export default function SignUp() {
  return (
    <>
      <Header transparent />
      <SignUpWrapper />
    </>
  );
}
