import styled from "styled-components";
import color from "./colors";
import breakPoints from "./breakpoints";

export const Form = styled.form`
  position: relative;
  min-height: 36rem;
`;

export const FormSubmitButton = styled.button`
  all: unset;
  padding: 0.5rem 1.3rem;
  display: inline-block;
  position: absolute;
  left: 50%;
  transform: skew(-20deg) translateX(-50%);
  transition: all 0.2s;
  color: ${color.colorWhite};
  -webkit-text-fill-color: #ffffff;
  background: ${color.colorPrimary};
  font-size: 1.3rem;
  z-index: 200;

  @media only screen and (max-width: ${breakPoints.mediumLite}) {
    font-size: 1.1rem;
  }

  span {
    display: inline-block;
    transform: skew(20deg);
    color: #fff;
    -webkit-text-fill-color: #ffffff;
  }

  &:hover {
    transform: translateY(-3px) skew(-20deg) translateX(-50%);
    background: ${color.colorPrimaryHover};
    color: ${color.colorWhite};
  }
`;

export const Button = styled.button`
  all: unset;
  padding: 0.5rem 1.3rem;
  display: inline-block;
  transform: skew(-20deg);
  transition: all 0.2s;
  color: ${color.colorWhite};
  background: ${color.colorPrimary};
  font-size: 1.3rem;
  z-index: 200;
  -webkit-text-fill-color: #ffffff;

  @media only screen and (max-width: ${breakPoints.mediumLite}) {
    font-size: 1.1rem;
  }

  span {
    display: inline-block;
    transform: skew(20deg);
    color: #fff;
    -webkit-text-fill-color: #ffffff;
  }

  &:hover {
    transform: translateY(-3px) skew(-20deg);
    background: ${color.colorPrimaryHover};
    color: ${color.colorWhite};
  }
`;

export const ExistingCardForm = styled(Form)`
  min-height: 7rem;

  input {
    margin-bottom: 1rem;
  }
`;

export const RemoveButton = styled.span`
  background: #272626;
  color: #fff;
  font-size: 0.8rem;
`;

export const FormItem = styled.div`
  label {
    font-size: 1.4rem;
    font-weight: 600;
    color: #737773;
    margin-bottom: 1rem;
  }

  input,
  select {
    color: #8d8e8d;
    width: 100%;
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

export const ExistingCardFormItem = styled(FormItem)``;

export const HalfColumn = styled.div`
  display: flex;

  @media only screen and (max-width: ${breakPoints.large}) {
    flex-direction: column;
  }

  div {
    width: 50%;

    @media only screen and (max-width: ${breakPoints.large}) {
      width: 100%;
    }
  }
`;
