import React from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const WithdrawTabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 5rem 2rem;
`;

const HeadingTwo = styled.h2`
  font-size: 1.7rem;
`;

export default function DepositTabs() {
  return (
    <WithdrawTabsWrapper className="container">
      <Tabs>
        <TabList>
          <Tab>
            <HeadingTwo>Phone Number</HeadingTwo>
          </Tab>
          <Tab>
            <HeadingTwo>Paga</HeadingTwo>
          </Tab>
        </TabList>
        <TabPanel>Phone Number</TabPanel>
        <TabPanel>Paga</TabPanel>
      </Tabs>
    </WithdrawTabsWrapper>
  );
}
