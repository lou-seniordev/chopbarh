import React from "react";
import styled from "styled-components";
import color from "../../styles/colors";
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
          </Column>
          <Column className="col-md-6">
            <Image alt="Whot" src={Whot} />
            <HeadingThree>Whot</HeadingThree>
          </Column>
        </div>
      </div>
    </GameItemsWrapper>
  );
}
