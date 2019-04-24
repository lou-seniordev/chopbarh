import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useFormState } from 'react-use-form-state';
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
  const [formState, { tel, password,  }] = useFormState();

  const handleSubmit = event => {
    event.preventDefault();
    // API request here
    console.log(formState)
  };

  return (
    <AuthWrapper>
      <Helmet>
        <title>Chopbarh &rarr; Login</title>
      </Helmet>
      <ImageContainer />
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <HeadingTwo className="mb-5 mt-n5">Login</HeadingTwo>
          <FormItem>
            <label>Phone Number</label>
            <input
              {...tel('number')} required
            />
          </FormItem>
          <FormItem>
            <label>Enter Pin</label>
            <input
            {...password('password')} required minLength="4" maxLength="6"
            />
          </FormItem>
          <FormAction>
            <FormCheckBox>
              <label>Remember Me</label>
              <input type="checkbox" />
            </FormCheckBox>
            <button type="submit" className="mr-2">
              <span>Login</span>
            </button>
            {/* <Link to="user">
              <button className="mr-2">
                <span>Login</span>
              </button>
            </Link> */}
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
