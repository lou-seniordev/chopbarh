import React from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import Colors from "../../styles/colors";
import AppStore from "../../assets/img/AppStore.png";
import PlayStore from "../../assets/img/PlayStore@2x.png";
import AndroidInstructions from "../../assets/img/AndroidInstructions@2x.png";
import Logo from "../AlternateLogo/AlternateLogo";

const UpdateApplicationWrapper = styled.div`
  height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    color: ${Colors.colorPrimary};
    transform: skewX(-15deg);
    font-weight: bold;
    font-size: 2.8rem;
    text-transform: uppercase;
    margin: 1.5rem 0;
  }

  h3 {
    color: ${Colors.colorPrimary};
    transform: skewX(-15deg);
    font-weight: bold;
    font-size: 2.2rem;
    text-transform: uppercase;
    margin: 1.5rem 0;
  }
`;

const Image = styled.img`
  height: 8rem;
  width: 24rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

function UpdateApplication() {
  return (
    <>
      {/* <Helmet title={`Chopbarh \u{2192} Update`} /> */}
      <UpdateApplicationWrapper>
        <MediaQuery minDeviceWidth={767}>
          <div>
            <Logo />
            <h2>CHOPBARH UPDATE</h2>
            <h3>Select your phone to download your update</h3>
            <p>
              <a href="https://apps.apple.com/us/app/chopbarh/id1463959707?ls=1">
                <Image src={AppStore} alt="App Store" />
              </a>
            </p>
            <p>
              <a href="https://chopbarh.live/download">
                <Image src={PlayStore} alt="Play Store" />
              </a>
            </p>
            <p>
              <a href="https://www.youtube.com/watch?v=5ESVBaQcoRA&feature=youtu.be">
                <Image
                  className="mt-4"
                  src={AndroidInstructions}
                  alt="Android Instructions"
                />
              </a>
            </p>
            {/* <p
            className="nav-item mt-4"
            style={{
              color: "#fff",
              textTransform: "uppercase",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Contact Us: 0903-662-3253
          </p> */}
          </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={767}>
          <div>
            <Logo />
            <h2>CHOPBARH UPDATE</h2>
            <h3>Select your phone to download your update</h3>
            <p>
              <a href="https://apps.apple.com/us/app/chopbarh/id1463959707?ls=1">
                <Image src={AppStore} alt="App Store" />
              </a>
            </p>
            <p>
              <a href="https://chopbarh.live/download">
                <Image src={PlayStore} alt="Play Store" />
              </a>
            </p>
            <p>
              <a href="https://www.youtube.com/watch?v=5ESVBaQcoRA&feature=youtu.be">
                <Image
                  className="mt-4"
                  src={AndroidInstructions}
                  alt="Android Instructions"
                />
              </a>
            </p>
            <h2>Download now and get &#8358;100 free</h2>
            {/* <p
            className="nav-item mt-4"
            style={{
              color: "#fff",
              textTransform: "uppercase",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Contact Us: 0903-662-3253
          </p> */}
          </div>
        </MediaQuery>
      </UpdateApplicationWrapper>
    </>
  );
}

export default UpdateApplication;
