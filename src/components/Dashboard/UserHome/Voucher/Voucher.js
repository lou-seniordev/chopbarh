import React, { useState } from "react";
import styled from "styled-components";
import { useFormState } from "react-use-form-state";
import { Modal, ModalBody } from "reactstrap";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";
import { AppContext } from "../../../../hoc/AppContext";
import { increaseCoinBalance } from "../../lib/increaseCoinBalance";

const VoucherWrapper = styled.div``;

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
  const [voucherUsedModal, setVoucherUsedModal] = useState(false);
  const [formState, { text }] = useFormState();

  const voucherUsedModalToggle = () => {
    setVoucherUsedModal(!voucherUsedModal);
  };

  const handleSubmit = async (event, setCoinValue) => {
    event.preventDefault();
    setLoading(true);

    formState.values["by"] = localStorage.getItem("chopbarh-id")
      ? localStorage.getItem("chopbarh-id")
      : null;
    const formValue = JSON.stringify(formState.values);
    try {
      const response = await fetch(
        "https://private-anon-9955ca6aaa-chopbarhapi.apiary-mock.com/api/voucher/use",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            apiKey: "C213-E3C9-C7"
          },
          body: formValue
        }
      );
      const data = await response.json();
      console.log(data, response.status);
      if (response.status === 200) {
        const value = data.data.value;
        increaseCoinBalance(data.data.value)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setCoinValue(value);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
            setLoading(false);
          });
      } else if (response.status === 422) {
        setVoucherUsedModal(true);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <AppContext.Consumer>
      {({ setCoinValue }) => (
        <VoucherWrapper className="container">
          <Modal
            isOpen={voucherUsedModal}
            toggle={voucherUsedModalToggle}
            className="pt-5 mt-4"
          >
            <ModalBody className="text-center">
              <p>This Voucher has already been used</p>
            </ModalBody>
          </Modal>
          <FormWrapper onSubmit={event => handleSubmit(event, setCoinValue)}>
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
        </VoucherWrapper>
      )}
    </AppContext.Consumer>
  );
}
