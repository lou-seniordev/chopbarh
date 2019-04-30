import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { withRouter, Link } from "react-router-dom";
import { useFormState } from "react-use-form-state";
import axios from "axios";
import { Modal, ModalBody } from "reactstrap";
import {
  AuthWrapper,
  HeadingTwo,
  ImageContainer,
  FormWrapper,
  FormItem,
  FormCheckBox,
  FormAction,
  SignUpSignal,
  ErrorText
} from "../../styles/LoginStyles";
import { AppContext } from "../../../hoc/AppContext";

function Login(props) {
  const [formState, { tel, password }] = useFormState();
  const [loading, setLoading] = useState(false);
  const [isOpen, setModalIsOpen] = useState(false);

  const toggle = () => {
    setModalIsOpen(!isOpen);
  };

  const handleSubmit = (event, authUpdate) => {
    event.preventDefault();
    setLoading(true);
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
        if (response.data.error) {
          setLoading(false);
          console.log(response.data.error);
          setModalIsOpen(true);
          // Error Handling here
        } else {
          localStorage.setItem("chopbarh-token", response.data.authToken);
          localStorage.setItem("chopbarh-id", response.data.userId);
          authUpdate();
          setLoading(false);
          props.history.push("/user");
        }
      })
      .catch(err => {
        setModalIsOpen(true);
        setLoading(false);
      });
  };

  return (
    <AuthWrapper>
      <Helmet>
        <title>Chopbarh &rarr; Login</title>
      </Helmet>
      <ImageContainer />
      <FormWrapper>
        <Modal isOpen={isOpen} toggle={toggle} className="pt-5 mt-4">
          <ModalBody className="text-center">
            <h2>Ooops!</h2>
            <p>Something went wrong. Please try again</p>
          </ModalBody>
        </Modal>
        <AppContext.Consumer>
          {({ authUpdate }) => (
            <form onSubmit={event => handleSubmit(event, authUpdate)}>
              <HeadingTwo className="mb-5 mt-n5">Login</HeadingTwo>
              <FormItem>
                <label>Phone Number</label>
                <input
                  {...tel({
                    name: "userName",
                    validate: (value, values, e) => {
                      if (value.length !== 11) {
                        return "Phone Number length must be 11";
                      }
                    }
                  })}
                  required
                />
                {formState.errors.userName && (
                  <ErrorText className="mt-n4 mb-2">
                    Phone Number should be 11
                  </ErrorText>
                )}
              </FormItem>
              <FormItem>
                <label>Enter Pin</label>
                <input
                  {...password({
                    name: "password",
                    validate: (value, values, e) => {
                      if (value.length !== 4) {
                        return "Password length must be 4";
                      }
                    }
                  })}
                  required
                  minLength="4"
                  maxLength="4"
                />
                {formState.errors.userName && (
                  <ErrorText className="mt-n4 mb-3">
                    Password should be 4 characters long
                  </ErrorText>
                )}
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
          )}
        </AppContext.Consumer>
      </FormWrapper>
    </AuthWrapper>
  );
}

export default withRouter(Login);
