import React, { Component } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import styled from "styled-components";
import Card from "../Card/Card";
import color from "../../../styles/colors";
import BankCharge from "../BankCharge/BankCharge";
import Quickteller from "../Quickteller/Quickteller";
import Voucher from "../../UserHome/Voucher/Voucher";
import GTBank from "../GTBank/GTBank";
import NIBBS from "../NIBBS/NIBBS";
import ATM from "../ATM/ATM";
import RavePayment from "../Rave/Rave";
import InstantPayment from "../InstantPayment/InstantPayment";

import "react-accessible-accordion/dist/fancy-example.css";

const InstaLink = styled.a`
  background: ${color.colorPrimary};
  padding: 0.5rem 1.3rem;

  &:hover {
    cursor: pointer;
    background: ${color.colorPrimaryHover};
  }
`;

class DepositSmallScreens extends Component {
  render() {
    return (
      <div className="container p-0 my-5 px-1">
        <div className="col-lg-12 p-0">
          {this.props.loading ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : (
            <Accordion>
              {this.props.playerData.PlayerStatus === 2 && (
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>Voucher</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
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
                  </AccordionItemPanel>
                </AccordionItem>
              )}
              {this.props.playerData.PlayerStatus !== 2 && (
                <>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        Instant Bank Transfer
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <InstantPayment />
                    </AccordionItemPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>Bank Card</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <RavePayment />
                    </AccordionItemPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>GT Bank</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <GTBank />
                    </AccordionItemPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>Quickteller</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <Quickteller />
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>Paystack</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <Card />
                    </AccordionItemPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        Zenith, UBA, Sterling, ALAT by Wema
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <BankCharge />
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>ATM Machine</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <ATM />
                    </AccordionItemPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>NIBSS Ebillspay</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <NIBBS />
                    </AccordionItemPanel>
                  </AccordionItem>
                </>
              )}
            </Accordion>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playerData: state.player.playerData,
  loading: state.player.loading
});

export default connect(mapStateToProps)(DepositSmallScreens);
