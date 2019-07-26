import React from "react";
import styled from "styled-components";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";

const ATMWrapper = styled.div`
  text-align: left;

  button {
    padding: 0.5rem 1.3rem;
    border: 0;
    transition: all 0.2s;
    color: ${color.colorWhite};
    background: ${color.colorPrimary};
    font-size: 1.3rem;
    cursor: pointer;
    z-index: 200;

    @media only screen and (max-width: ${breakPoints.mediumLite}) {
      font-size: 1.1rem;
    }

    span {
      display: inline-block;
      transform: skew(20deg);
      color: #fff;

      @media screen and (min-color-index: 0) and(-webkit-min-device-pixel-ratio:0) {
        color: #ffffff;
      }
    }

    &:hover {
      background: ${color.colorPrimaryHover};
    }
  }
`;

const StepText = styled.p`
  font-size: 1.5rem;
  color: #4c4c4c;
  font-weight: 500;
`;

const Info = styled.p`
  font-size: 1.3rem;
`;

export default function ATM() {
  return (
    <ATMWrapper>
      <StepText>Step 1:</StepText>
      <Info className="mb-4">
        Visit Visit any Quickteller/Interswitch enabled ATM
      </Info>
      <StepText>Step 2:</StepText>
      <Info className="mb-4">​Insert your card and enter your pin.</Info>
      <StepText>Step 3:</StepText>
      <Info className="mb-4">
        ​Select “Pay Bills” or “Quickteller” depending on the ATM.
      </Info>
      <StepText>Step 4:</StepText>
      <Info className="mb-4">​Select your account type.</Info>
      <StepText>Step 5:</StepText>
      <Info className="mb-4">
        You will be directed to choose a payment option – select either “Pay
        Merchant” or “Others” depending on the ATM.
      </Info>
      <StepText>Step 6:</StepText>
      <Info className="mb-4">
        You will then be prompted for a Merchant Code
      </Info>
      <StepText>Step 7:</StepText>
      <Info className="mb-4">
        Input your Customer Reference number, which is your "ChopBarh" phone
        number
      </Info>
      <StepText>Step 8:</StepText>
      <Info className="mb-4">
        Input the amount that you would like to deposit.
      </Info>
      <StepText>Step 9:</StepText>
      <Info className="mb-4">
        Input your phone number and select “Proceed”.
      </Info>
      <StepText>Step 10:</StepText>
      <Info className="mb-4">
        You will then receive confirmation that the payment has been completed
        successfully.
      </Info>
    </ATMWrapper>
  );
}
