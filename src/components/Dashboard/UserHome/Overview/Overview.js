import React, { Component, memo } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import color from "../../../styles/colors";

const OverviewWrapper = styled.div`
  background: #8c1936;
  color: #ddd;
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
  color: #fff;

  /* ${OverviewContent}:hover & {
    color: ${color.colorPrimary};
  } */
`;

const HeadingFour = styled.h4``;

const OverviewContentDescription = styled.p`
  font-size: 1.5rem;

  ${OverviewContent}:hover & {
    color: ${color.colorWhite};
  }
`;

class Overview extends Component {
  render() {
    return (
      <OverviewWrapper className="container">
        {this.props.playerData ? (
          <>
            <HeadingFour className="mb-5">Overview</HeadingFour>
            <OverviewContainer className="row text-center">
              <OverviewContent className="col-lg-4">
                <OverviewContentHeader>
                  {new Intl.NumberFormat().format(
                    this.props.playerData.CBCoins
                  )}
                </OverviewContentHeader>
                <OverviewContentDescription>
                  Coin Balance
                </OverviewContentDescription>
              </OverviewContent>
              <OverviewContent className="col-lg-4">
                <OverviewContentHeader>
                  &#8358;
                  {new Intl.NumberFormat().format(
                    this.props.playerData.RealCoins
                  )}
                </OverviewContentHeader>
                <OverviewContentDescription>
                  Cash Balance
                </OverviewContentDescription>
              </OverviewContent>
              <OverviewContent className="col-lg-4">
                <OverviewContentHeader>
                  &#8358;
                  {new Intl.NumberFormat().format(
                    this.props.playerData.TotalWinning
                  )}
                </OverviewContentHeader>
                <OverviewContentDescription>
                  Earnings
                </OverviewContentDescription>
              </OverviewContent>
            </OverviewContainer>
          </>
        ) : (
          <>
            {!this.props.error ? (
              <OverviewContainer className="row text-center">
                <div className="text-center mx-auto">
                  <Spinner />
                </div>
              </OverviewContainer>
            ) : (
              <OverviewContainer className="row text-center">
                <div className="text-center mx-auto">
                  <p>DATA NOT AVAILABLE</p>
                </div>
              </OverviewContainer>
            )}
          </>
        )}
      </OverviewWrapper>
    );
  }
}

const mapStateToProps = state => ({
  playerData: state.player.playerData,
  error: state.player.error
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(Overview));
