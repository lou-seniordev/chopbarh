import React from "react";
import styled from "styled-components";
import color from "../../styles/colors";
import breakPoints from "../../styles/breakpoints";
import Ludo from "../../assets/img/Ludo@2x.png";
import Whot from "../../assets/img/Whot.png";

const GameItemsWrapper = styled.div`
  margin-top: 5rem;
`;

const Image = styled.img``;

const HeadingThree = styled.h3`
  font-size: 3rem;
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;
  color: ${color.colorPrimary};
`;

const Column = styled.div`
  text-align: center;

  p {
    text-align: left;
    width: 75%;
    color: #c5c7c5;
    font-size: 1.5rem;
    margin: 0 auto;
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
            <HeadingThree>Ludo</HeadingThree>
            <p>
              Play and win from childhood collections that live up to the moment
            </p>
            <Button>
              <span>Place Bet</span>
            </Button>
            <Button>
              <span>Google Play</span>
            </Button>
            <Button>
              <span>iOS Store</span>
            </Button>
          </Column>
          <Column className="col-md-6">
            <Image alt="Whot" src={Whot} />
            <HeadingThree>Whot</HeadingThree>
            <p>
              Play and win from childhood collections that live up to the moment
            </p>
          </Column>
        </div>
      </div>
    </GameItemsWrapper>
  );
}
