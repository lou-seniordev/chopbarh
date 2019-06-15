import React from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AccountNumber from "../AccountNumber/AccountNumber";
import Paga from "../Paga/Paga";

const WithdrawTabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 6rem 2rem;
`;

const HeadingTwo = styled.h2`
  font-size: 1.7rem;
`;

export default function WithdrawTabs() {
  return (
    <WithdrawTabsWrapper className="container">
      <div className="col-md-6">
        <Tabs>
          <TabList>
            <Tab>
              <HeadingTwo>AZA</HeadingTwo>
            </Tab>
            <Tab>
              <HeadingTwo>Paga</HeadingTwo>
            </Tab>
          </TabList>
          <TabPanel>
            <AccountNumber />
          </TabPanel>
          <TabPanel>
            <Paga />
          </TabPanel>
        </Tabs>
      </div>
    </WithdrawTabsWrapper>
  );
}
