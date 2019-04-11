import React from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import PhoneNumber from "../PhoneNumber/PhoneNumber";
import Paga from "../Paga/Paga";

const WithdrawTabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 6rem 2rem;
`;

const HeadingTwo = styled.h2`
  font-size: 1.7rem;
`;

export default function DepositTabs() {
  return (
    <WithdrawTabsWrapper className="container">
      <div className="col-md-6">
        <Tabs>
          <TabList>
            <Tab>
              <HeadingTwo>Phone Number</HeadingTwo>
            </Tab>
            <Tab>
              <HeadingTwo>Paga</HeadingTwo>
            </Tab>
          </TabList>
          <TabPanel>
            <PhoneNumber />
          </TabPanel>
          <TabPanel>
            <Paga />
          </TabPanel>
        </Tabs>
      </div>
    </WithdrawTabsWrapper>
  );
}
