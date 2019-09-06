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

import "react-accessible-accordion/dist/fancy-example.css";

const GTBWrapper = styled.div`
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

export default function GTBank() {
  return (
    <GTBWrapper>
      <Accordion>
        <AccordionItem uuid="31">
          <AccordionItemHeading>
            <AccordionItemButton>Deposit with USSD</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <StepText>Step 1:</StepText>
            <Info className="mb-4">Enter USSD code *737*50*AMOUNT*384#</Info>
            <StepText>Step 2:</StepText>
            <Info className="mb-4">
              Use ChopBarh phone number for Reference ID
            </Info>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem uuid="32">
          <AccordionItemHeading>
            <AccordionItemButton>
              Deposit with GTBank Mobile App
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <StepText>Step 1:</StepText>
            <Info className="mb-4">
              Open the GTBank mobile banking app and sign in.
            </Info>
            <StepText>Step 2:</StepText>
            <Info className="mb-4">
              Click on 'Other Payments', then select 'More Payments'.
            </Info>
            <StepText>Step 3:</StepText>
            <Info className="mb-4">
              Click on 'Sports and Gaming' and select 'CHOPBARH'.
            </Info>
            <StepText>Step 4:</StepText>
            <Info className="mb-4">Click on CHOPBARH.</Info>
            <StepText>Step 5:</StepText>
            <Info className="mb-4">
              Enter your ChopBarh Login Phone Number and the amount you wish to
              deposit.
            </Info>
            <StepText>Step 6:</StepText>
            <Info className="mb-4">
              Select the GT Bank account that you wish to make the deposit from,
              insert your mobile banking pin and confirm.
            </Info>
            <StepText>Step 7:</StepText>
            <Info className="mb-4">
              Upon successful payment, your ChopBarh coins will be credited
              instantly.
            </Info>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem uuid="33">
          <AccordionItemHeading>
            <AccordionItemButton>
              Deposit with GTBank Website
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <StepText>Step 1:</StepText>
            <Info className="mb-4">Login in to your GTBank account.</Info>
            <StepText>Step 2:</StepText>
            <Info className="mb-4">
              Click on 'Other Payments', then select 'More Payments'.
            </Info>
            From the Internet banking homepage, click 'Payments & Collections'
            from the drop-down menu and then click 'Sports and Gaming'. Scroll
            and select 'CHOPBARH' and then click 'Make New Payments'.
            <StepText>Step 3:</StepText>
            <Info className="mb-4">
              Enter your ChopBarh Login Phone Number and the amount
              you wish to deposit.
            </Info>
            <StepText>Step 4:</StepText>
            <Info className="mb-4">
              Confirm all your details and bank charges. Answer any security
              questions and enter your token code or USSD.
            </Info>
            <StepText>Step 5:</StepText>
            <Info className="mb-4">
              Upon successful payment, your ChopBarh coin will be credited
              instantly.
            </Info>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </GTBWrapper>
  );
}
