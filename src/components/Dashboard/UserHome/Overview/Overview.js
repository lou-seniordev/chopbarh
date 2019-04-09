import React from "react";
import styled from "styled-components";

const OverviewWrapper = styled.div`
  background: #c5c7c5;
  padding: 2rem;
`;

const HeadingFour = styled.h4``;

export default function Overview() {
  return (
    <OverviewWrapper>
      <HeadingFour>Overview</HeadingFour>
    </OverviewWrapper>
  );
}
