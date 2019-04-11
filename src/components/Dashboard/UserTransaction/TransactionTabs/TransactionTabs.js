import React from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const TransactionTabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 5rem 2rem;
`;

const HeadingTwo = styled.h2`
  font-size: 1.7rem;
`;

export default function DepositTabs() {
  return (
    <TransactionTabsWrapper className="container">
      <Tabs>
        <TabList>
          <Tab>
            <HeadingTwo>All</HeadingTwo>
          </Tab>
          <Tab>
            <HeadingTwo>Deposit</HeadingTwo>
          </Tab>
          <Tab>
            <HeadingTwo>Withdrawal</HeadingTwo>
          </Tab>
          <Tab>
            <HeadingTwo>Winnings</HeadingTwo>
          </Tab>
          <Tab>
            <HeadingTwo>Refunds</HeadingTwo>
          </Tab>
        </TabList>
        <TabPanel />
        <TabPanel />
        <TabPanel>Banks</TabPanel>
        <TabPanel>Voucher</TabPanel>
        <TabPanel />
      </Tabs>
    </TransactionTabsWrapper>
  );
}
