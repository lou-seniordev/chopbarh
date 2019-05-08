import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import color from "../../../styles/colors";

const OverviewWrapper = styled.div`
  background: #c5c7c5;
  padding: 3rem 2rem;
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

class Overview extends Component {
  render() {
    return (
      <OverviewWrapper className="container">
        <>
          <HeadingFour className="mb-5">Overview</HeadingFour>
          <OverviewContainer className="row text-center">
            <OverviewContent className="col-lg-4">
              <OverviewContentHeader>
                {new Intl.NumberFormat().format(1000)}
              </OverviewContentHeader>
              <OverviewContentDescription>
                Coin Balance
              </OverviewContentDescription>
            </OverviewContent>
            <OverviewContent className="col-lg-4">
              <OverviewContentHeader>
                &#8358;
                {new Intl.NumberFormat().format(1000)}
              </OverviewContentHeader>
              <OverviewContentDescription>
                Cash Balance
              </OverviewContentDescription>
            </OverviewContent>
            <OverviewContent className="col-lg-4">
              <OverviewContentHeader>
                &#8358;
                {new Intl.NumberFormat().format(1000)}
              </OverviewContentHeader>
              <OverviewContentDescription>Earnings</OverviewContentDescription>
            </OverviewContent>
          </OverviewContainer>
        </>
      </OverviewWrapper>
    );
  }
}

const mapDispatchToProps = {};

export default connect(
  null,
  mapDispatchToProps
)(Overview);

/* <OverviewContainer className="row text-center">
              <div className="text-center mx-auto">
                <Spinner />
              </div>
            </OverviewContainer> */
