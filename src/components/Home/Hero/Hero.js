import React from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";
import Slider from "react-animated-slider";
import MediaQuery from "react-responsive";
import color from "../../styles/colors";
import breakPoints from "../../styles/breakpoints";
import Background from "../../assets/svg/WavyHeader.svg";
import AppStoreButton from "../../assets/img/AppStore.png";
import PlayStoreButton from "../../assets/img/PlayStore@2x.png";
// import VendorButton from "../../assets/img/vendor_button@2x.png";
import AndroidInstructions from "../../assets/img/AndroidInstructions@2x.png";

import "react-animated-slider/build/horizontal.css";

const HeroWrapper = styled.div`
  height: 87vh;
  /* width: 98.7vw; */
  position: relative;
  background: url(${Background}) ${color.colorPrimary};
  overflow: hidden;
  color: ${color.colorWhite};

  @media only screen and (max-width: ${breakPoints.smallest}) {
    height: 94vh;
  }
`;

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

  @media only screen and (max-width: ${breakPoints.smallest}) {
    font-size: 2rem;
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

  @media only screen and (max-width: ${breakPoints.smallest}) {
    margin-top: 0.5rem;
  }
`;

const Image = styled.img`
  height: 6rem;
  width: 17rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-3px);
  }

  @media only screen and (max-width: ${breakPoints.medium}) {
    height: 5rem;
    width: 17rem;
  }

  @media only screen and (max-width: ${breakPoints.small}) {
    height: 9rem;
    width: 22rem;
  }

  /* @media only screen and (max-width: ${breakPoints.smaller}) {
    height: 5rem;
    width: 18rem;
  } */
