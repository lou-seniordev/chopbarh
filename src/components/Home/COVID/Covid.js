import React from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import color from "../../styles/colors";

const CovidWrapper = styled.div`
  text-align: center;
  margin-top: 5rem;
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
        <HeadingThree className="mb-5">
          Covid-19 Funds Instructions
        </HeadingThree>
        <div className=" mb-5">
          <MediaQuery minDeviceWidth={426}>
            <iframe
              title="Covid-19 Instructions"
              width="400"
              height="315"
              src="https://www.youtube.com/embed/o9xizsDRerw"
            ></iframe>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={425}>
            <iframe
              title="Covid-19 Instructions"
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
