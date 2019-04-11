import React from "react";
import styled from "styled-components";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";

const PagaWrapper = styled.div`
  button {
    all: unset;
    padding: 0.5rem 1.3rem;
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

const StepText = styled.p`
  font-size: 1.5rem;
  color: #c5c7c5;
  font-weight: 500;
`;

const Info = styled.p`
  font-size: 1.3rem;
`;

export default function Paga() {
  return (
    <PagaWrapper>
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button>
          <span>Visit Paga</span>
        </button>
      </div>
    </PagaWrapper>
  );
}
