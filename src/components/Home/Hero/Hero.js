import React from "react";
import styled from "styled-components";
import color from "../../styles/colors";
import breakPoints from "../../styles/breakpoints";
import Background from "../../assets/svg/WavyHeader.svg";
import slider2BG from "../../assets/img/slider_2_BG.png";
import slider3BG from "../../assets/img/slider_3_BG.png";

const HeroWrapper = styled.div`
  height: 85vh;
  /* width: 98.7vw; */
  padding: 3rem 0rem;
  position: relative;
  background: ${color.colorPrimary};
  /* background: crimson; url(${Background}); */
  color: ${color.colorWhite};
`;

const HeroContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);

  @media only screen and (max-width: ${breakPoints.medium}) {
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }
`;

const HeadingTwo = styled.h2`
  font-size: 7rem;
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

const Image = styled.img`
  height: 94.4vh;
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

export default function Hero() {
  return (
    <HeroWrapper>
      {/* <HeroContentWrapper>
        <HeadingTwo className="hero__title">Play and Chop</HeadingTwo>
        <div className="mt-n4 ml-lg-1 ml-md-1">
          <ParagraphOne>
            Play and win from collection of childhood games that live up to the
            moment
          </ParagraphOne>
        </div>
        <div className="hero__buttons mt-4 ml-lg-3 ml-md-3">
          <Button className="mr-4">
            <span>Start Playing</span>
          </Button>
          <Button className="ml-4">
            <span>Download</span>
          </Button>
        </div>
      </HeroContentWrapper> */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
        data-interval="2000"
        style={{ marginTop: "-9rem", width: "100%" }}
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          />
          <li data-target="#carouselExampleIndicators" data-slide-to="1" />
          <li data-target="#carouselExampleIndicators" data-slide-to="2" />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div style={{ position: "relative" }}>
              <Image
                className="d-block w-100"
                src={Background}
                alt="First slide"
              />
              <div
                className="text-center"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  zIndex: "2000",
                  transform: `translate(-50%, -50%)`
                }}
              >
                <HeadingTwo className="hero__title">Play and Chop</HeadingTwo>
                <ParagraphOne>
                  Play and win from collection of childhood games that live up
                  to the moment
                </ParagraphOne>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div style={{ position: "relative" }}>
              <Image
                className="d-block w-100"
                src={slider2BG}
                alt="First slide"
              />
              <div
                className="text-center"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  zIndex: "2000",
                  transform: `translate(-50%, -50%)`
                }}
              >
                <HeadingTwo className="hero__title">
                  No Bank Account?
                </HeadingTwo>
                <ParagraphOne>
                  No problem, we will send your money to your phone number, then
                  you can transfer to any account or withdraw from an ATM
                </ParagraphOne>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div style={{ position: "relative" }}>
              <Image
                className="d-block w-100"
                src={slider3BG}
                alt="First slide"
              />
              <div
                className="text-center"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  zIndex: "2000",
                  transform: `translate(-50%, -50%)`
                }}
              >
                <HeadingTwo className="hero__title">
                  No be come lick stew
                </HeadingTwo>
                <ParagraphOne>You go lick stew chop rice</ParagraphOne>
              </div>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </HeroWrapper>
  );
}

// No Bank Account?
// No problem, we will send your money to your phone number, then you can transfer to any account or withdraw from an ATM

// No be come lick stew
// You go lick stew chop rice

//
