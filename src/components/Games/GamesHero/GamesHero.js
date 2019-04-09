import React from "react";
import styled from "styled-components";
import color from "../../styles/colors";
import breakPoints from "../../styles/breakpoints";
import bg from "../../assets/svg/WavyHeader.svg";

const GamesHeroWrapper = styled.div`
  height: 90vh;
  padding: 3rem 1rem;
  position: relative;
  margin-top: -8rem;
  background: ${color.colorPrimary};
  color: ${color.colorWhite};
  text-align: center;
`;

const GamesHeroContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media only screen and (max-width: ${breakPoints.medium}) {
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }
`;

const HeadingTwo = styled.h2`
  font-size: 10rem;
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;

  @media only screen and (max-width: ${breakPoints.medium}) {
    font-size: 7rem;
  }

  @media only screen and (max-width: ${breakPoints.small}) {
    font-size: 5.5rem;
  }
`;

const ParagraphOne = styled.p`
  font-size: 2.5rem;
  font-weight: 500;
  font-style: italic;

  @media only screen and (max-width: ${breakPoints.medium}) {
    font-size: 1.3rem;
  }

  @media only screen and (max-width: ${breakPoints.small}) {
    margin-top: 1rem;
    font-size: 1.2rem;
  }
`;

export default function GamesHero() {
  return (
    <GamesHeroWrapper>
      <GamesHeroContentWrapper>
        {/* <img src="assets/img/Smiling guy.png" className="hero__image" alt="" /> */}
        <HeadingTwo className="hero__title">Games</HeadingTwo>
        <div className="mt-n4 ml-lg-1 ml-md-1">
          <ParagraphOne>Play and Chop barh!</ParagraphOne>
        </div>
      </GamesHeroContentWrapper>
    </GamesHeroWrapper>
  );
}
