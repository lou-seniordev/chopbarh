import React from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AccountNumber from "../AccountNumber/AccountNumber";
import Paga from "../Paga/Paga";
import Eyowo from "../Eyowo/Eyowo";

const WithdrawTabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 6rem 2rem;
`;

const HeadingTwo = styled.h2`
  font-size: 1.4rem;
`;

export default function WithdrawTabs() {
  return (
    <WithdrawTabsWrapper className="container">
      <div className="col-lg-8">
        <Tabs>
          <TabList>
            <Tab>
              <HeadingTwo>AZA(Bank Account)</HeadingTwo>
            </Tab>
            <Tab>
              <HeadingTwo>Paga</HeadingTwo>
            </Tab>
            <Tab>
              <HeadingTwo>Eyowo</HeadingTwo>
            </Tab>
          </TabList>
          <TabPanel>
            <div style={{ minHeight: "80vh" }}>
              <AccountNumber />
            </div>
          </TabPanel>
          <TabPanel>
            <div style={{ minHeight: "80vh" }}>
              <Paga />
            </div>
          </TabPanel>
          <TabPanel>
            <div style={{ minHeight: "80vh" }}>
              <Eyowo />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </WithdrawTabsWrapper>
  );
}
