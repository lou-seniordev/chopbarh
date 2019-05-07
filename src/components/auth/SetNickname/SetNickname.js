import React, { useState } from "react";
import { Helmet } from "react-helmet";
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

function SetNickname(props) {
  const [formState, { text }] = useFormState();
  const [loading, setLoading] = useState(false);
  const [isOpen, setModalIsOpen] = useState(false);

  const toggle = () => {
    setModalIsOpen(!isOpen);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    formState.values["@class"] = ".LogEventRequest";
    formState.values["eventKey"] = ".LogEventRequest";
    formState.values["playerId"] = localStorage.getItem("chopbarh-id")
      ? localStorage.getItem("chopbarh-id")
      : null;

    const formValue = JSON.stringify(formState.values);
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
        <title>Chopbarh &rarr; Set Nickname</title>
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
              <Form onSubmit={handleSubmit}>
                <HeadingTwo className="mb-4">Set Nickname</HeadingTwo>
                <FormItem>
                  <label>Nickname</label>
                  <input {...text("NickName")} required />
                </FormItem>
                <button type="submit" className="mr-2" disabled={loading}>
                  <span>{loading ? "Please wait..." : "Submit"}</span>
                </button>
              </Form>
            )}
          </AppContext.Consumer>
        </Container>
      </SignUpWrapper>
    </>
  );
}

export default withRouter(SetNickname);
