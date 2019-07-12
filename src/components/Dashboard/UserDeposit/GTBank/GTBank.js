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
            </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem uuid="32">
          <AccordionItemHeading>
            <AccordionItemButton>Deposit with GTBank Mobial App</AccordionItemButton>
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
            <Info className="mb-4">
              Click on CHOPBARH.
      </Info>
            <StepText>Step 5:</StepText>
            <Info className="mb-4">Enter your ChopBarh Login Phone Number: 08181062778 and the amount you wish to deposit.</Info>
            <StepText>Step 6:</StepText>
            <Info className="mb-4">Select the GT Bank account that you wish to make the deposit from, insert your mobile banking pin and confirm.</Info>
            <StepText>Step 7:</StepText>
            <Info className="mb-4">
              Upon successful payment, your ChopBarh coins will be credited instantly.
      </Info>
            </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem uuid="33">
          <AccordionItemHeading>
            <AccordionItemButton>Deposit with GTBank Website</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
   

            <StepText>Step 1:</StepText>
            <Info className="mb-4">
              Login in to your GTBank account.
            </Info>
            <StepText>Step 2:</StepText>
            <Info className="mb-4">
              Click on 'Other Payments', then select 'More Payments'.
      </Info>From the Internet banking homepage, click 'Payments & Collections' from the drop-down menu and then click 'Sports and Gaming'. Scroll and select 'CHOPBARH' and then click 'Make New Payments'.
            <StepText>Step 3:</StepText>
            <Info className="mb-4">
              Enter your ChopBarh Login Phone Number: 08181062778 and the amount you wish to deposit.
      </Info>
            <StepText>Step 4:</StepText>
            <Info className="mb-4">
              Confirm all your details and bank charges. Answer any security questions and enter your token code or USSD.
      </Info>
            <StepText>Step 5:</StepText>
            <Info className="mb-4">Upon successful payment, your ChopBarh coin will be credited instantly.</Info>
            
            </AccordionItemPanel>
            </AccordionItem>
            </Accordion>
      <StepText>Step 1:</StepText>
      <Info className="mb-4">
        Navigate to <button>www.gtbank.com</button>
      </Info>
      <StepText>Step 2:</StepText>
      <Info className="mb-4">
        ​Navigate to GTBank’s Internet Banking page by clicking “Login”.
      </Info>
      <StepText>Step 3:</StepText>
      <Info className="mb-4">
        ​You will be directed to the GTBank Internet Banking platform.Click the
        login button on the left.
      </Info>
      <StepText>Step 4:</StepText>
      <Info className="mb-4">
        ​You will now be required to fill in your login details.First, input
        your 11 - digit GTBank User ID.
      </Info>
      <StepText>Step 5:</StepText>
      <Info className="mb-4">Next, use the keypad to input your password.</Info>
      <StepText>Step 6:</StepText>
      <Info className="mb-4">To proceed, click on the green button.</Info>
      <StepText>Step 7:</StepText>
      <Info className="mb-4">
        Click on “Proceed to Internet Banking”, where you will be re-directed to
        your Internet Banking homepage.
      </Info>
      <StepText>Step 8:</StepText>
      <Info className="mb-4">
        Click “Payments & Collections” from the drop-down menu.
      </Info>
      <StepText>Step 9:</StepText>
      <Info className="mb-4">Click on “Other Payments”.</Info>
      <StepText>Step 10:</StepText>
      <Info className="mb-4">
        Scroll down and select “CHOPBARH GAMING LTD“.
      </Info>
      <StepText>Step 11:</StepText>
      <Info className="mb-4">Click “Make New Payments”.</Info>
      <StepText>Step 12:</StepText>
      <Info className="mb-4">
        You will then be directed to a page where you will be required to fill
        in your phone number and the amount that you would like to deposit.
      </Info>
      <StepText>Step 13:</StepText>
      <Info className="mb-4">
        You will then be required to confirm your details.
      </Info>
      <StepText>Step 14:</StepText>
      <Info className="mb-4">
        Confirm the bank charge, select which account to debit, answer your
        secret question and enter your token code.
      </Info>
      <StepText>Step 15:</StepText>
      <Info className="mb-4">
        Upon successful payment, your transaction receipt will then be
        displayed.
      </Info>
    </GTBWrapper>
  );
}