import React from "react";
import styled from "styled-components";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const FormCheckBox = styled.div`
  display: flex;
  align-items: center;

  label {
    order: 2;
    margin-top: 5px;
    margin-left: 5px;
    font-size: 1.3rem;
  }
`;

const FormAction = styled.div`
  display: flex;
  justify-content: space-between;

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

export default function Card() {
  return (
    <FormWrapper>
      <form>
        <FormItem>
          <label>Phone Number</label>
          <input type="text" />
        </FormItem>
        <FormItem>
          <label>Enter Pin</label>
          <input type="password" />
        </FormItem>
        <FormAction>
          <FormCheckBox>
            <label>Remember Me</label>
            <input type="checkbox" />
          </FormCheckBox>
          {/* <button type="submit" className="mr-2">
              <span>Login</span>
            </button> */}
          <button className="mr-2">
            <span>Login</span>
          </button>
        </FormAction>
      </form>
    </FormWrapper>
  );
}
