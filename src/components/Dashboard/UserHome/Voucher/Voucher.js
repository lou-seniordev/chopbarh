import React, { useState } from "react";
import styled from "styled-components";
import { useFormState } from "react-use-form-state";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";
import TopEarners from "../TopEarners/TopEarners";

const VoucherWrapper = styled.div`
  margin-top: 6rem;
`;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;

  button {
    all: unset;
    padding: 0.5rem 1.3rem;
    transform: skew(-20deg);
    display: inline-block;
    transition: all 0.2s;
    color: ${color.colorWhite};
    background: ${color.colorPrimary};
    font-size: 1.3rem;
    z-index: 200;

    /* @media only screen and (max-width: ${breakPoints.mediumLite}) {
      align-self: flex-start;
      padding: 0.5rem 1.7rem;
      margin-bottom: 0.5rem;
      margin-top: 0.5rem;
    } */

    span {
      display: inline-block;
      transform: skew(20deg);
      color: #fff;
    }

    &:hover {
      transform: translateY(-3px) skew(-20deg);
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

  input {
    color: #8d8e8d;
    width: 30rem;
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

export default function Voucher() {
  const [loading, setLoading] = useState(false);
  const [formState, { text }] = useFormState();

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);

    formState.values["by"] = localStorage.getItem("chopbarh-id")
      ? localStorage.getItem("chopbarh-id")
      : null;
    const formValue = JSON.stringify(formState.values);
    try {
      const response = await fetch(
        "https://partners.chopbarh.com/api/voucher/use",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apiKey: "C213-E3C9-C7"
          },
          body: formValue
        }
      );
      const data = await response.json();
      console.log(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <VoucherWrapper className="container">
      <div className="row">
        <div className="col-md-6">
          <FormWrapper onSubmit={handleSubmit}>
            <form>
              <FormItem>
                <label>Load Voucher</label>
              </FormItem>
              <FormItem>
                <input {...text("pin")} placeholder="Voucher Code" />
              </FormItem>
              <button type="submit" className="ml-2 mr-2" disabled={loading}>
                <span>{loading ? "Loading..." : "Load"}</span>
              </button>
            </form>
          </FormWrapper>
        </div>
        <div className="col-md-6">
          <TopEarners />
        </div>
      </div>
    </VoucherWrapper>
  );
}
