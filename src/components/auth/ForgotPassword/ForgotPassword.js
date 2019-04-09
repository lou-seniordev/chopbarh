import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
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
  flex-direction: column;
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
    width: 30rem;
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
    left: 50%;

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
  color: #c5c7c5;
  font-weight: bold;

  span {
    display: block;
    font-size: 1.7rem;
    font-weight: 500;
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
              <span>Send</span>
            </button>
          </FormAction>
          <FormItem>
            <label>Email</label>
            <input type="email" />
          </FormItem>
          <FormAction>
            <button className="mr-2">
              <span>Send</span>
            </button>
          </FormAction>
        </div>
      </FormWrapper>
    </AuthWrapper>
  );
}
