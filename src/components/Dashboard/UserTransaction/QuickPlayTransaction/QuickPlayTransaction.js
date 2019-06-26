import React from "react";
import styled from "styled-components";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";
import Image1 from "../../../assets/img/ChopBarhPairs6.png";
import Image2 from "../../../assets/img/ChopBarhPairs2.png";

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

const GameItemsWrapper = styled.div`
  margin-top: 7rem;
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
      <div
        id="carouselIndicators"
        className="carousel slide"
        data-ride="carousel"
        data-interval="5000"
        data-pause="false"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselIndicators"
            data-slide-to="0"
            className="active"
          />
          <li data-target="#carouselIndicators" data-slide-to="1" />
          <li data-target="#carouselIndicators" data-slide-to="2" />
          <li data-target="#carouselIndicators" data-slide-to="3" />
          <li data-target="#carouselIndicators" data-slide-to="4" />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div
              style={{
                position: "relative",
                height: "87vh"
              }}
            >
              <SliderContent className="text-center">
                <Image className="d-block" src={Image1} alt="Second slide" />
                <HeadingTwo className="hero__title">
                  No Bank Account?
                </HeadingTwo>
                <ParagraphOne>
                  No problem, we will send your money to your phone number, then
                  you can transfer to any account or withdraw from an ATM
                </ParagraphOne>
              </SliderContent>
            </div>
          </div>
          <div className="carousel-item">
            <div style={{ position: "relative", height: "87vh" }}>
              <Image className="d-block" src={Image2} alt="Third slide" />
              <SliderContent className="text-center">
                <HeadingTwo className="hero__title">
                  No be say come lick stew
                </HeadingTwo>
                <ParagraphOne>You go lick stew chop rice</ParagraphOne>
              </SliderContent>
            </div>
          </div>
          <div className="carousel-item">
            <div style={{ position: "relative", height: "87vh" }}>
              <Image className="d-block" src={Image1} alt="Third slide" />
              {/* <SliderContent className="text-center">
            <HeadingTwo className="hero__title">
              No be say come lick stew
            </HeadingTwo>
            <ParagraphOne>You go lick stew chop rice</ParagraphOne>
          </SliderContent> */}
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
      {/* <div className="row">
      
          <Column>
            <Content>
              <Image alt="Ludo" className="mr-lg-5 mr-md-3" src={Image1} />
              <div>
                <HeadingThree className="mt-4 mb-3">Table Soccer</HeadingThree>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                  mollitia fugiat veritatis omnis, iste, itaque cupiditate
                  facilis reiciendis ex repellat accusamus sint, nostrum non
                  blanditiis at pariatur distinctio beatae magni.
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
                  mollitia fugiat veritatis omnis, iste, itaque cupiditate
                  facilis reiciendis ex repellat accusamus sint, nostrum non
                  blanditiis at pariatur distinctio beatae magni.
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
