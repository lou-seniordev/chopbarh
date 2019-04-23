import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../UI/Header/Header";
import {
  SignUpWrapper,
  Container,
  HeadingTwo,
  Form,
  FormItem,
  HalfColumn,
  LoginSignal
} from "../../styles/SignUpStyles";

export default function SignUp() {
  return (
    <>
      <Header />
      <Helmet>
        <title>Chopbarh &rarr; Sign Up</title>
      </Helmet>
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
                <input type="password" required minLength="4" maxLength="6" />
              </FormItem>
              <FormItem>
                <label>Re-enter Pin</label>
                <input type="password" required minLength="4" maxLength="6" />
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
                Already have an account? <Link to="login">Login</Link>
              </p>
            </LoginSignal>
          </Form>
        </Container>
      </SignUpWrapper>
    </>
  );
}
