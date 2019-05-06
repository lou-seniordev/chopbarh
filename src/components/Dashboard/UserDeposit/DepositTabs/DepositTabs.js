import React from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Card from "../Card/Card";
import Quickteller from "../Quickteller/Quickteller";
import PayWithAccountNumber from "../PayWithAccountNumber/PayWithAccountNumber";
import BankCharge from "../BankCharge/BankCharge";

const DepositTabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 5rem 2rem;
`;

const HeadingTwo = styled.h2`
  font-size: 1.7rem;
`;

export default function DepositTabs() {
  return (
    <DepositTabsWrapper className="container">
      <Tabs>
        <TabList>
          <Tab>
            <HeadingTwo>Card</HeadingTwo>
          </Tab>
          <Tab>
            <HeadingTwo>Quickteller</HeadingTwo>
          </Tab>
          <Tab>
            <HeadingTwo>Banks</HeadingTwo>
          </Tab>
          <Tab>
            <HeadingTwo>Voucher</HeadingTwo>
          </Tab>
          <Tab>
            <HeadingTwo>Pay with Account Number</HeadingTwo>
          </Tab>
        </TabList>
        <TabPanel>
          <Card />
        </TabPanel>
        <TabPanel>
          <Quickteller />
        </TabPanel>
        <TabPanel>
          <BankCharge />
        </TabPanel>
        <TabPanel>Voucher</TabPanel>
        <TabPanel>
          <PayWithAccountNumber />
        </TabPanel>
      </Tabs>
    </DepositTabsWrapper>
  );
}
