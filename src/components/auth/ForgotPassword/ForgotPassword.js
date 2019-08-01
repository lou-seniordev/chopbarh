import React from "react";
import styled from "styled-components";
import color from "../../styles/colors";
import breakPoints from "../../styles/breakpoints";

const AuthWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100vh;

  @media only screen and (max-width: ${breakPoints.medium}) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
  background: ${color.colorPrimary};

  @media only screen and (max-width: ${breakPoints.medium}) {
    display: none;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 3rem;
`;

const FormItem = styled.div`
  label {
    font-size: 1.4rem;
    font-weight: 600;
    color: #737773;
    margin-bottom: 1rem;
  }

  input {
    color: #8d8e8d;
    width: 35rem;
    height: 3.4rem;
    margin-bottom: 2rem;
    border: 0;
    background: #f6f6f6;
    outline: none;
    padding: 3px 5px;
  }

  & > * {
    display: block;
    font-family: inherit;
  }
`;

const FormAction = styled.div`
  position: relative;

  button {
    all: unset;
    padding: 0.5rem 1.3rem;
    transform: skew(-20deg);
    display: inline-block;
    transition: all 0.2s;
    color: ${color.colorWhite};
    background: ${color.colorPrimary};
    font-size: 1.3rem;
    z-index: 200;
    position: absolute;
    right: 0;

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

      @media screen and (min-color-index: 0) and(-webkit-min-device-pixel-ratio:0) {
        color: #ffffff;
      }
    }

    &:hover {
      transform: translateY(-3px) skew(-20deg);
      background: ${color.colorPrimaryHover};
      color: ${color.colorWhite};
    }
  }
`;

const HeadingTwo = styled.h2`
  font-size: 3.5rem;
  color: #4c4c4c;
  font-weight: bold;

  span {
    display: block;
    font-size: 1.7rem;
    font-weight: 500;
    width: 35rem;
  }
`;

const Divider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5rem 0;

  p {
    color: #4c4c4c;
    font-size: 1.5rem;
    margin: 0 0.5rem;
  }

  &:before {
    content: "";
    background: #4c4c4c;
    height: 1px;
    width: 40%;
  }

  &:after {
    content: "";
    background: #4c4c4c;
    height: 1px;
    width: 40%;
  }
`;

/* 

Change Checkbox styling momentarily to improve UX

*/

export default function ForgotPassword() {
  return (
    <AuthWrapper>
      <ImageContainer />
      <FormWrapper>
        <div>
          <HeadingTwo className="mb-5 mt-n5">
            Forgot Pin?
            <span>We will send a verification pin to your phone or mail</span>
          </HeadingTwo>
          <FormItem>
            <label>Phone Number</label>
            <input type="text" />
          </FormItem>
          <FormAction>
            <button className="mr-2">
              <span style={{ color: "#ffffff" }}>Send</span>
            </button>
          </FormAction>
          <Divider>
            <p>Or</p>
          </Divider>
          <FormItem>
            <label>Email</label>
            <input type="email" />
          </FormItem>
          <FormAction>
            <button className="mr-2">
              <span style={{ color: "#ffffff" }}>Send</span>
            </button>
          </FormAction>
        </div>
      </FormWrapper>
    </AuthWrapper>
  );
}
