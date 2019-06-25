import React from "react";
import styled from "styled-components";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";
import Image1 from "../../../assets/img/ChopBarhPairs6.png";
import Image2 from "../../../assets/img/ChopBarhPairs2.png";

const GameItemsWrapper = styled.div`
  margin-top: 7rem;
`;

const Image = styled.img`
  height: 20rem;
`;

const HeadingTwo = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  color: #4c4c4c;
  margin-left: -15px;

  @media only screen and (max-width: ${breakPoints.medium}) {
    text-align: center;
  }
`;

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

const Button = styled.button`
  all: unset;
  border: 3px solid ${color.colorWhite};
  padding: 1rem 1.3rem;
  font-size: 1.2rem;
  font-weight: 600;
  transform: skew(-20deg);
  display: inline-block;
  transition: all 0.2s;
  color: #4c4c4c;

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

export default function QuickPlayTransaction() {
  const settings = {
    dots: true,
    speed: 500
  };

  return (
    <GameItemsWrapper>
      <HeadingTwo className="mt-4 mb-5">Quick Play</HeadingTwo>
      <div className="row">
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
      </div>
    </GameItemsWrapper>
  );
}
