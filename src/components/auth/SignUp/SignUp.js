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

  img {
    width: 35%;
    margin: 1rem;
    transition: all 0.2s;

    &:hover {
      transform: translateY(-3px);
    }

    @media only screen and (max-width: ${breakPoints.medium}) {
      width: 60%;
    }

    @media only screen and (max-width: ${breakPoints.small}) {
      width: 70%;
    }

    @media only screen and (max-width: ${breakPoints.smaller}) {
      width: 90%;
    }

    @media only screen and (max-width: ${breakPoints.smallest}) {
      width: 100%;
    }
  }

  a {
    cursor: pointer;
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
                <img src={AppStore} alt="App Store" />
              </a>
            </p>
            <p>
              {/* <a href="https://drive.google.com/file/d/19ctMI6XBlFfrddM0Bq_cHAiDPfYfzYRW/view">
                <img src={PlayStore} alt="Play Store" />
              </a> */}
              <a href="https://bit.ly/3dqpelK">
                <img src={PlayStore} alt="Play Store" />
              </a>
            </p>
          </div>
        </SignUpWrapper>
      </>
    );
  }
}

export default memo(SignUp);
