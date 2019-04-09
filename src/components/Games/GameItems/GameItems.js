import React from "react";
import styled from "styled-components";
import color from "../../styles/colors";
import breakPoints from "../../styles/breakpoints";
import Ludo from "../../assets/img/Ludo@2x@2x.png";
import Whot from "../../assets/img/Whot.png";
import Snookers from "../../assets/svg/Snookers.svg";
import Dice from "../../assets/svg/Dice.svg";
import Soccer from "../../assets/svg/SoccerFootball.svg";
import Draught from "../../assets/svg/Draught.svg";

const GameItemsWrapper = styled.div`
  margin-top: 7rem;
`;

const Image = styled.img`
  height: 20rem;
`;

const HeadingThree = styled.h3`
  font-size: 3rem;
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;
  color: ${color.colorPrimary};
`;

const Column = styled.div`
  text-align: center;
  margin-bottom: 6rem;
  transition: all 0.2s;

  p {
    text-align: left;
    width: 75%;
    color: #c5c7c5;
    font-size: 1.5rem;
    margin: 0 auto;
  }

  &:hover {
    transform: scale(1.02);
  }
`;

const Button = styled.button`
  all: unset;
  border: 3px solid ${color.colorWhite};
  padding: 1rem 1.3rem;
  font-size: 1.5rem;
  font-weight: 600;
  transform: skew(-20deg);
  display: inline-block;
  transition: all 0.2s;
  color: #c5c7c5;

  span {
    display: inline-block;
    transform: skew(20deg);
  }

  &:hover {
    transform: translateY(-3px) skew(-20deg);
    color: ${color.colorWhite};
    background: ${color.colorPrimaryHover};
  }

  @media only screen and (max-width: ${breakPoints.medium}) {
    font-size: 1.3rem;
  }

  @media only screen and (max-width: ${breakPoints.small}) {
    font-size: 1.2rem;
  }
`;

export default function GameItems() {
  return (
    <GameItemsWrapper>
      <div className="container">
        <div className="row">
          <Column className="col-md-6">
            <Image alt="Ludo" src={Ludo} />
            <HeadingThree className="mt-4">Ludo</HeadingThree>
            <p>
              Play and win from childhood collections that live up to the moment
            </p>
            <div className="mt-2">
              <Button>
                <span>Place Bet</span>
              </Button>
              <Button>
                <span>Google Play</span>
              </Button>
              <Button>
                <span>iOS Store</span>
              </Button>
            </div>
          </Column>
          <Column className="col-md-6">
            <Image alt="Whot" src={Whot} />
            <HeadingThree className="mt-4">Whot</HeadingThree>
            <p>
              Play and win from childhood collections that live up to the moment
            </p>
            <div className="mt-2">
              <Button>
                <span>Place Bet</span>
              </Button>
              <Button>
                <span>Google Play</span>
              </Button>
              <Button>
                <span>iOS Store</span>
              </Button>
            </div>
          </Column>
          <Column className="col-md-6">
            <Image alt="Snookers" src={Snookers} />
            <HeadingThree className="mt-4">Snookers</HeadingThree>
            <p>
              Play and win from childhood collections that live up to the moment
            </p>
            <div className="mt-2">
              <Button>
                <span>Place Bet</span>
              </Button>
              <Button>
                <span>Google Play</span>
              </Button>
              <Button>
                <span>iOS Store</span>
              </Button>
            </div>
          </Column>
          <Column className="col-md-6">
            <Image alt="Dice" src={Dice} />
            <HeadingThree className="mt-4">Dice</HeadingThree>
            <p>
              Play and win from childhood collections that live up to the moment
            </p>
            <div className="mt-2">
              <Button>
                <span>Place Bet</span>
              </Button>
              <Button>
                <span>Google Play</span>
              </Button>
              <Button>
                <span>iOS Store</span>
              </Button>
            </div>
          </Column>
          <Column className="col-md-6">
            <Image alt="Table Soccer" src={Soccer} />
            <HeadingThree className="mt-4">Table Soccer</HeadingThree>
            <p>
              Play and win from childhood collections that live up to the moment
            </p>
            <div className="mt-2">
              <Button>
                <span>Place Bet</span>
              </Button>
              <Button>
                <span>Google Play</span>
              </Button>
              <Button>
                <span>iOS Store</span>
              </Button>
            </div>
          </Column>
          <Column className="col-md-6">
            <Image alt="Draught" src={Draught} />
            <HeadingThree className="mt-4">Draught</HeadingThree>
            <p>
              Play and win from childhood collections that live up to the moment
            </p>
            <div className="mt-2">
              <Button>
                <span>Place Bet</span>
              </Button>
              <Button>
                <span>Google Play</span>
              </Button>
              <Button>
                <span>iOS Store</span>
              </Button>
            </div>
          </Column>
        </div>
      </div>
    </GameItemsWrapper>
  );
}