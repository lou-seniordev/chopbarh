import React from "react";
import styled from "styled-components";
import Slider from "react-animated-slider";
import color from "../../styles/colors";
import breakPoints from "../../styles/breakpoints";
import Background from "../../assets/svg/WavyHeader.svg";
import slider1 from "../../assets/img/slider_1.png";
import sliderImage1 from "../../assets/img/SliderImage1.jpg";
import sliderImage2 from "../../assets/img/SliderImage2.jpg";
import sliderImage3 from "../../assets/img/SliderImage3.jpg";
import sliderImage4 from "../../assets/img/SliderImage4.jpg";

import "react-animated-slider/build/horizontal.css";

const HeroWrapper = styled.div`
  height: 87vh;
  /* width: 98.7vw; */
  position: relative;
  /* background: ${color.colorPrimary}; */
  /* background: crimson; url(${Background}); */
  overflow: hidden;
  color: ${color.colorWhite};
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
  width: 100%;
  height: 100vh;
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
    top: 23vh !important;
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
    font-size: 0.9rem;
  }

  @media only screen and (max-width: ${breakPoints.smaller}) {
    font-size: 0.8rem;
  }

  @media only screen and (max-width: ${breakPoints.smallest}) {
    padding: 0.5rem 0.8rem;
  }
`;

export default function Hero() {
  return (
    <Slider
      autoplay={3000}
      classNames={{
        nextButton: {
          color: "#fff"
        }
      }}
    >
      <div
        style={{
          background: `url('${sliderImage1}') no-repeat center center`,
          backgroundSize: "cover"
        }}
      >
        <div className="center">
          <h1>title</h1>
          <p>description</p>
          <button>button</button>
        </div>
      </div>
      <div
        style={{
          background: `url('${sliderImage2}') no-repeat center center`,
          backgroundSize: "cover"
        }}
      >
        <div className="center">
          <h1>title</h1>
          <p>description</p>
          <button>button</button>
        </div>
      </div>
      <div
        style={{
          background: `url('${sliderImage3}') no-repeat center center`,
          height: "100vh",
          backgroundSize: "cover"
        }}
      >
        <div className="center">
          <h1>title</h1>
          <p>description</p>
          <button>button</button>
        </div>
      </div>
    </Slider>
  );
}

// <HeroWrapper>
//   <div
//     id="carouselIndicators"
//     className="carousel slide"
//     data-ride="carousel"
//     data-interval="5000"
//     data-pause="false"
//   >
//     <ol className="carousel-indicators">
//       <li
//         data-target="#carouselIndicators"
//         data-slide-to="0"
//         className="active"
//       />
//       <li data-target="#carouselIndicators" data-slide-to="1" />
//       <li data-target="#carouselIndicators" data-slide-to="2" />
//       <li data-target="#carouselIndicators" data-slide-to="3" />
//       <li data-target="#carouselIndicators" data-slide-to="4" />
//     </ol>
//     <div className="carousel-inner">
//       <div className="carousel-item active">
//         <div style={{ position: "relative", height: "87vh" }}>
//           <img className="d-block" src={Background} alt="First slide" />
//           <SliderContent first>
//             <HeadingTwoFirst className="hero__title">
//               Play and Chop
//             </HeadingTwoFirst>
//             <ParagraphOne>
//               Play and win from collection of childhood games that live up
//               to the moment
//             </ParagraphOne>
//             <div className="hero__buttons mt-4 ml-lg-3 ml-md-3">
//               <Button className="mr-lg-4 mr-md-4 mr-sm-2">
//                 <span>Start Playing</span>
//               </Button>
//               <Button className="mr-lg-4 mr-md-4">
//                 <span>Get it on iOS</span>
//               </Button>
//               <Button className="mr-lg-4 mr-md-4 mt-md-2">
//                 <span>Get it on Android</span>
//               </Button>
//             </div>
//           </SliderContent>
//           <SliderImage className="d-block" src={slider1} alt="User" />
//         </div>
//       </div>
//       <div className="carousel-item">
//         <div
//           style={{
//             position: "relative",
//             height: "87vh"
//           }}
//         >
//           <Image
//             className="d-block"
//             src={sliderImage1}
//             alt="Second slide"
//           />
//           <SliderContent className="text-center">
//             {/* <HeadingTwo className="hero__title">
//               No Bank Account?
//             </HeadingTwo> */}
//             {/* <ParagraphOne>
//               No problem, we will send your money to your phone number, then
//               you can transfer to any account or withdraw from an ATM
//             </ParagraphOne> */}
//           </SliderContent>
//         </div>
//       </div>
//       <div className="carousel-item">
//         <div style={{ position: "relative", height: "87vh" }}>
//           <Image className="d-block" src={sliderImage2} alt="Third slide" />
//           <SliderContent className="text-center">
//             <HeadingTwo className="hero__title">
//               No be say come lick stew
//             </HeadingTwo>
//             <ParagraphOne>You go lick stew chop rice</ParagraphOne>
//           </SliderContent>
//         </div>
//       </div>
//       <div className="carousel-item">
//         <div style={{ position: "relative", height: "87vh" }}>
//           <Image className="d-block" src={sliderImage3} alt="Third slide" />
//           {/* <SliderContent className="text-center">
//             <HeadingTwo className="hero__title">
//               No be say come lick stew
//             </HeadingTwo>
//             <ParagraphOne>You go lick stew chop rice</ParagraphOne>
//           </SliderContent> */}
//         </div>
//       </div>
//       <div className="carousel-item">
//         <div
//           style={{
//             position: "relative",
//             height: "87vh",
//             background: `${sliderImage4}`
//           }}
//         >
//           <Image className="d-block" src={sliderImage4} alt="Third slide" />
//           {/* <SliderContent className="text-center">
//             <HeadingTwo className="hero__title">
//               No be say come lick stew
//             </HeadingTwo>
//             <ParagraphOne>You go lick stew chop rice</ParagraphOne>
//           </SliderContent> */}
//         </div>
//       </div>
//     </div>
//     <a
//       className="carousel-control-prev"
//       href="#carouselIndicators"
//       role="button"
//       data-slide="prev"
//     >
//       <span className="carousel-control-prev-icon" aria-hidden="true" />
//       <span className="sr-only">Previous</span>
//     </a>
//     <a
//       className="carousel-control-next"
//       href="#carouselIndicators"
//       role="button"
//       data-slide="next"
//     >
//       <span className="carousel-control-next-icon" aria-hidden="true" />
//       <span className="sr-only">Next</span>
//     </a>
//   </div>
// </HeroWrapper>
