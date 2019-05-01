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
  HalfColumn
} from "../../styles/SignUpStyles";
import { AppContext } from "../../../hoc/AppContext";

function CompleteProfile(props) {
  const [formState, { text, tel, date, select, email }] = useFormState();
  const [loading, setLoading] = useState(false);
  const [isOpen, setModalIsOpen] = useState(false);

  const toggle = () => {
    setModalIsOpen(!isOpen);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    formState.values["@class"] = ".LogEventRequest";
    formState.values["eventKey"] = "REGISTER_PLAYER";
    const formValue = JSON.stringify(formState.values);

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
            {({ getUserInfo }) => (
              <Form onSubmit={handleSubmit}>
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
                <HalfColumn>
                  <FormItem className="mr-3">
                    <label>Date of Birth</label>
                    <input {...date("DOB")} required />
                  </FormItem>
                  <FormItem>
                    <label>Sex</label>
                    <select {...select("SEX")}>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </FormItem>
                </HalfColumn>

                <FormItem>
                  <label>Email</label>
                  <input {...email("Email")} required />
                </FormItem>
                <button type="submit" className="mr-2" disabled={loading}>
                  <span>{loading ? "Saving..." : "Save Profile"}</span>
                </button>
              </Form>
            )}
          </AppContext.Consumer>
        </Container>
      </SignUpWrapper>
    </>
  );
}

export default withRouter(CompleteProfile);
