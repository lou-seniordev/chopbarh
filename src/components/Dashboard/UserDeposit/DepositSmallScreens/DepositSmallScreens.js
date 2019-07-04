import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";

export default function DepositSmallScreens() {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>Card</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel />
      </AccordionItem>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton />
        </AccordionItemHeading>
        <AccordionItemPanel />
      </AccordionItem>
    </Accordion>
  );
}
