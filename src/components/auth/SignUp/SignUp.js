import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { withRouter, Link } from "react-router-dom";
import { useFormState } from "react-use-form-state";
import axios from "axios";
import { Modal, ModalBody } from "reactstrap";
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
import { AppContext } from "../../../hoc/AppContext";

function SignUp(props) {
  const [formState, { text, tel, password }] = useFormState();
  const [loading, setLoading] = useState(false);
  const [isOpen, setModalIsOpen] = useState(false);

  const toggle = () => {
    setModalIsOpen(!isOpen);
  };

  const handleSubmit = (event, setUserInfo) => {
    event.preventDefault();
    setLoading(true);
    formState.values["@class"] = ".RegistrationRequest";
    const formValue = JSON.stringify(formState.values);
    setUserInfo(JSON.parse(formValue));
    props.history.push("/complete_profile");
    // axios(
    //   "https://c373328ysyuR.preview.gamesparks.net/rs/debug/AtfFvlREyWLhhmtWKbG13ASCyTCLLlm5/RegistrationRequest",
    //   {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json"
    //     },
    //     data: formValue
    //   }
    // )
    //   .then(response => {
    //     if (response.data.error) {
    //       setLoading(false);
    //       setModalIsOpen(true);
    //     } else {
    //       localStorage.setItem("chopbarh-token", response.data.authToken);
    //       localStorage.setItem("chopbarh-id", response.data.userId);
    //       setUserInfo(JSON.parse(formValue));
    //       setLoading(false);
    //       props.history.push("/user");
    //     }
    //   })
    //   .catch(err => {
    //     setModalIsOpen(true);
    //     setLoading(false);
    //   });
  };

  return (
    <>
      <Helmet>
        <title>Chopbarh &rarr; Sign Up</title>
      </Helmet>
      <Header />
      <SignUpWrapper>
        <Modal isOpen={isOpen} toggle={toggle} className="pt-5 mt-4">
          <ModalBody className="text-center">
            <h2>Ooops!</h2>
            <p>Something went wrong</p>
          </ModalBody>
        </Modal>
        <Container>
          <AppContext.Consumer>
            {({ setUserInfo }) => (
              <Form onSubmit={event => handleSubmit(event, setUserInfo)}>
                <HeadingTwo className="mb-4">Sign Up</HeadingTwo>
                <FormItem>
                  <label>Full Name</label>
                  <input {...text("displayName")} required />
                </FormItem>
                <FormItem>
                  <label>Phone Number</label>
                  <input
                    {...tel("userName")}
                    required
                    minLength="11"
                    maxLength="11"
                  />
                </FormItem>
                {/* <HalfColumn>
              <FormItem className="mr-3">
                <label>Date of Birth</label>
                <input {...date("dob")} required />
              </FormItem>
              <FormItem>
                <label>Sex</label>
                <select {...select("sex")}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </FormItem>
            </HalfColumn> */}
                <HalfColumn>
                  <FormItem className="mr-3">
                    <label>Enter Password Pin (4 digits)</label>
                    <input
                      {...password("password")}
                      required
                      minLength="4"
                      maxLength="4"
                    />
                  </FormItem>
                  <FormItem>
                    <label>Re-enter Password Pin</label>
                    <input
                      type="password"
                      required
                      minLength="4"
                      maxLength="4"
                    />
                  </FormItem>
                </HalfColumn>
                {/* <FormItem>
              <label>Email</label>
              <input {...email("email")} required />
            </FormItem> */}
                <button type="submit" className="mr-2" disabled={loading}>
                  <span>{loading ? "Please wait..." : "Create Account"}</span>
                </button>
                <LoginSignal>
                  <p>By clicking, you agree to our Terms and Conditions</p>
                  <p>
                    Already have an account? <Link to="login">Login</Link>
                  </p>
                </LoginSignal>
              </Form>
            )}
          </AppContext.Consumer>
        </Container>
      </SignUpWrapper>
    </>
  );
}

export default withRouter(SignUp);
