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
  font-size: 8rem;
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;

  @media only screen and (max-width: ${breakPoints.medium}) {
    font-size: 6rem;
  }

  @media only screen and (max-width: ${breakPoints.small}) {
    font-size: 4.5rem;
  }
`;

const ParagraphOne = styled.p`
  font-size: 1.5rem;
  font-weight: 400;

  @media only screen and (max-width: ${breakPoints.medium}) {
    font-size: 1.3rem;
  }

  @media only screen and (max-width: ${breakPoints.small}) {
    margin-top: 1rem;
    font-size: 1.2rem;
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

export default function GamesHero() {
  return (
    <GamesHeroWrapper>
      <GamesHeroContentWrapper>
        {/* <img src="assets/img/Smiling guy.png" className="hero__image" alt="" /> */}
        <HeadingTwo className="hero__title">Games</HeadingTwo>
        <div className="mt-n4 ml-lg-1 ml-md-1">
          <ParagraphOne>
            Play and win from collection of childhood games that live up to the
            moment
          </ParagraphOne>
        </div>
      </GamesHeroContentWrapper>
    </GamesHeroWrapper>
  );
}
