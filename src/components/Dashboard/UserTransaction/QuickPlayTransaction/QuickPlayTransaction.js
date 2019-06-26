import React from "react";
import styled from "styled-components";
// import {
//   CarouselProvider,
//   Slider,
//   Slide,
//   ButtonBack,
//   ButtonNext
// } from "pure-react-carousel";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";
import Image1 from "../../../assets/img/ChopBarhPairs6.png";
import Image2 from "../../../assets/img/ChopBarhPairs2.png";

import Slider from "react-animated-slider";

import "react-animated-slider/build/horizontal.css";

import "pure-react-carousel/dist/react-carousel.es.css";

const HeadingTwo = styled.h2`
  font-size: 3.5rem;
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;

  @media only screen and (max-width: ${breakPoints.medium}) {
    font-size: 6rem;
  }

  @media only screen and (max-width: ${breakPoints.small}) {
    font-size: 4.5rem;
  }

  @media only screen and (max-width: ${breakPoints.smaller}) {
    font-size: 3.5rem;
  }

  @media only screen and (max-width: ${breakPoints.smallest}) {
    font-size: 3rem;
  }

  @media only screen and (max-width: 350px) {
    font-size: 2.5rem;
  }
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
  /* object-position: center top; */
  /* width: 100%;
  height: 100vh; */
  height: 20rem;
  background: crimson;
`;

const SliderImage = styled.img`
  position: absolute;
  top: 15vh;
  left: 50vw;

  width: 50%;

  @media only screen and (max-width: 1199px) {
    top: 20vh !important;
  }

  @media only screen and (max-width: 1140px) {
    top: 26vh !important;
  }

  @media only screen and (max-width: ${breakPoints.large}) {
    display: none !important;
  }
`;

const SliderContent = styled.div`
  position: absolute;
  top: 50%;
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
  margin: 7rem 0;
  text-align: center;
`;

// const Image = styled.img`
//   height: 20rem;
// `;

// const HeadingTwo = styled.h3`
//   font-size: 2rem;
//   font-weight: bold;
//   color: #4c4c4c;
//   margin-left: -15px;

//   @media only screen and (max-width: ${breakPoints.medium}) {
//     text-align: center;
//   }
// `;

const HeadingThree = styled.h3`
  font-size: 2rem;
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
    color: #4c4c4c;
    font-size: 1.3rem;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: ${breakPoints.medium}) {
    flex-direction: column;
    justify-content: center;

    text-align: center;
  }
`;

// const Button = styled.button`
//   all: unset;
//   border: 3px solid ${color.colorWhite};
//   padding: 1rem 1.3rem;
//   font-size: 1.2rem;
//   font-weight: 600;
//   transform: skew(-20deg);
//   display: inline-block;
//   transition: all 0.2s;
//   color: #4c4c4c;

//   span {
//     display: inline-block;
//     transform: skew(20deg);
//   }

//   &:hover {
//     transform: translateY(-3px) skew(-20deg);
//     color: ${color.colorWhite};
//     background: ${color.colorPrimaryHover};
//   }

//   @media only screen and (max-width: ${breakPoints.medium}) {
//     font-size: 1.3rem;
//   }

//   @media only screen and (max-width: ${breakPoints.small}) {
//     font-size: 1.2rem;
//   }
// `;

export default function QuickPlayTransaction() {
  return (
    <GameItemsWrapper>
      <HeadingTwo className="mt-4 mb-5">Quick Play</HeadingTwo>
      <Slider autoplay={3000}>
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
          {/* <SliderImage className="d-block" src={slider1} alt="User" /> */}
        </div>
        <div
          style={{
            background: `url('${Image1}') no-repeat center center`,
            backgroundSize: "cover"
          }}
        >
          {/* <div className="center">
          <h1>title</h1>
          <p>description</p>
          <button>button</button>
        </div> */}
        </div>
        <div
          style={{
            background: `url('${Image2}') no-repeat center center`,
            backgroundSize: "cover",
            color: "#fff"
          }}
        >
          <SliderContent className="text-center">
            <HeadingTwo className="hero__title">
              No be say come lick stew
            </HeadingTwo>
            <ParagraphOne>You go lick stew chop rice</ParagraphOne>
          </SliderContent>
        </div>
        <div
          style={{
            background: `url('${Image1}') no-repeat center center`,
            height: "100vh",
            backgroundSize: "cover"
          }}
        >
          {/* <div className="center">
          <h1>title</h1>
          <p>description</p>
          <button>button</button>
        </div> */}
        </div>
        <div
          style={{
            background: `url('${Image2}') no-repeat center center`,
            height: "100vh",
            backgroundSize: "cover"
          }}
        >
          {/* <div className="center">
          <h1>title</h1>
          <p>description</p>
          <button>button</button>
        </div> */}
        </div>
      </Slider>
      {/* <CarouselProvider
        naturalSlideWidth={50}
        naturalSlideHeight={50}
        totalSlides={3}
      >
        <Slider>
          <Slide index={0}>I am the first</Slide>
          <Slide index={1}>I am the second</Slide>
          <Slide index={2}>I am the third</Slide>
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider> */}
      {/* <div className="row">
        <Column>
          <Content>
            <Image alt="Ludo" className="mr-lg-5 mr-md-3" src={Image1} />
            <div>
              <HeadingThree className="mt-4 mb-3">Table Soccer</HeadingThree>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                mollitia fugiat veritatis omnis, iste, itaque cupiditate facilis
                reiciendis ex repellat accusamus sint, nostrum non blanditiis at
                pariatur distinctio beatae magni.
              </p>
              <div className="mt-2">
                <Button>
                  <span>Web Version</span>
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
        <Column>
          <Content>
            <Image alt="Ludo" className="mr-lg-5 mr-md-3" src={Image2} />
            <div>
              <HeadingThree className="mt-4 mb-3">Dice</HeadingThree>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                mollitia fugiat veritatis omnis, iste, itaque cupiditate facilis
                reiciendis ex repellat accusamus sint, nostrum non blanditiis at
                pariatur distinctio beatae magni.
              </p>
              <div className="mt-2">
                <Button>
                  <span>Web Version</span>
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
      </div> */}
    </GameItemsWrapper>
  );
}
