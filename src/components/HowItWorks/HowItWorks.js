import React from "react";
import styled from "styled-components";
import color from "../styles/colors";
import GameConsole from "../assets/svg/Game.svg";
import BetAway from "../assets/svg/BetAway.svg";
import VersusAndWin from "../assets/svg/VersusAndWin.svg";

const HowItWorksWrapper = styled.div`
  text-align: center;
  padding: 2rem;
  margin-top: 3rem;
`;

const ContentBlock = styled.div`
  max-width: 32rem;
  min-height: 22rem;
  background: #aca3a3;
  transform: skew(-8deg);
  padding: 1rem;
  display: flex;
  background: ${color.colorPrimary};
  justify-content: center;
  align-items: center;
  color: ${color.colorWhite};

  & > * {
    transform: skew(8deg);
  }
`;

const HeadingThree = styled.h3`
  font-size: 3rem;
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;
  color: ${color.colorPrimary};
`;

/* 

This component has Box Shadow added in the UI

*/

export default function HowItWorks() {
  return (
    <HowItWorksWrapper>
      <div className="container">
        <HeadingThree className="mb-5">How it Works</HeadingThree>
        <div className="row mb-5">
          <div className="col-md-4 mb-2">
            <ContentBlock>
              <div>
                <img src={GameConsole} className="mb-4" alt="" />
                <h4 className="text-uppercase">Choose your Game</h4>
                <p className="p--2">Choose your game you love</p>
              </div>
            </ContentBlock>
          </div>
          <div className="col-md-4 mb-2">
            <ContentBlock>
              <div>
                <img src={BetAway} className="mb-3 mt-n1" alt="" />
                <h4 className="text-uppercase">Bet Away!</h4>
                <p className="p--2">Put in the amount you want to bet</p>
              </div>
            </ContentBlock>
          </div>
          <div className="col-md-4 mb-2">
            <ContentBlock>
              <div>
                <img src={VersusAndWin} className="mb-4" alt="" />
                <h4 className="text-uppercase">Play and Win!</h4>
                <p className="p--2">Win as much as you can!</p>
              </div>
            </ContentBlock>
          </div>
        </div>
      </div>
    </HowItWorksWrapper>
  );
}
