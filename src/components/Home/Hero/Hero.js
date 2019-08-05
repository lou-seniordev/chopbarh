import React from "react";
import styled from "styled-components";
import Slider from "react-animated-slider";
import { ScrollTo } from "react-scroll-to";
import MediaQuery from "react-responsive";
import { Down } from "grommet-icons";
import color from "../../styles/colors";
import breakPoints from "../../styles/breakpoints";
import Background from "../../assets/svg/WavyHeader.svg";
import AppStoreButton from "../../assets/img/AppStore.png";
import PlayStoreButton from "../../assets/img/PlayStore.png";

import "react-animated-slider/build/horizontal.css";

// const HeroWrapper = styled.div`
//   height: 87vh;
//   /* width: 98.7vw; */
//   position: relative;
//   /* background: ${color.colorPrimary}; */
//   /* background: crimson; url(${Background}); */
//   overflow: hidden;
//   color: ${color.colorWhite};
// `;

// const HeroContentWrapper = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 10%;
//   transform: translateY(-50%);

//   @media only screen and (max-width: ${breakPoints.medium}) {
//     top: 30%;
//     left: 50%;
//     transform: translateX(-50%);
//     text-align: center;
//   }
// `;

const HeadingTwo = styled.h2`
  font-size: 6.5rem;
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
  height: 5rem;
  width: 15rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-3px);
  }

  @media only screen and (max-width: ${breakPoints.medium}) {
    height: 4rem;
    width: 15rem;
  }

  @media only screen and (max-width: ${breakPoints.small}) {
    height: 3.2rem;
    width: 10rem;
    margin-top: 0.26rem;
    margin-right: 0.3rem;
  }

  @media only screen and (max-width: ${breakPoints.smaller}) {
    height: 3rem;
    width: 10rem;
  }

  @media only screen and (max-width: ${breakPoints.smallest}) {
    height: 3rem;
    width: 10rem;
  }
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

// const Button = styled.button`
//   all: unset;
//   border: 3px solid ${color.colorWhite};
//   padding: 1rem 1.3rem;
//   font-size: 1.5rem;
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

//   @media only screen and (max-width: ${breakPoints.medium}) {
//     font-size: 1.3rem;
//     padding: 0.7rem 1.3rem;
//   }

//   @media only screen and (max-width: ${breakPoints.small}) {
//     font-size: 0.9rem;
//     margin-right: 0.5rem;
//     padding: 0.5rem 1rem;
//   }

//   @media only screen and (max-width: ${breakPoints.smaller}) {
//     font-size: 0.8rem;
//   }

//   @media only screen and (max-width: ${breakPoints.smallest}) {
//     padding: 0.5rem 0.8rem;
//   }
// `;

// const MainLink = styled.a`
//   all: unset;
//   border: 3px solid ${color.colorWhite};
//   padding: 1rem 1.3rem;
//   font-size: 1.5rem;
//   font-weight: 600;
//   transform: skew(-20deg);
//   display: inline-block;
//   transition: all 0.2s;
//   cursor: pointer;

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
//     padding: 0.7rem 1.3rem;
//   }

//   @media only screen and (max-width: ${breakPoints.small}) {
//     font-size: 0.9rem;
//     margin-right: 0.5rem;
//     padding: 0.5rem 1rem;
//   }

//   @media only screen and (max-width: ${breakPoints.smaller}) {
//     font-size: 0.8rem;
//   }

//   @media only screen and (max-width: ${breakPoints.smallest}) {
//     padding: 0.5rem 0.8rem;
//   }
// `;

const Container = styled.div`
  position: relative;
`;

const ScrollContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 90%;
  transform: translate(-50%, -50%);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: translate(-50%, -60%);
  }
`;

export default function Hero() {
  return (
    <Container>
      {/* <MediaQuery minDeviceWidth={767}>
        <ScrollTo>
          {({ scrollTo }) => (
            <ScrollContainer style={{ zIndex: "2000" }}>
              <Down
                color="white"
                onClick={() => scrollTo({ x: 0, y: 580, smooth: true })}
              />
            </ScrollContainer>
          )}
        </ScrollTo>
      </MediaQuery> */}
      <MediaQuery maxDeviceWidth={767}>
        <ScrollTo>
          {({ scrollTo }) => (
            <ScrollContainer style={{ zIndex: "2000" }}>
              <Down
                color="white"
                onClick={() => scrollTo({ x: 0, y: 540, smooth: true })}
              />
            </ScrollContainer>
          )}
        </ScrollTo>
      </MediaQuery>
      <Slider autoplay={3000}>
        <div
          style={{
            background: `url('${Background}') ${
              color.colorPrimary
            } no-repeat center center`,
            backgroundSize: "cover",
            color: "#fff"
          }}
        >
          <SliderContent>
            <HeadingTwoFirst className="hero__title">
              Play and Chop
            </HeadingTwoFirst>
            <ParagraphOne>
              Play and win from collection of childhood games that live up to
              the moment
            </ParagraphOne>
            <div className="hero__buttons mt-4 ml-lg-3 ml-md-3">
              {/* <MainLink
                href="https://downloads.chopbarh.com/chopbarh.apk https://play.google.com/store/apps/details?id=com.chopbarh.common"
                target="_blank"
                className="mr-lg-4 mr-md-4 mr-sm-2"
              >
                <span style={{ color: "#ffffff" }}>Start Playing</span>{" "}
              </MainLink> */}
              <span style={{ cursor: "pointer" }}>
                <a href="https://apps.apple.com/us/app/chopbarh/id1463959707?ls=1">
                  <Image
                    src={AppStoreButton}
                    className="mr-lg-4 mr-md-4 mr-sm-2 mb-md-2"
                    alt="App Store"
                  />
                </a>
              </span>
              <span style={{ cursor: "pointer" }}>
                <a href="https://downloads.chopbarh.com/chopbarh.apk">
                  <Image
                    src={PlayStoreButton}
                    className="mr-lg-4 mr-md-4 mr-sm-2"
                    alt="Play Store"
                  />
                </a>
              </span>
            </div>
          </SliderContent>
          <SliderImage
            className="d-block"
            src="https://res.cloudinary.com/chopbarh/image/upload/v1564748049/Landing%20Page%20Assets/slider_1_vfw3gc.png"
            alt="User"
          />
        </div>
        <div
          style={{
            background: `url('https://res.cloudinary.com/chopbarh/image/upload/v1564747886/Landing%20Page%20Assets/SliderImage1_byohor.jpg') ${
              color.colorPrimary
            } no-repeat center center`,
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
            background: `url('https://res.cloudinary.com/chopbarh/image/upload/v1564747891/Landing%20Page%20Assets/SliderImage2_hkx0ey.jpg') ${
              color.colorPrimary
            } no-repeat center center`,
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
            background: `url('https://res.cloudinary.com/chopbarh/image/upload/v1564747891/Landing%20Page%20Assets/SliderImage3_q37kzi.jpg') ${
              color.colorPrimary
            } no-repeat center center`,
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
            background: `url('https://res.cloudinary.com/chopbarh/image/upload/v1564747893/Landing%20Page%20Assets/SliderImage4_pjltmr.jpg') no-repeat center center`,
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
    </Container>
  );
}
