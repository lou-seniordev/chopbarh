import React from "react";
import styled from "styled-components";
import color from "../../styles/colors";
import breakPoints from "../../styles/breakpoints";
import Header from "../../UI/Header/Header";
//import Background from "../../assets/svg/WavyHeader.svg";

/*

Swap out the border thing for some Box Shadow

*/
const SignUpWrapper = styled.div`
  height: 40vh;
  background: ${color.colorPrimary};
  margin-top: -10rem;
  z-index: 2000;
  padding: 10rem;
`;

const Container = styled.div`
  margin: 10rem auto;
  width: 60vw;
  background: #fff;
  padding: 4rem 10rem;
  border: 1px solid gray;
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

    /* @media only screen and (max-width: ${breakPoints.mediumLite}) {
      align-self: flex-start;
      padding: 0.5rem 1.7rem;
      margin-bottom: 0.5rem;
      margin-top: 0.5rem;
    } */

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

  div {
    width: 50%;
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
            <FormItem>
              <label>Email</label>
              <input type="email" required />
            </FormItem>
            <button type="submit" className="mr-2">
              <span>Create Account</span>
            </button>
          </Form>
        </Container>
      </SignUpWrapper>
    </>
  );
}
