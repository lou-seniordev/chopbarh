import React, { Component, memo } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Header from "../../UI/Header/Header";
import breakPoints from "../../styles/breakpoints";
import AppStore from "../../assets/img/AppStore.png";
import PlayStore from "../../assets/img/PlayStore@2x.png";
// import { SignUpWrapper } from "../../styles/SignUpStyles";

const SignUpWrapper = styled.div`
  height: 100vh;
  position: relative;

  div {
    min-height: 20vh;
    position: absolute;
    top: 43%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  a {
    cursor: pointer;
  }
`;

const Image = styled.img`
  width: 27rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-3px);
  }

  @media only screen and (max-width: ${breakPoints.smaller}) {
    width: 18rem;
  }
`;

const AppleStoreImage = styled(Image)`
  width: 24rem;

  @media only screen and (max-width: ${breakPoints.smaller}) {
    width: 15.6rem;
  }
`;

class SignUp extends Component {
  render() {
    return (
      <>
        <Helmet title={`Chopbarh \u{2192} Sign Up`} />
        <Header />
        <SignUpWrapper>
          <div>
            <p>
              <a href="https://apps.apple.com/us/app/chopbarh/id1463959707?ls=1">
                <AppleStoreImage src={AppStore} alt="App Store" />
              </a>
            </p>
            <p>
              <a href="https://chopbarh.live/download">
                <Image src={PlayStore} alt="Play Store" />
              </a>
            </p>
          </div>
        </SignUpWrapper>
      </>
    );
  }
}

export default memo(SignUp);
