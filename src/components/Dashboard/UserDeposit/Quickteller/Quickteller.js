import React from "react";
import styled from "styled-components";

const QuicktellerWrapper = styled.div``;

const StepText = styled.p`
  font-size: 1.4rem;
  color: #c5c7c5;
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
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Info>
      <StepText>Step 2:</StepText>
      <Info className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Info>
      <StepText>Step 3:</StepText>
      <Info className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Info>
      <StepText>Step 4:</StepText>
      <Info className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Info>

      <StepText>Step 5:</StepText>
      <Info className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Info>
    </QuicktellerWrapper>
  );
}
