import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import AccountNumber from "../AccountNumber/AccountNumber";
// import Paga from "../Paga/Paga";
import Eyowo from "../Eyowo/Eyowo";

import "react-accessible-accordion/dist/fancy-example.css";

export default function WithdrawSmallScreens() {
  return (
    <div className="container p-0 my-5 px-1">
      <div className="col-lg-12 p-0">
        <Accordion>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>AZA(Bank Account)</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <AccountNumber />
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>Eyowo</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <Eyowo />
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
