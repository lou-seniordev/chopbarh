import React from "react";
import styled from "styled-components";
import color from "../../../styles/colors";

const OverviewWrapper = styled.div`
  background: #c5c7c5;
  padding: 3rem 2rem;
  width: 81vw;
  border-radius: 5px;
  margin: 4rem auto;
`;

const OverviewContainer = styled.div``;

const OverviewContent = styled.div`
  cursor: pointer;
`;

const OverviewContentHeader = styled.h3`
  font-weight: 600;
  font-size: 3.5rem;
  color: #444;

  ${OverviewContent}:hover & {
    color: ${color.colorPrimary};
  }
`;

const HeadingFour = styled.h4``;

const OverviewContentDescription = styled.p`
  font-size: 1.5rem;

  ${OverviewContent}:hover & {
    color: ${color.colorPrimary};
  }
`;

export default function Overview() {
  return (
    <OverviewWrapper>
      <HeadingFour className="mb-5">Overview</HeadingFour>
      <OverviewContainer className="row text-center">
        <OverviewContent className="col-lg-4">
          <OverviewContentHeader>167</OverviewContentHeader>
          <OverviewContentDescription>Coin Balance</OverviewContentDescription>
        </OverviewContent>
        <OverviewContent className="col-lg-4">
          <OverviewContentHeader>&#8358;43,590.55</OverviewContentHeader>
          <OverviewContentDescription>Cash Balance</OverviewContentDescription>
        </OverviewContent>
        <OverviewContent className="col-lg-4">
          <OverviewContentHeader>&#8358;43,590.55</OverviewContentHeader>
          <OverviewContentDescription>Earnings</OverviewContentDescription>
        </OverviewContent>
      </OverviewContainer>
    </OverviewWrapper>
  );
}
