import React from "react";
import styled from "styled-components";
import color from "../../styles/colors";
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
  display: flex;
  justify-content: center;
  margin: 10rem auto;
  width: 60vw;
  background: #fff;
  padding: 2rem;
  border: 1px solid gray;
`;

const HeadingTwo = styled.h2`
  font-size: 2.5rem;
  color: ${color.colorPrimary};
  /* color: #c5c7c5; */
  font-weight: bold;
`;

const Form = styled.form`
  div {
    display: block;
  }
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
            <HeadingTwo>Sign Up</HeadingTwo>
            <FormItem>
              <label>Full Name</label>
              <input type="text" />
            </FormItem>
            <div>
              <label>Full Name</label>
              <input type="text" />
            </div>
          </Form>
        </Container>
      </SignUpWrapper>
    </>
  );
}
