import React from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
// import { useFormState } from "react-use-form-state";
// import axios from "axios";
// import { Modal, ModalBody } from "reactstrap";
import Header from "../../UI/Header/Header";
// import {
//   SignUpWrapper,
//   Container,
//   HeadingTwo,
//   Form,
//   FormItem,
//   HalfColumn
// } from "../../styles/SignUpStyles";

function CompleteProfile({ getUserInfo, history }) {
  // const [formState, { text, tel, date, select, email }] = useFormState({
  //   FULL_NAME: getUserInfo.displayName,
  //   SEX: "M"
  // });
  // const [loading, setLoading] = useState(false);
  // const [isOpen, setModalIsOpen] = useState(false);

  // const toggle = () => {
  //   setModalIsOpen(!isOpen);
  // };

  // const handleSubmit = event => {
  //   event.preventDefault();
  //   setLoading(true);
  //   formState.values["@class"] = ".LogEventRequest";
  //   formState.values["eventKey"] = "REGISTER_PLAYER";
  //   formState.values["playerId"] = getUserInfo.userId;
  //   const formValue = JSON.stringify(formState.values);

  //   axios(
  //     "https://c373328ysyuR.preview.gamesparks.net/rs/debug/AtfFvlREyWLhhmtWKbG13ASCyTCLLlm5/RegistrationRequest",
  //     {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       data: formValue
  //     }
  //   )
  //     .then(response => {
  //       if (response.data.error) {
  //         setLoading(false);
  //         setModalIsOpen(true);
  //       } else {
  //         setLoading(false);
  //         //localStorage.setItem("chopbarh-id", response.data.userId);
  //         history.push("/user");
  //       }
  //     })
  //     .catch(err => {
  //       setModalIsOpen(true);
  //       setLoading(false);
  //     });
  // };

  return (
    <>
      {/* <Helmet title={`Chopbarh \u{2192} Complete Profile`} /> */}
      <Header />
      {/* <SignUpWrapper>
        <Modal isOpen={isOpen} toggle={toggle} className="pt-5 mt-4">
          <ModalBody className="text-center">
            <h2>Ooops!</h2>
            <p>Something went wrong</p>
          </ModalBody>
        </Modal>
        <Container>
              <Form onSubmit={handleSubmit}>
                <HeadingTwo className="mb-4">Complete Profile</HeadingTwo>
                <FormItem>
                  <label>Full Name</label>
                  <input {...text("FULL_NAME")} required />
                </FormItem>
                <FormItem>
                  <label>Phone Number</label>
                  <input
                    {...tel("PHONE_NUM")}
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
                      <option disabled>---</option>
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
        </Container>
      </SignUpWrapper> */}
    </>
  );
}

export default withRouter(CompleteProfile);
