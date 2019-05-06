import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { useFormState } from "react-use-form-state";
import axios from "axios";
import { Modal, ModalBody } from "reactstrap";
import Header from "../../UI/Header/Header";
import {
  SignUpWrapper,
  Container,
  HeadingTwo,
  Form,
  FormItem
} from "../../styles/SignUpStyles";
import { AppContext } from "../../../hoc/AppContext";

const OTPWrapper = styled(SignUpWrapper)``;

const OTPContainer = styled(Container)`
  margin: 14rem auto;
`;

function OTP(props) {
  const [formState, { text }] = useFormState();
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
    axios(
      "https://c373328ysyuR.preview.gamesparks.net/rs/debug/AtfFvlREyWLhhmtWKbG13ASCyTCLLlm5/RegistrationRequest",
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
          setModalIsOpen(true);
        } else {
          localStorage.setItem("chopbarh-token", response.data.authToken);
          localStorage.setItem("chopbarh-id", response.data.userId);
          setUserInfo(JSON.parse(formValue));
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
    <>
      <Helmet>
        <title>Chopbarh &rarr; Confirm Registration</title>
      </Helmet>
      <Header />
      <OTPWrapper>
        <Modal isOpen={isOpen} toggle={toggle} className="pt-5 mt-4">
          <ModalBody className="text-center">
            <h2>Ooops!</h2>
            <p>Something went wrong</p>
          </ModalBody>
        </Modal>
        <OTPContainer>
          <AppContext.Consumer>
            {({ setUserInfo }) => (
              <Form onSubmit={event => handleSubmit(event, setUserInfo)}>
                <HeadingTwo className="mb-4">Phone Verification</HeadingTwo>

                <FormItem>
                  <label>OTP</label>
                  <input
                    {...text("OTP")}
                    required
                    minLength="4"
                    maxLength="4"
                  />
                </FormItem>
                <button type="submit" className="mr-2" disabled={loading}>
                  <span>{loading ? "Please wait..." : "Submit"}</span>
                </button>
              </Form>
            )}
          </AppContext.Consumer>
        </OTPContainer>
      </OTPWrapper>
    </>
  );
}

export default withRouter(OTP);
