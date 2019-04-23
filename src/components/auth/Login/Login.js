import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  AuthWrapper,
  HeadingTwo,
  ImageContainer,
  FormWrapper,
  FormItem,
  FormCheckBox,
  FormAction,
  SignUpSignal
} from "../../styles/LoginStyles";

export default function Login() {
  return (
    <AuthWrapper>
      <Helmet>
        <title>Chopbarh &rarr; Login</title>
      </Helmet>
      <ImageContainer />
      <FormWrapper>
        <form>
          <HeadingTwo className="mb-5 mt-n5">Login</HeadingTwo>
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
            <Link to="user">
              <button className="mr-2">
                <span>Login</span>
              </button>
            </Link>
          </FormAction>
          <SignUpSignal>
            <span>No Account? </span>
            <Link to="signup">Sign Up</Link>
          </SignUpSignal>
        </form>
      </FormWrapper>
    </AuthWrapper>
  );
}
