import React from "react";
import styled from "styled-components";
import breakPoints from "../../styles/breakpoints";

const AuthWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100vh;

  @media only screen and (max-width: ${breakPoints.mediumLite}) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
  background: pink;

  @media only screen and (max-width: ${breakPoints.mediumLite}) {
    display: none;
  }
`;

const FormWrapper = styled.div`
  background: peru;
`;

export default function Login() {
  return (
    <AuthWrapper>
      <ImageContainer>IMAGE</ImageContainer>
      <FormWrapper>FORM</FormWrapper>
    </AuthWrapper>
  );
}
