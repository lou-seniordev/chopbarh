import React from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const DepositTabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 5rem 2rem;
`;

export default function DepositTabs() {
  return (
    <DepositTabsWrapper className="container">
      <Tabs>
        <TabList>
          <Tab>
            <h2>Card</h2>
          </Tab>
          <Tab>
            <h2>Quickteller</h2>
          </Tab>
          <Tab>
            <h2>Banks</h2>
          </Tab>
          <Tab>
            <h2>Voucher</h2>
          </Tab>
          <Tab>
            <h2>Pay with Account Number</h2>
          </Tab>
        </TabList>
        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </DepositTabsWrapper>
  );
}
