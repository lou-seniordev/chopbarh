import React from "react";
import styled from "styled-components";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";

const QuicktellerWrapper = styled.div`
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

export default function Quickteller() {
  return (
    <QuicktellerWrapper>
      <StepText>Step 1:</StepText>
      <Info className="mb-4">
        Visit {"  "}
        <button>www.quickteller.com/chopbarh</button>
      </Info>
      <StepText>Step 2:</StepText>
      <Info className="mb-4">
        ​Enter your ChopBarh Login Mobile Phone Number: "PlayerNumber", the
        amount you wish to deposit, your Email.
      </Info>
      <StepText>Step 3:</StepText>
      <Info className="mb-4">
        ​The system will then call up your information from our system.
      </Info>
      <StepText>Step 4:</StepText>
      <Info className="mb-4">
        ​Verify your information and payment details and click on PAY.
      </Info>
      <StepText>Step 5:</StepText>
      <Info className="mb-4">
        ​A payment receipt will be generated and you will receive an email
        notification to the email provided. Your ChopBarh account would be
        funded within 5 mins.
      </Info>
    </QuicktellerWrapper>
  );
}
