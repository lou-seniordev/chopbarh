import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Spinner } from "reactstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AccountNumber from "../AccountNumber/AccountNumber";
import AgentsWithdrawal from "../AgentsWithdrawal/AgentsWithdrawal";

const WithdrawTabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 6rem 2rem;
`;

const HeadingTwo = styled.h2`
  font-size: 1.4rem;
`;

class WithdrawTabs extends Component {
  render() {
    return (
      <WithdrawTabsWrapper className="container">
        <div className="col-lg-8">
          {this.props.loading ? (
            <div className="mt-5 text-center" style={{ minHeight: "30vh" }}>
              <Spinner />
            </div>
          ) : (
            <Tabs>
              {this.props.playerData.PlayerStatus !== 2 ? (
                <>
                  <TabList>
                    <Tab>
                      <HeadingTwo>AZA(Bank Account)</HeadingTwo>
                    </Tab>
                    <Tab>
                      <HeadingTwo>Withdrawal(For Agents)</HeadingTwo>
                    </Tab>
                  </TabList>
                  <TabPanel>
                    <div style={{ minHeight: "80vh" }}>
                      <AccountNumber />
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div style={{ minHeight: "80vh" }}>
                      <AgentsWithdrawal />
                    </div>
                  </TabPanel>
                </>
              ) : (
                <>
                  <TabList>
                    <Tab>
                      <HeadingTwo>Withdrawal(For Agents)</HeadingTwo>
                    </Tab>
                  </TabList>
                  <TabPanel>
                    <div style={{ minHeight: "80vh" }}>
                      <AgentsWithdrawal />
                    </div>
                  </TabPanel>
                </>
              )}
            </Tabs>
          )}
        </div>
      </WithdrawTabsWrapper>
    );
  }
}

const mapStateToProps = state => ({
  playerData: state.player.playerData,
  loading: state.player.loading
});

export default connect(mapStateToProps)(WithdrawTabs);
