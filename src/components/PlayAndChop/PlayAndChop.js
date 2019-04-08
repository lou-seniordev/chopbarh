import React from "react";
import styled from "styled-components";
import color from "../styles/colors";

const PlayAndChopWrapper = styled.div`
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

export default function PlayAndChop() {
  return (
    <PlayAndChopWrapper>
      <div className="container">
        <HeadingThree className="mb-5">Play and Chop!</HeadingThree>
      </div>
    </PlayAndChopWrapper>
  );
}
