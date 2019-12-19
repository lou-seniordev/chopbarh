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

import "react-accessible-accordion/dist/fancy-example.css";
import AgentsWithdrawal from "../AgentsWithdrawal/AgentsWithdrawal";

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
          {/* <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>Paga</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <Paga />
            </AccordionItemPanel>
          </AccordionItem> */}
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>Withdrawal(For Agents)</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <AgentsWithdrawal />
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
