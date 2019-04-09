import React from "react";
import styled from "styled-components";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";

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
  margin-bottom: 6rem;
  transition: all 0.2s;

  p {
    text-align: left;
    color: #c5c7c5;
    font-size: 1.5rem;
  }
`;

const Content = styled.div`
  display: flex;
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

export default function QuickPlay() {
  return (
    <GameItemsWrapper>
      <div className="container">
        <div className="row">
          <Column className="col-md-12">
            <Content>
              <Image alt="Ludo" className="mr-3" src="" />
              <div>
                <HeadingThree className="mt-4">Ludo</HeadingThree>
                <p>
                  Play and win from childhood collections that live up to the
                  moment
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
              </div>
            </Content>
          </Column>
        </div>
      </div>
    </GameItemsWrapper>
  );
}
