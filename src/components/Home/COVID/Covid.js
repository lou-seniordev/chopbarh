import React from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import color from "../../styles/colors";
import breakPoints from "../../styles/breakpoints";

const CovidWrapper = styled.div`
  text-align: center;
  margin-top: 5rem;
`;

const ContentBlock = styled.div`
  max-width: 32rem;
  min-height: 22rem;
  background: #aca3a3;
  transform: skew(-8deg);
  padding: 1rem;
  display: flex;
  background: ${color.colorPrimary};
  justify-content: center;
  align-items: center;
  color: ${color.colorWhite};

  @media only screen and (max-width: ${breakPoints.mediumLite}) {
    margin: 0 auto;
  }

  & > * {
    transform: skew(8deg);
  }
`;

const HeadingThree = styled.h3`
  font-size: 3rem;
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;
  color: ${color.colorPrimary};
`;

/* 

This component has Box Shadow added in the UI

*/

export default function Covid() {
  return (
    <CovidWrapper>
      <div className="container">
        <HeadingThree className="mb-5">Covid-19 Instructions</HeadingThree>
        <div className=" mb-5">
          <MediaQuery minDeviceWidth={426}>
            <iframe
              width="400"
              height="315"
              src="https://www.youtube.com/embed/o9xizsDRerw"
            ></iframe>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={425}>
            <iframe
              width="220"
              height="215"
              src="https://www.youtube.com/embed/o9xizsDRerw"
            ></iframe>
          </MediaQuery>
        </div>
      </div>
    </CovidWrapper>
  );
}
