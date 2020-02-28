import styled from "styled-components";
import color from "./colors";
import breakPoints from "./breakpoints";
import Background from "../assets/svg/WavyHeader.svg";

export const SignUpWrapper = styled.div`
  height: 60vh;
  background: ${color.colorPrimary} url(${Background});
  margin-top: -26rem;
  z-index: 2000;
  padding: 20rem 10rem;

  @media only screen and (max-width: ${breakPoints.small}) {
    padding: 20rem 5rem;
  }

  @media only screen and (max-width: ${breakPoints.smaller}) {
    padding: 20rem 0rem;
  }
`;

export const Container = styled.div`
  margin: 10rem auto;
  width: 60vw;
  background: #fff;
  padding: 4rem 10rem;
  box-shadow: 0px 8px 15px 0px rgba(214, 207, 214, 0.83);

  @media only screen and (max-width: ${breakPoints.mediumLite}) {
    padding: 4rem 5rem;
  }

  @media only screen and (max-width: ${breakPoints.small}) {
    width: 80vw;
    padding: 4rem 1rem;
  }
`;

export const HeadingTwo = styled.h2`
  font-size: 2.5rem;
  color: ${color.colorPrimary};
  /* color: #c5c7c5; */
  font-weight: bold;
  text-align: center;
`;

export const Form = styled.form`
  position: relative;

  button {
    all: unset;
    padding: 0.5rem 1.3rem;
    display: inline-block;
    position: absolute;
    left: 50%;
    transform: skew(-20deg) translateX(-50%);
    transition: all 0.2s;
    color: ${color.colorWhite};
    background: ${color.colorPrimary};
    font-size: 1.3rem;
    z-index: 200;

    @media only screen and (max-width: ${breakPoints.mediumLite}) {
      font-size: 1.1rem;
    }

    span {
      display: inline-block;
      transform: skew(20deg);
      color: #ffffff;

      @media screen and (min-color-index: 0) and(-webkit-min-device-pixel-ratio:0) {
        -webkit-text-fill-color: rgba(255, 255, 255, 1);
        -webkit-opacity: 1;
        color: rgba(255, 255, 255, 1);
      }
    }

    &:hover {
      transform: translateY(-3px) skew(-20deg) translateX(-50%);
      background: ${color.colorPrimaryHover};
      color: ${color.colorWhite};
    }
  }
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

export const FormTextArea = styled.div`
  label {
    font-size: 1.4rem;
    font-weight: 600;
    color: #737773;
    margin-bottom: 1rem;
  }

  input {
    color: #8d8e8d;
    width: 100%;
    height: 6rem;
    margin-bottom: 2rem;
    border: 0;
    background: #f6f6f6;
    outline: none;
    padding-top: 0;
    padding-left: 3px;
  }

  & > * {
    display: block;
    font-family: inherit;
  }
`;

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

export const LoginSignal = styled.div`
  margin-top: 6rem;

  p {
    text-align: center;
  }

  a {
    color: ${color.colorPrimary};
  }
`;

export const ErrorText = styled.span`
  color: #c50000;
`;
