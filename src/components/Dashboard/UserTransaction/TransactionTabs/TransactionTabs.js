import React, { Component } from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import WithdrawalTable from "../WithdrawalTable/WithdrawalTable";
import DepositTable from "../DepositTable/DepositTable";
import RefundTable from "../RefundTable/RefundTable";
import { connect } from "react-redux";

const TransactionTabsWrapper = styled.div`
  display: block;
  margin: 0 auto;
  padding: 1rem 0rem;
`;

const HeadingTwo = styled.h2`
  font-size: 1.5rem;
`;

class TransactionTabs extends Component {
  render() {
    return (
      <TransactionTabsWrapper className="col-md-8">
        <Tabs>
          <TabList>
            <Tab>
              <HeadingTwo>Deposit</HeadingTwo>
            </Tab>
            {this.props.playerData && this.props.playerData.PlayerStatus !== 6 && (
              <Tab>
                <HeadingTwo>Withdrawal</HeadingTwo>
              </Tab>
            )}
            <Tab>
              <HeadingTwo>Refund</HeadingTwo>
            </Tab>
          </TabList>

          <TabPanel
            style={{
              maxHeight: "600px",
              overflow: "auto",
            }}
          >
            <DepositTable />
          </TabPanel>
          {this.props.playerData && this.props.playerData.PlayerStatus !== 6 && (
            <TabPanel
              style={{
                maxHeight: "600px",
                overflow: "auto",
              }}
            >
              <WithdrawalTable />
            </TabPanel>
          )}
          <TabPanel
            style={{
              maxHeight: "600px",
              overflow: "auto",
            }}
          >
            <RefundTable />
          </TabPanel>
        </Tabs>
      </TransactionTabsWrapper>
    );
  }
}

const mapStateToProps = state => ({
  playerData: state.player.playerData,
});

export default connect(mapStateToProps)(TransactionTabs);
