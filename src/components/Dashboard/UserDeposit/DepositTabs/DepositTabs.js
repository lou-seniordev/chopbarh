import React from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Card from "../Card/Card";
import color from "../../../styles/colors";
import Quickteller from "../Quickteller/Quickteller";
import ATM from "../ATM/ATM";
import BankCharge from "../BankCharge/BankCharge";
import Voucher from "../../UserHome/Voucher/Voucher";
import GTBank from "../GTBank/GTBank";
import NIBBS from "../NIBBS/NIBBS";
import RavePayment from "../Rave/Rave";

const DepositTabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 5rem 2rem;
`;

const HeadingTwo = styled.h2`
  font-size: 1.4rem;
`;

const InstaLink = styled.a`
  background: ${color.colorPrimary};
  padding: 0.5rem 1.3rem;

  &:hover {
    cursor: pointer;
    background: ${color.colorPrimaryHover};
  }
`;

export default function DepositTabs() {
  return (
    <DepositTabsWrapper className="container">
      <div className="col-lg-10">
        <Tabs>
          <TabList>
            <Tab>
              <HeadingTwo>Bank Card</HeadingTwo>
            </Tab>
            <Tab>
              <HeadingTwo>GT Bank</HeadingTwo>
            </Tab>
            <Tab>
              <HeadingTwo>Other Banks</HeadingTwo>
            </Tab>
            <Tab>
              <HeadingTwo>Voucher</HeadingTwo>
            </Tab>
            <Tab>
              <HeadingTwo>Paystack</HeadingTwo>
            </Tab>
            <Tab>
              <HeadingTwo>Account Number</HeadingTwo>
            </Tab>
            <Tab>
              <HeadingTwo>ATM Machine</HeadingTwo>
            </Tab>
            <Tab>
              <HeadingTwo>Quickteller</HeadingTwo>
            </Tab>
          </TabList>

          <TabPanel>
            <div style={{ minHeight: "80vh" }}>
              <RavePayment />
            </div>
          </TabPanel>
          <TabPanel>
            <div style={{ minHeight: "80vh" }}>
              <GTBank />
            </div>
          </TabPanel>

          <TabPanel>
            <div style={{ minHeight: "80vh" }}>
              <NIBBS />
            </div>
          </TabPanel>
          <TabPanel>
            <div style={{ minHeight: "80vh" }}>
              <Voucher center="true" noHeader />
              <div className="text-center mt-3" style={{ color: "#000" }}>
                <p>
                  **Get Vouchers from{" "}
                  <InstaLink
                    href="https://instagram.com/chopbarhvouchers?igshid=up50qse7x2t9"
                    style={{ color: "#ffffff" }}
                  >
                    @chopbarhvouchers
                  </InstaLink>{" "}
                  on Instagram**
                </p>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <Card />
          </TabPanel>
          <TabPanel>
            <BankCharge />
          </TabPanel>
          <TabPanel>
            <div style={{ minHeight: "80vh" }}>
              <ATM />
            </div>
          </TabPanel>
          <TabPanel>
            <Quickteller />
          </TabPanel>
        </Tabs>
      </div>
    </DepositTabsWrapper>
  );
}
