import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import color from "../../styles/colors";
import breakPoints from "../../styles/breakpoints";
import Header from "../../UI/Header/Header";
//import Background from "../../assets/svg/WavyHeader.svg";

/*

Swap out the border thing for some Box Shadow and add Placeholders to form inputs

*/
const SignUpWrapper = styled.div`
  height: 60vh;
  background: ${color.colorPrimary};
  margin-top: -26rem;
  z-index: 2000;
  padding: 20rem 10rem;
`;

const Container = styled.div`
  margin: 10rem auto;
  width: 60vw;
  background: #fff;
  padding: 4rem 10rem;
  border: 1px solid gray;

  @media only screen and (max-width: ${breakPoints.mediumLite}) {
    padding: 4rem 5rem;
  }
`;

const HeadingTwo = styled.h2`
  font-size: 2.5rem;
  color: ${color.colorPrimary};
  /* color: #c5c7c5; */
  font-weight: bold;
  text-align: center;
`;

const Form = styled.form`
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

    span {
      display: inline-block;
      transform: skew(20deg);
      color: #fff;
    }

    &:hover {
      transform: translateY(-3px) skew(-20deg) translateX(-50%);
      background: ${color.colorPrimaryHover};
      color: ${color.colorWhite};
    }
  }
`;

const FormItem = styled.div`
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

const HalfColumn = styled.div`
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

const LoginSignal = styled.div`
  margin-top: 6rem;

  p {
    text-align: center;
  }

  a {
    color: ${color.colorPrimary};
  }
`;

// const Image = styled.img`
//   width: 100%;
//   height: 10%;
//   margin-top: -8rem;
// `;

export default function SignUp() {
  return (
    <>
      <Header transparent />
      {/* <Image src={Background} alt="Background" /> */}
      <SignUpWrapper>
        <Container>
          <Form>
            <HeadingTwo className="mb-4">Sign Up</HeadingTwo>
            <FormItem>
              <label>Full Name</label>
              <input type="text" required />
            </FormItem>
            <FormItem>
              <label>Phone Number</label>
              <input type="tel" required />
            </FormItem>
            <HalfColumn>
              <FormItem className="mr-3">
                <label>Date of Birth</label>
                <input type="date" required />
              </FormItem>
              <FormItem>
                <label>Sex</label>
                <select>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </FormItem>
            </HalfColumn>
            <HalfColumn>
              <FormItem className="mr-3">
                <label>Enter Pin (4 to 6 digits)</label>
                <input type="password" required />
              </FormItem>
              <FormItem>
                <label>Re-enter Pin</label>
                <input type="password" required />
              </FormItem>
            </HalfColumn>
            <FormItem>
              <label>Email</label>
              <input type="email" required />
            </FormItem>
            <button type="submit" className="mr-2">
              <span>Create Account</span>
            </button>
            <LoginSignal>
              <p>By clicking, you agree to our Terms and Conditions</p>
              <p>
                Already have an account? <Link> Login</Link>
              </p>
            </LoginSignal>
          </Form>
        </Container>
      </SignUpWrapper>
    </>
  );
}
