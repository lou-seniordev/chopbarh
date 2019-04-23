import React, { useState } from "react";
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
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const handleInputChange = ({ target }) => {
    setState(state => ({ ...state, [target.name]: target.value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    // API request here
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
              type="text"
              name="username"
              value={state.username}
              onChange={handleInputChange}
            />
          </FormItem>
          <FormItem>
            <label>Enter Pin</label>
            <input
              type="password"
              name="password"
              value={state.password}
              onChange={handleInputChange}
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
