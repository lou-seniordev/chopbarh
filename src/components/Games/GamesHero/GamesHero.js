import React from "react";
import styled from "styled-components";
import color from "../../styles/colors";
import breakPoints from "../../styles/breakpoints";
import Background from "../../assets/img/games_BG.png";

const GamesHeroWrapper = styled.div`
  height: 100vh;
  position: relative;
  margin-top: -155px;
  background: ${color.colorPrimary};
  color: ${color.colorWhite};
  overflow: hidden;
  text-align: center;
  z-index: 200;
`;

const GamesHeroContentWrapper = styled.div`
  background: url(${Background});
  background-position: center;
  height: 110vh;
  padding: 3rem 1rem;
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

const GamesHeroContent = styled.div`
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media only screen and (max-width: ${breakPoints.medium}) {
    top: 60%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }
`;

export default function GamesHero() {
  return (
    <GamesHeroWrapper>
      <GamesHeroContentWrapper>
        <GamesHeroContent className="mt-4">
          <HeadingTwo className="hero__title">Games</HeadingTwo>
          <div className="mt-n4 ml-lg-1 ml-md-1">
            <ParagraphOne>Play and Chop barh!</ParagraphOne>
          </div>
        </GamesHeroContent>
      </GamesHeroContentWrapper>
    </GamesHeroWrapper>
  );
}
