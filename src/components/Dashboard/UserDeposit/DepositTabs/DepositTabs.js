import React from "react";
import color from "../../../styles/colors";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

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
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </DepositTabsWrapper>
  );
}
