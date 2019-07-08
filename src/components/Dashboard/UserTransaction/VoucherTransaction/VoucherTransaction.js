import React, { Component, memo } from "react";
import styled from "styled-components";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";

const VoucherTransactionWrapper = styled.div`
  /* margin-top: 8rem; */
  margin-bottom: 5rem;
  display: flex;
  justify-content: center;
  text-align: center;

  @media only screen and (max-width: ${breakPoints.large}) {
    padding-left: 0;
  }
`;

const FormWrapper = styled.form`
  /* display: flex;
  align-items: center; */

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

    /* @media only screen and (max-width: ${breakPoints.medium}) {
      justify-self: center;
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

// This is the component that is responsible for credit transfer to another player

class VoucherTransaction extends Component {
  state = {
    loading: false,
    phone: "",
    amount: ""
  };

  render() {
    return (
      <VoucherTransactionWrapper>
        <div>
          <FormWrapper>
            <FormItem>
              <label>Transfer Credit to Friends</label>
            </FormItem>
            <FormItem>
              <input type="text" name="phone" placeholder="Phone Number" />
            </FormItem>
            {/* <FormItem>
              <input type="password" placeholder="Pin" />
            </FormItem> */}
            <FormItem>
              <input type="text" name="amount" placeholder="Amount" />
            </FormItem>
            <button type="submit" className="ml-2 mr-2">
              <span>Transfer</span>
            </button>
          </FormWrapper>
        </div>
      </VoucherTransactionWrapper>
    );
  }
}

export default memo(VoucherTransaction);
