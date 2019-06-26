import React from "react";
import styled from "styled-components";
import Slider from "react-animated-slider";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";
import Image1 from "../../../assets/img/ChopBarhPairs1.png";
import Image2 from "../../../assets/img/ChopBarhPairs2.png";
import Image3 from "../../../assets/img/ChopBarhPairs3.png";
import Image4 from "../../../assets/img/ChopBarhPairs4.png";
import Image5 from "../../../assets/img/ChopBarhPairs5.png";
import Image6 from "../../../assets/img/ChopBarhPairs6.png";

import "react-animated-slider/build/horizontal.css";

const HeadingTwo = styled.h2`
  font-size: 3.5rem;
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;
`;

const HeadingTwoFirst = styled(HeadingTwo)`
  @media only screen and (max-width: 350px) {
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
  }
`;

const ParagraphOne = styled.p`
  font-size: 1.7rem;
  font-weight: 400;

  @media only screen and (max-width: ${breakPoints.medium}) {
    font-size: 1.5rem;
  }

  @media only screen and (max-width: ${breakPoints.small}) {
    margin-top: 1rem;
    font-size: 1.3rem;
  }
`;

const Image = styled.img`
  height: 20rem;
`;

const SliderContent = styled.div`
  position: absolute;
  top: 35%;
  left: ${props => (props.first ? "35%" : "50%")};
  z-index: 2000;
  transform: translate(-50%, -50%);

  margin-left: ${props => (props.first ? "2rem" : "0")};

  @media only screen and (max-width: ${breakPoints.large}) {
    left: 50%;
    text-align: center;
  }

  @media only screen and (max-width: ${breakPoints.smaller}) {
    margin-left: 0;
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
  background: ${color.colorPrimaryHover};
  color: ${color.colorWhite};

  span {
    display: inline-block;
    transform: skew(20deg);
  }

  &:hover {
    transform: translateY(-3px) skew(-20deg);
  }

  @media only screen and (max-width: ${breakPoints.medium}) {
    font-size: 1.3rem;
  }

  @media only screen and (max-width: ${breakPoints.small}) {
    font-size: 0.9rem;
  }

  @media only screen and (max-width: ${breakPoints.smaller}) {
    font-size: 0.8rem;
  }

  @media only screen and (max-width: ${breakPoints.smallest}) {
    padding: 0.5rem 0.8rem;
  }
`;

const GameItemsWrapper = styled.div`
  margin: 7rem 0 2rem 0;
  text-align: center;
`;

export default function QuickPlayTransaction() {
  return (
    <GameItemsWrapper>
      <HeadingTwo className="mt-4 mb-5">Quick Play</HeadingTwo>
      <Slider autoplay={3000} infinite="true">
        <div>
          <SliderContent>
            <Image src={Image1} alt="The Image" />
            <HeadingTwoFirst className="hero__title mt-5">
              Play and Chop
            </HeadingTwoFirst>
            <ParagraphOne>
              Play and win from collection of childhood games that live up to
              the moment
            </ParagraphOne>
            <div className="hero__buttons mt-2 ml-lg-3 ml-md-3">
              <Button className="mr-lg-4 mr-md-4 mr-sm-2">
                <span>Start Playing</span>{" "}
              </Button>
              <Button className="mr-lg-4 mr-md-4">
                <span>Get it on iOS</span>
              </Button>
              <Button className="mr-lg-4 mr-md-4 mt-md-2">
                <span>Get it on Android</span>
              </Button>
            </div>
          </SliderContent>
        </div>
        <div>
          <SliderContent>
            <Image src={Image2} alt="The Image" />
            <HeadingTwoFirst className="hero__title mt-5">
              Play and Chop
            </HeadingTwoFirst>
            <ParagraphOne>
              Play and win from collection of childhood games that live up to
              the moment
            </ParagraphOne>
            <div className="hero__buttons mt-2 ml-lg-3 ml-md-3">
              <Button className="mr-lg-4 mr-md-4 mr-sm-2">
                <span>Start Playing</span>{" "}
              </Button>
              <Button className="mr-lg-4 mr-md-4">
                <span>Get it on iOS</span>
              </Button>
              <Button className="mr-lg-4 mr-md-4 mt-md-2">
                <span>Get it on Android</span>
              </Button>
            </div>
          </SliderContent>
        </div>
        <div>
          <SliderContent>
            <Image src={Image3} alt="The Image" />
            <HeadingTwoFirst className="hero__title mt-5">
              Play and Chop
            </HeadingTwoFirst>
            <ParagraphOne>
              Play and win from collection of childhood games that live up to
              the moment
            </ParagraphOne>
            <div className="hero__buttons mt-2 ml-lg-3 ml-md-3">
              <Button className="mr-lg-4 mr-md-4 mr-sm-2">
                <span>Start Playing</span>{" "}
              </Button>
              <Button className="mr-lg-4 mr-md-4">
                <span>Get it on iOS</span>
              </Button>
              <Button className="mr-lg-4 mr-md-4 mt-md-2">
                <span>Get it on Android</span>
              </Button>
            </div>
          </SliderContent>
        </div>
        <div>
          <SliderContent>
            <Image src={Image4} alt="The Image" />
            <HeadingTwoFirst className="hero__title mt-5">
              Play and Chop
            </HeadingTwoFirst>
            <ParagraphOne>
              Play and win from collection of childhood games that live up to
              the moment
            </ParagraphOne>
            <div className="hero__buttons mt-2 ml-lg-3 ml-md-3">
              <Button className="mr-lg-4 mr-md-4 mr-sm-2">
                <span>Start Playing</span>{" "}
              </Button>
              <Button className="mr-lg-4 mr-md-4">
                <span>Get it on iOS</span>
              </Button>
              <Button className="mr-lg-4 mr-md-4 mt-md-2">
                <span>Get it on Android</span>
              </Button>
            </div>
          </SliderContent>
        </div>
        <div>
          <SliderContent>
            <Image src={Image5} alt="The Image" />
            <HeadingTwoFirst className="hero__title mt-5">
              Play and Chop
            </HeadingTwoFirst>
            <ParagraphOne>
              Play and win from collection of childhood games that live up to
              the moment
            </ParagraphOne>
            <div className="hero__buttons mt-2 ml-lg-3 ml-md-3">
              <Button className="mr-lg-4 mr-md-4 mr-sm-2">
                <span>Start Playing</span>{" "}
              </Button>
              <Button className="mr-lg-4 mr-md-4">
                <span>Get it on iOS</span>
              </Button>
              <Button className="mr-lg-4 mr-md-4 mt-md-2">
                <span>Get it on Android</span>
              </Button>
            </div>
          </SliderContent>
        </div>
        <div>
          <SliderContent>
            <Image src={Image6} alt="The Image" />
            <HeadingTwoFirst className="hero__title mt-5">
              Play and Chop
            </HeadingTwoFirst>
            <ParagraphOne>
              Play and win from collection of childhood games that live up to
              the moment
            </ParagraphOne>
            <div className="hero__buttons mt-2 ml-lg-3 ml-md-3">
              <Button className="mr-lg-4 mr-md-4 mr-sm-2">
                <span>Start Playing</span>{" "}
              </Button>
              <Button className="mr-lg-4 mr-md-4">
                <span>Get it on iOS</span>
              </Button>
              <Button className="mr-lg-4 mr-md-4 mt-md-2">
                <span>Get it on Android</span>
              </Button>
            </div>
          </SliderContent>
        </div>
      </Slider>
    </GameItemsWrapper>
  );
}