`;

const AndroidInstructionImage = styled(Image)`
  @media only screen and (max-width: ${breakPoints.small}) {
    margin-top: 5rem;
  }

  @media only screen and (max-width: ${breakPoints.smaller}) {
    margin-top: 1rem;
  }

  @media only screen and (max-width: ${breakPoints.smallest}) {
    margin-top: 0.8rem;
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

const SliderContentSmallScreens = styled(SliderContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

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

// const ScrollContainer = styled.div`
//   position: absolute;
//   left: 50%;
//   top: 90%;
//   transform: translate(-50%, -50%);
//   transition: all 0.2s;
//   cursor: pointer;

//   &:hover {
//     transform: translate(-50%, -60%);
//   }
// `;

const VendorButtonImage = styled.img`
  width: 48%;
  transition: all 0.2s;
  margin-top: 3rem;

  @media only screen and (max-width: ${breakPoints.large}) {
    width: 60%;
  }

  &:hover {
    cursor: pointer;
    transform: translateY(-3px);
  }
`;

export const VendorButtonImageFirstSlide = styled(VendorButtonImage)`
  padding-left: 1rem;
  margin-top: 3rem;
  width: 50%;
`;

export const VendorButtonImageSmall = styled.img`
  width: 100%;
  transition: all 0.2s;
  margin-top: 4rem;

  @media only screen and (max-width: ${breakPoints.small}) {
    margin-top: 1rem;
  }

  @media only screen and (max-width: ${breakPoints.smaller}) {
    width: 25rem;
  }

  &:hover {
    cursor: pointer;
    transform: translateY(-3px);
  }
`;

export default function Hero() {
  return (
    <Container>
      <MediaQuery minDeviceWidth={767}>
        <Slider autoplay={3000}>
          <div
            style={{
              background: `url('${Background}') ${color.colorPrimary} no-repeat center center`,
              backgroundSize: "cover",
              color: "#fff",
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
                      className="mr-lg-3 mr-md-3 mr-sm-2 mb-md-2"
                      alt="App Store"
                    />
                  </a>
                </span>
                <span style={{ cursor: "pointer" }}>
                  <a href="https://downloads.chopbarh.com/chopbarh.apk">
                    <Image
                      src={PlayStoreButton}
                      className="mr-lg-3 mt-lg-3 mt-md-3 mr-md-3 mr-sm-2 mb-lg-3 mb-md-3"
                      alt="Play Store"
                    />
                  </a>
                </span>
                <span style={{ cursor: "pointer" }}>
                  <a href="https://www.youtube.com/watch?v=5ESVBaQcoRA&feature=youtu.be">
                    <Image
                      src={AndroidInstructions}
                      className="mb-lg-3 mt-lg-3 mt-md-3 mb-md-3"
                      alt="Play Store"
                    />
                  </a>
                </span>
              </div>
              {/* <Link to="vendors">
                <VendorButtonImageFirstSlide src={VendorButton} />
              </Link> */}
            </SliderContent>
            <SliderImage
              className="d-block"
              src="https://res.cloudinary.com/chopbarh/image/upload/v1564748049/Landing%20Page%20Assets/slider_1_vfw3gc.png"
              alt="User"
            />
          </div>
          <div
            style={{
              background: `url('https://res.cloudinary.com/chopbarh/image/upload/v1564747886/Landing%20Page%20Assets/SliderImage1_byohor.jpg') ${color.colorPrimary} no-repeat center center`,
              backgroundSize: "cover",
            }}
          >
            <SliderContent className="text-center">
              <div className="hero__buttons mt-4 ml-lg-3 ml-md-3">
                <span style={{ cursor: "pointer" }}>
                  <a href="https://apps.apple.com/us/app/chopbarh/id1463959707?ls=1">
                    <Image
                      src={AppStoreButton}
                      className="mr-lg-3 mr-md-3 mr-sm-2 mb-md-2"
                      alt="App Store"
                    />
                  </a>
                </span>
                <span style={{ cursor: "pointer" }}>
                  <a href="https://downloads.chopbarh.com/chopbarh.apk">
                    <Image
                      src={PlayStoreButton}
                      className="mr-lg-3 mt-lg-3 mt-md-3 mr-md-3 mr-sm-2 mb-lg-3 mb-md-3"
                      alt="Play Store"
                    />
                  </a>
                </span>
                <span style={{ cursor: "pointer" }}>
                  <a href="https://www.youtube.com/watch?v=5ESVBaQcoRA&feature=youtu.be">
                    <Image
                      src={AndroidInstructions}
                      className="mb-lg-3 mb-md-3 mt-lg-3 mt-md-3"
                      alt="Play Store"
                    />
                  </a>
                </span>
              </div>
              {/* <Link to="vendors">
                <VendorButtonImage src={VendorButton} />
              </Link> */}
            </SliderContent>
          </div>
          <div
            style={{
              background: `url('https://res.cloudinary.com/chopbarh/image/upload/v1564747891/Landing%20Page%20Assets/SliderImage2_hkx0ey.jpg') ${color.colorPrimary} no-repeat center center`,
              backgroundSize: "cover",
              color: "#fff",
            }}
          >
            <SliderContent className="text-center">
              <HeadingTwo className="hero__title">
                No be say come lick stew
              </HeadingTwo>
              <ParagraphOne>You go lick stew chop rice</ParagraphOne>
              <div className="hero__buttons mt-4 ml-lg-3 ml-md-3">
                <span style={{ cursor: "pointer" }}>
                  <a href="https://apps.apple.com/us/app/chopbarh/id1463959707?ls=1">
                    <Image
                      src={AppStoreButton}
                      className="mr-lg-3 mr-md-3 mr-sm-2 mb-md-2"
                      alt="App Store"
                    />
                  </a>
                </span>
                <span style={{ cursor: "pointer" }}>
                  <a href="https://downloads.chopbarh.com/chopbarh.apk">
                    <Image
                      src={PlayStoreButton}
                      className="mr-lg-3 mt-lg-3 mt-md-3 mr-md-3 mr-sm-2 mb-lg-3 mb-md-3"
                      alt="Play Store"
                    />
                  </a>
                </span>
                <span style={{ cursor: "pointer" }}>
                  <a href="https://www.youtube.com/watch?v=5ESVBaQcoRA&feature=youtu.be">
                    <Image
                      src={AndroidInstructions}
                      className="mb-lg-3 mb-md-3 mt-lg-3 mt-md-3"
                      alt="Play Store"
                    />
                  </a>
                </span>
              </div>
              {/* <Link to="vendors">
                <VendorButtonImage src={VendorButton} />
              </Link> */}
            </SliderContent>
          </div>
          <div
            style={{
              background: `url('https://res.cloudinary.com/chopbarh/image/upload/v1564747891/Landing%20Page%20Assets/SliderImage3_q37kzi.jpg') ${color.colorPrimary} no-repeat center center`,
              backgroundSize: "cover",
            }}
          >
            <SliderContent className="text-center">
              <div className="hero__buttons mt-4 ml-lg-3 ml-md-3">
                <span style={{ cursor: "pointer" }}>
                  <a href="https://apps.apple.com/us/app/chopbarh/id1463959707?ls=1">
                    <Image
                      src={AppStoreButton}
                      className="mr-lg-3 mr-md-3 mr-sm-2 mb-md-2"
                      alt="App Store"
                    />
                  </a>
                </span>
                <span style={{ cursor: "pointer" }}>
                  <a href="https://downloads.chopbarh.com/chopbarh.apk">
                    <Image
                      src={PlayStoreButton}
                      className="mr-lg-3 mt-lg-3 mt-md-3 mr-md-3 mr-sm-2 mb-lg-3 mb-md-3"
                      alt="Play Store"
                    />
                  </a>
                </span>
                <span style={{ cursor: "pointer" }}>
                  <a href="https://www.youtube.com/watch?v=5ESVBaQcoRA&feature=youtu.be">
                    <Image
                      src={AndroidInstructions}
                      className="mb-lg-3 mb-md-3 mt-lg-3 mt-md-3"
                      alt="Play Store"
                    />
                  </a>
                </span>
              </div>
              {/* <Link to="vendors">
                <VendorButtonImage src={VendorButton} />
              </Link> */}
            </SliderContent>
          </div>
          <div
            style={{
              background: `url('https://res.cloudinary.com/chopbarh/image/upload/v1564747893/Landing%20Page%20Assets/SliderImage4_pjltmr.jpg') no-repeat center center`,
              backgroundSize: "cover",
            }}
          >
            <SliderContent className="text-center">
              <div className="hero__buttons mt-4 ml-lg-3 ml-md-3">
                <span style={{ cursor: "pointer" }}>
                  <a href="https://apps.apple.com/us/app/chopbarh/id1463959707?ls=1">
                    <Image
                      src={AppStoreButton}
                      className="mr-lg-3 mr-md-3 mr-sm-2 mb-md-2"
                      alt="App Store"
                    />
                  </a>
                </span>
                <span style={{ cursor: "pointer" }}>
                  <a href="https://downloads.chopbarh.com/chopbarh.apk">
                    <Image
                      src={PlayStoreButton}
                      className="mr-lg-3 mt-lg-3 mt-md-3 mr-md-3 mr-sm-2 mb-lg-3 mb-md-3"
                      alt="Play Store"
                    />
                  </a>
                </span>
                <span style={{ cursor: "pointer" }}>
                  <a href="https://www.youtube.com/watch?v=5ESVBaQcoRA&feature=youtu.be">
                    <Image
                      src={AndroidInstructions}
                      className="mb-lg-3 mb-md-3 mt-lg-3 mt-md-3"
                      alt="Play Store"
                    />
                  </a>
                </span>
              </div>
              {/* <Link to="vendors">
                <VendorButtonImage src={VendorButton} />
              </Link> */}
            </SliderContent>
          </div>
        </Slider>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={767}>
        <HeroWrapper>
          <div>
            <SliderContentSmallScreens>
              <div>
                <MediaQuery maxDeviceWidth={425}>
                  {/* <iframe
                    title="Chopbarh Video"
                    width="300"
                    height="250"
                    src="https://www.youtube.com/embed/gBeXOvNpR3c"
                  ></iframe> */}
                  <HeadingTwoFirst
                    className="hero__title"
                    style={{ color: "#ebc709" }}
                  >
                    COVID-19
                    <br />
                    &#8358;10 Billion Intervention Funds Available
                  </HeadingTwoFirst>
                </MediaQuery>
                <HeadingTwoFirst className="hero__title mt-4">
                  DOWNLOAD NOW
                </HeadingTwoFirst>
                <ParagraphOne>
                  Play and win from collection of childhood games that live up
                  to the moment
                </ParagraphOne>
                <div className="hero__buttons mt-4 ml-lg-3 ml-md-3">
                  <span style={{ cursor: "pointer" }}>
                    <a href="https://apps.apple.com/us/app/chopbarh/id1463959707?ls=1">
                      <Image
                        src={AppStoreButton}
                        className="mr-lg-3 mr-md-3 mr-sm-2 mb-2"
                        alt="App Store"
                      />
                    </a>
                  </span>
                  <span style={{ cursor: "pointer" }}>
                    <a href="https://downloads.chopbarh.com/chopbarh.apk">
                      <Image
                        src={PlayStoreButton}
                        className="mr-lg-4 mr-md-4 mr-sm-2 mb-lg-3 mb-md-3 mb-2"
                        alt="Play Store"
                      />
                    </a>
                  </span>
                  {/* <span>
                    <ParagraphOne
                      style={{ textTransform: "uppercase", fontWeight: "bold" }}
                    >
                      Download now and get &#8358;100 free
                    </ParagraphOne>
                  </span> */}
                  <span style={{ cursor: "pointer" }}>
                    <a href="https://www.youtube.com/watch?v=5ESVBaQcoRA&feature=youtu.be">
                      <AndroidInstructionImage
                        src={AndroidInstructions}
                        className="mr-lg-4 mr-md-4 mr-sm-2"
                        alt="Play Store"
                      />
                    </a>
                  </span>
                  {/* <Link to="vendors">
                    <VendorButtonImageSmall src={VendorButton} />
                  </Link> */}
                </div>
              </div>
            </SliderContentSmallScreens>
            <SliderImage
              className="d-block"
              src="https://res.cloudinary.com/chopbarh/image/upload/v1564748049/Landing%20Page%20Assets/slider_1_vfw3gc.png"
              alt="User"
            />
          </div>
        </HeroWrapper>
      </MediaQuery>
    </Container>
  );
}
