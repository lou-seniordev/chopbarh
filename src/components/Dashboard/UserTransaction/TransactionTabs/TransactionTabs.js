import React from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import WithdrawalTable from "../WithdrawalTable/WithdrawalTable";
import DepositTable from "../DepositTable/DepositTable";

const TransactionTabsWrapper = styled.div`
  display: block;
  margin: 0 auto;
  padding: 1rem 0rem;
`;

const HeadingTwo = styled.h2`
  font-size: 1.5rem;
`;

export default function TransactionTabs() {
  return (
    <TransactionTabsWrapper className="col-md-8">
      <Tabs>
        <TabList>
          {/* <Tab>
            <HeadingTwo>All</HeadingTwo>
          </Tab> */}
          <Tab>
            <HeadingTwo>Deposit</HeadingTwo>
          </Tab>
          <Tab>
            <HeadingTwo>Withdrawal</HeadingTwo>
          </Tab>
          <Tab>
            <HeadingTwo>Transfers</HeadingTwo>
          </Tab>
          {/* 
          <Tab>
            <HeadingTwo>Refunds</HeadingTwo>
          </Tab> */}
        </TabList>
        {/* <TabPanel>
          <TransactionTable />
        </TabPanel> */}
        <TabPanel
          style={{
            maxHeight: "600px",
            overflow: "auto"
          }}
        >
          <DepositTable />
        </TabPanel>
        <TabPanel
          style={{
            maxHeight: "600px",
            overflow: "auto"
          }}
        >
          <WithdrawalTable />
        </TabPanel>
        <TabPanel
          style={{
            maxHeight: "600px",
            overflow: "auto"
          }}
        />
        {/* <TabPanel>
          <TransactionTable />
        </TabPanel>
        <TabPanel>
          <TransactionTable />
        </TabPanel> */}
      </Tabs>
    </TransactionTabsWrapper>
  );
}
