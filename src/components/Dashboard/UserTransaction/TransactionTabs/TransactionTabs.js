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
          
          <Tab>
            <HeadingTwo>Deposit</HeadingTwo>
          </Tab>
          <Tab>
            <HeadingTwo>Withdrawal</HeadingTwo>
          </Tab>
          
        </TabList>
        
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
        
      </Tabs>
    </TransactionTabsWrapper>
  );
}
