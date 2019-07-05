import React from "react";
import styled from "styled-components";
import breakpoint from "../styles/breakpoints";

const NotFoundWrapper = styled.div`
  height: 100vh;
  text-align: center;
  padding: 50vh 0;
  position: relative;

  h3 {
    text-transform: uppercase;
    font-weight: 300;
    font-size: 6rem;

    @media screen and (max-width: ${breakpoint.medium}) {
      font-size: 5.5rem;
    }
  }

  p {
    background: #fff;
    padding: 0.5rem;
    display: inline-block;
    position: absolute;
    font-size: 1.8rem;
    top: 60vh;
    transform: translate(-50%, -50%);

    @media screen and (max-width: ${breakpoint.medium}) {
      top: 62vh;
      font-size: 1.5rem;
    }
  }
`;

export default function NotFound() {
  return (
    <NotFoundWrapper>
      <div>
        <h3>Ooops!</h3>
        <p>Page not found</p>
      </div>
    </NotFoundWrapper>
  );
}
