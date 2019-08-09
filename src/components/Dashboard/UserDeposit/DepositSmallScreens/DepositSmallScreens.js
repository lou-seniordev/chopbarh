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
import GTBank from "../GTBank/GTBank";
import NIBBS from "../NIBBS/NIBBS";
import ATM from "../ATM/ATM";
import RavePayment from "../Rave/Rave";

import "react-accessible-accordion/dist/fancy-example.css";

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
              <RavePayment />
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>Paystack</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <Card />
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>GT Bank</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <GTBank />
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>Other Banks</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <NIBBS />
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
              <AccordionItemButton>ATM</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <ATM />
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
        </Accordion>
      </div>
    </div>
  );
}
