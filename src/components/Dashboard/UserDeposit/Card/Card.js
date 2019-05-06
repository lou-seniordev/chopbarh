import React, { useState } from "react";
import styled from "styled-components";
import { useFormState } from "react-use-form-state";
import { Spinner } from "reactstrap";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";

const Form = styled.form`
  position: relative;
  min-height: 20rem;

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

export default function Card() {
  const [loading, setLoading] = useState(false);
  const [formState, { text, email, number }] = useFormState();

  return (
    <Form>
      <FormItem>
        <label>Email</label>
        <input
          {...email({
            name: "email"
          })}
          required
        />
      </FormItem>
      <FormItem>
        <label>Amount</label>
        <input
          {...number({
            name: "amount"
          })}
          min="0"
          required
        />
      </FormItem>
      <HalfColumn>
        <FormItem className="mr-3">
          <label>Card Number</label>
          <input
            {...number({
              name: "card_number"
            })}
            required
          />
        </FormItem>
        <FormItem>
          <label>Expiry</label>
          <input
            {...text({
              name: "card_expiry"
            })}
            required
          />
        </FormItem>
      </HalfColumn>
      <HalfColumn>
        <FormItem className="mr-3">
          <label>CVV</label>
          <input
            {...number({
              name: "cvv"
            })}
            required
            min="0"
          />
        </FormItem>
        <FormItem>
          <label>Pin</label>
          <input
            {...number({
              name: "pin",
              validate: (value, values, e) => {
                if (value.length !== 4) {
                  return "Pin length should be 4";
                }
              }
            })}
            required
          />
        </FormItem>
      </HalfColumn>
      <button type="submit" className="mr-2">
        <span>Load</span>
      </button>
    </Form>
  );
}

/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        className="mt-5"
      >
        <Spinner />
      </div> */
