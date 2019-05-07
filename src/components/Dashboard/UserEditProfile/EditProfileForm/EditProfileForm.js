import React, { useState } from "react";
import styled from "styled-components";
import { useFormState } from "react-use-form-state";
import axios from "axios";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";

const EditProfileWrapper = styled.div`
  z-index: 2000;
  padding: 2rem 10rem;

  @media only screen and (max-width: ${breakPoints.small}) {
    padding: 20rem 5rem;
  }

  @media only screen and (max-width: ${breakPoints.smaller}) {
    padding: 20rem 0rem;
  }
`;

const Container = styled.div`
  margin: 2rem auto;
  width: 60vw;
  background: #fff;
  padding: 4rem 10rem;
  box-shadow: 0px 18px 31px 0px rgba(214, 207, 214, 0.83);

  @media only screen and (max-width: ${breakPoints.mediumLite}) {
    padding: 4rem 5rem;
  }

  @media only screen and (max-width: ${breakPoints.small}) {
    width: 80vw;
    padding: 4rem 1rem;
  }
`;

const HeadingTwo = styled.h2`
  font-size: 2.5rem;
  color: ${color.colorPrimary};
  /* color: #c5c7c5; */
  font-weight: bold;
`;

const Form = styled.form`
  position: relative;

  button {
    all: unset;
    padding: 0.5rem 1.3rem;
    display: inline-block;
    position: absolute;
    left: 50%;
    transform: skew(-20deg) translateX(-50%);
    transition: all 0.2s;
    color: ${color.colorWhite};
    background: ${color.colorPrimary};
    font-size: 1.3rem;
    z-index: 200;

    @media only screen and (max-width: ${breakPoints.mediumLite}) {
      font-size: 1.1rem;
    }

    span {
      display: inline-block;
      transform: skew(20deg);
      color: #fff;
    }

    &:hover {
      transform: translateY(-3px) skew(-20deg) translateX(-50%);
      background: ${color.colorPrimaryHover};
      color: ${color.colorWhite};
    }
  }
`;

const FormItem = styled.div`
  label {
    font-size: 1.4rem;
    font-weight: 600;
    color: #737773;
    margin-bottom: 1rem;
  }

  input,
  select {
    color: #8d8e8d;
    width: 100%;
    height: 3.4rem;
    margin-bottom: 2rem;
    border: 0;
    background: #f6f6f6;
    outline: none;
    padding: 3px 5px;
  }

  & > * {
    display: block;
    font-family: inherit;
  }
`;

const HalfColumn = styled.div`
  display: flex;

  @media only screen and (max-width: ${breakPoints.large}) {
    flex-direction: column;
  }

  div {
    width: 50%;

    @media only screen and (max-width: ${breakPoints.large}) {
      width: 100%;
    }
  }
`;

export default function EditProfileForm({ userInfo }) {
  const [loading, setLoading] = useState(false);
  const [formState, { text, tel, select, date, email }] = useFormState({
    FULL_NAME: userInfo.DisplayName,
    SEX: "M"
  });

  const handleSubmit = event => {
    event.preventDefault();

    formState.values["@class"] = ".LogEventRequest";
    formState.values["eventKey"] = "REGISTER_PLAYER";
    formState.values["playerId"] = userInfo.PlayerID;
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
        } else {
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
      });
  };

  return (
    <>
      <EditProfileWrapper>
        <Container>
          <Form onSumit={handleSubmit}>
            <HeadingTwo className="mb-4">Edit Profile</HeadingTwo>
            <FormItem>
              <label>Full Name</label>
              <input {...text("FULL_NAME")} />
            </FormItem>
            <FormItem>
              <label>Phone Number</label>
              <input {...tel("PHONE_NUM")} required />
            </FormItem>
            <HalfColumn>
              <FormItem className="mr-3">
                <label>Date of Birth</label>
                <input {...date("DOB")} required />
              </FormItem>
              <FormItem>
                <label>Sex</label>
                <select {...select("SEX")} required>
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
              <span>Save</span>
            </button>
          </Form>
        </Container>
      </EditProfileWrapper>
    </>
  );
}
