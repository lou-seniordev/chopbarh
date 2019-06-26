import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
// import axios from "axios";
import { Modal, ModalBody } from "reactstrap";
import Header from "../../UI/Header/Header";
import {
  SignUpWrapper,
  Container,
  HeadingTwo,
  Form,
  FormItem
} from "../../styles/SignUpStyles";

function SetNickname(props) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setModalIsOpen] = useState(false);

  const toggle = () => {
    setModalIsOpen(!isOpen);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
  };

  return (
    <>
      <Helmet title={`Chopbarh \u{2192} Set Nickname`} />

      <Header />
      <SignUpWrapper>
        <Modal isOpen={isOpen} toggle={toggle} className="pt-5 mt-4">
          <ModalBody className="text-center">
            <h2>Ooops!</h2>
            <p>Something went wrong</p>
          </ModalBody>
        </Modal>
        <Container>
          <Form onSubmit={handleSubmit}>
            <HeadingTwo className="mb-4">Set Nickname</HeadingTwo>
            <FormItem>
              <label>Nickname</label>
              {/* <input {...text("NickName")} required /> */}
            </FormItem>
            <button type="submit" className="mr-2" disabled={loading}>
              <span>{loading ? "Please wait..." : "Submit"}</span>
            </button>
          </Form>
        </Container>
      </SignUpWrapper>
    </>
  );
}

export default withRouter(SetNickname);
