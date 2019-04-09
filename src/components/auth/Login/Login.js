import React from "react";
import styled from "styled-components";
import color from "../../styles/colors";
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
  background: ${color.colorPrimary};

  @media only screen and (max-width: ${breakPoints.mediumLite}) {
    display: none;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormItem = styled.div`
  & > * {
    display: block;
  }
`;

export default function Login() {
  return (
    <AuthWrapper>
      <ImageContainer />
      <FormWrapper>
        <div>
          <h2>Login</h2>
          <FormItem>
            <label>Phone Number</label>
            <input type="text" />
          </FormItem>
          <FormItem>
            <label>Enter Pin</label>
            <input type="password" />
          </FormItem>
        </div>
      </FormWrapper>
    </AuthWrapper>
  );
}
