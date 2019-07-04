import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import Card from "../Card/Card";
import BankCharge from "../BankCharge/BankCharge";
import Quickteller from "../Quickteller/Quickteller";
import Voucher from "../../UserHome/Voucher/Voucher";

export default function DepositSmallScreens() {
  return (
    <div className="container p-0 my-5 px-1">
      <div className="col-lg-12 p-0">
        <Accordion>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>Card</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <Card />
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>Account Number</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <BankCharge />
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>Quickteller</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <Quickteller />
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>Voucher</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <Voucher center="true" noHeader />
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>Banks</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>Banks</AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>GT Bank</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>GT Bank</AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>ATM</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>ATM</AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
