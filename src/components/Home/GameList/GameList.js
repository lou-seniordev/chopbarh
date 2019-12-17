import React from "react";
import styled from "styled-components";
import color from "../../styles/colors";
import Whot from "../../assets/img/WhotGamePlay.png";
import Ludo from "../../assets/img/LudoGamePlay.png";
import Snooker from "../../assets/img/SnookerGamePlay.png";
import Dice from "../../assets/img/DiceGamePlay.png";

import breakpoints from "../../styles/breakpoints";

const GamesWrapper = styled.div`
  text-align: center;
  margin-top: 5rem;
  margin-bottom: 5rem;

  @media only screen and (max-width: 425px) {
    margin-bottom: 0px;
  }
`;

const HeadingThree = styled.h3`
  font-size: 3rem;
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;
  color: ${color.colorPrimary};
`;

// const ParagraphOne = styled.p`
//   width: 75%;
//   font-size: 1.5rem;
//   font-weight: 400;
//   margin: 0 auto;
// `;

// const Button = styled.button`
//   all: unset;
//   color: ${color.colorWhite};
//   background: ${color.colorPrimary};
//   padding: 1rem 1.5rem;
//   font-size: 1.3rem;
//   font-weight: 600;
//   transform: skew(-20deg);
//   display: inline-block;
//   transition: all 0.2s;

//   span {
//     display: inline-block;
//     transform: skew(20deg);
//   }

//   &:hover {
//     transform: translateY(-3px) skew(-20deg);
//     color: ${color.colorWhite};
//     background: ${color.colorPrimaryHover};
//   }
// `;

const ImageContainer = styled.div`
  /* display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 1.2rem 0;

  & > :not(:first-child) {
    background: crimson;
    margin-top: 1rem;
  } */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  & > * {
    background-color: crimson;
    height: 16rem;
    margin: 0.5rem;
  }

  @media only screen and (max-width: ${breakpoints.medium}) {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    justify-items: center;
  }
`;

// const Image = styled.img`
//   margin: 0 10px;
//   height: 12rem;
//   display: block;
// `;

const Image1 = styled.img`
  @media only screen and (max-width: ${breakpoints.medium}) {
    grid-row: 1 / 2;
    height: 14rem;
  }
`;

const Image2 = styled.img`
  @media only screen and (max-width: ${breakpoints.medium}) {
    grid-row: 2 / 3;
    height: 14rem;
  }
`;

const Image3 = styled.img`
  @media only screen and (max-width: ${breakpoints.medium}) {
    grid-row: 3 / 4;
    height: 14rem;
  }
`;

const Image4 = styled.img`
  @media only screen and (max-width: ${breakpoints.medium}) {
    grid-row: 4 / -1;
    height: 14rem;
  }
`;

export default function GameList() {
  return (
    <GamesWrapper>
      <div className="container">
        <HeadingThree className="mb-5">Games</HeadingThree>
        <ImageContainer>
          <Image1 src={Whot} alt="Game" />
          <Image2 src={Ludo} alt="Game" />
          <Image3 src={Snooker} alt="Game" />
          <Image4 src={Dice} alt="Game" />
        </ImageContainer>
      </div>
    </GamesWrapper>
  );
}
