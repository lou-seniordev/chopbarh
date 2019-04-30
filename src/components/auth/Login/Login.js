import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { withRouter, Link } from "react-router-dom";
import { useFormState } from "react-use-form-state";
import axios from "axios";
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

function Login(props) {
  const [formState, { tel, password }] = useFormState();

  const [loading, setLoading] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setLoading({ loading: true });
    // API request here
    // Add possible validation here too
    formState.values["@class"] = ".AuthenticationRequest";
    // console.log(formState.values);
    const formValue = JSON.stringify(formState.values);

    axios(
      "https://c373328ysyuR.preview.gamesparks.net/rs/debug/AtfFvlREyWLhhmtWKbG13ASCyTCLLlm5/AuthenticationRequest",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        data: formValue
      }
    )
      .then(response => {
        localStorage.setItem("chopbarh-token", response.data.authToken);
        localStorage.setItem("chopbarh-id", response.data.userId);
        setLoading({ loading: false });
        props.history.push("/user");
      })
      .catch(err => {
        console.Console(err);
        setLoading({ loading: false });
      });
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
            <input {...tel("userName")} required />
          </FormItem>
          <FormItem>
            <label>Enter Pin</label>
            <input
              {...password("password")}
              required
              minLength="4"
              maxLength="6"
            />
          </FormItem>
          <FormAction>
            <FormCheckBox>
              <label>Remember Me</label>
              <input type="checkbox" />
            </FormCheckBox>
            <button type="submit" disabled={loading} className="mr-2">
              <span>{loading ? "Please wait..." : "Login"}</span>
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

export default withRouter(Login);
