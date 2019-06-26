import React from "react";
import styled from "styled-components";
import color from "../../styles/colors";
import Image1 from "../../assets/img/ChopBarhPairs1.png";
import Image2 from "../../assets/img/ChopBarhPairs2.png";
import Image3 from "../../assets/img/ChopBarhPairs3.png";
import Image4 from "../../assets/img/ChopBarhPairs4.png";
import Image5 from "../../assets/img/ChopBarhPairs5.png";
import Image6 from "../../assets/img/ChopBarhPairs6.png";

const GamesWrapper = styled.div`
  text-align: center;
  margin-top: 5rem;
  padding-bottom: 5rem;
`;

const HeadingThree = styled.h3`
  font-size: 3rem;
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;
  color: ${color.colorPrimary};
`;

/* 

Swap this out for dynamically imported component in styles

*/
const ParagraphOne = styled.p`
  width: 75%;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0 auto;
`;

const Button = styled.button`
  all: unset;
  color: ${color.colorWhite};
  background: ${color.colorPrimary};
  padding: 1rem 1.5rem;
  font-size: 1.3rem;
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
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 1.2rem 0;
`;

const Image = styled.img`
  height: 12rem;
  margin: 0 10px 5px 0;
`;

export default function GameList() {
  return (
    <GamesWrapper>
      <div className="container">
        <HeadingThree className="mb-5">Games</HeadingThree>
        <ParagraphOne>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          praesentium placeat dolorum doloribus alias temporibus autem aliquam
          fuga aperiam odit! Sequi, modi. Possimus culpa dolorem eum fugiat.
        </ParagraphOne>
        <ImageContainer>
          <Image src={Image1} alt="Game" />
          <Image src={Image2} alt="Game" />
          <Image src={Image3} alt="Game" />
          <Image src={Image4} alt="Game" />
          <Image src={Image5} alt="Game" />
          <Image src={Image6} alt="Game" />
        </ImageContainer>
        <Button className="mt-3">
          <span>Explore</span>
        </Button>
      </div>
    </GamesWrapper>
  );
}
