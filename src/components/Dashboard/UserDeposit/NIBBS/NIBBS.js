import React from "react";
import styled from "styled-components";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";

const NIBBSWrapper = styled.div`
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

export default function NIBBS() {
  return (
    <NIBBSWrapper>
      <Accordion>
        <AccordionItem uuid="11">
          <AccordionItemHeading>
            <AccordionItemButton>Pay Online</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <StepText>Step 1:</StepText>
            <Info className="mb-4">
              Login on your bank’s internet banking platform (eligible banks are
              shown above).
            </Info>
            <StepText>Step 2:</StepText>
            <Info className="mb-4">
              Access the NIBSS eBillsPay in the Payment & Collection category
              and follow the steps until you are redirected to the NIBSS
              website.
            </Info>
            <StepText>Step 3:</StepText>
            <Info className="mb-4">
              Enter “Chopbarh” in the search bar and select the "Chopbarh option
              in the menu".
            </Info>
            <StepText>Step 4:</StepText>
            <Info className="mb-4">
              Insert your phone number and click “Continue”.
            </Info>
            <StepText>Step 5:</StepText>
            <Info className="mb-4">
              Information attached to the phone number will be automatically
              populated. Kindly confirm, input amount and click “Continue”.
            </Info>
            <StepText>Step 6:</StepText>
            <Info className="mb-4">
              Confirm payment details and click “Pay”.
            </Info>
            <StepText>Step 7:</StepText>
            <Info className="mb-4">
              You will be redirected to the bank’s online banking website to
              authorize the transaction. Insert Token and click “Submit” to
              complete the transaction.
            </Info>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem uuid="12">
          <AccordionItemHeading>
            <AccordionItemButton>Bank Branch Payment</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <StepText>Step 1:</StepText>
            <Info className="mb-4">
              Go to any bank branch of your choice(all banks are supported)
            </Info>
            <StepText>Step 2:</StepText>
            <Info className="mb-4">
              Fill in a deposit slip, providing the following details:
              <br /> <strong>Account Name</strong>: ChopBarh
              <br /> <strong>Account Number</strong>: Your phone number
              <br /> <strong>Amount</strong>: The amount that you wish to
              deposit
            </Info>
            <StepText>Step 3:</StepText>
            <Info className="mb-4">
              Ask for the teller to deposit money to ChopBarh using NIBSS
              eBillsPay.
            </Info>
            <StepText>Step 4:</StepText>
            <Info className="mb-4">
              As soon as the teller confirms the payment, your Chopbarh account
              will be credited instantly.
            </Info>
            <StepText>Step 5:</StepText>
            <Info className="mb-4">
              Please ensure that you keep the receipt issued by the bank in case
              of any query.
            </Info>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </NIBBSWrapper>
  );
}
