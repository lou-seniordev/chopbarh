import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useFormState } from "react-use-form-state";
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

export default function SignUp() {
  const [formState, { text, tel, password }] = useFormState();

  const handleSubmit = event => {
    event.preventDefault();
    // API request here
    // Add possible validation here too
    console.log(formState);
  };

  return (
    <>
      <Helmet>
        <title>Chopbarh &rarr; Sign Up</title>
      </Helmet>
      <Header />
      <SignUpWrapper>
        <Container>
          <Form onSubmit={handleSubmit}>
            <HeadingTwo className="mb-4">Sign Up</HeadingTwo>
            <FormItem>
              <label>Full Name</label>
              <input {...text("fullname")} required />
            </FormItem>
            <FormItem>
              <label>Phone Number</label>
              <input {...tel("number")} required />
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
                <label>Enter Pin (4 digits)</label>
                <input
                  {...password("password")}
                  required
                  minLength="4"
                  maxLength="4"
                />
              </FormItem>
              <FormItem>
                <label>Re-enter Pin</label>
                <input
                  {...password("retype-password")}
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
            <button type="submit" className="mr-2">
              <span>Create Account</span>
            </button>
            <LoginSignal>
              <p>By clicking, you agree to our Terms and Conditions</p>
              <p>
                Already have an account? <Link to="login">Login</Link>
              </p>
            </LoginSignal>
          </Form>
        </Container>
      </SignUpWrapper>
    </>
  );
}
