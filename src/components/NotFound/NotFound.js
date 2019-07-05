import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import breakpoint from "../styles/breakpoints";
import color from "../styles/colors";

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

  a {
    margin: 2rem auto;
    display: block;
    background: ${color.colorPrimary};
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;
    width: 13rem;
    padding: 0.5rem;
    transition: all 0.3s;

    &:hover {
      background: ${color.colorPrimaryHover};
      transform: translateY(-3px);
    }
  }
`;

export default function NotFound() {
  return (
    <NotFoundWrapper>
      <div>
        <h3>Ooops!</h3>
        <p>Page not found</p>
        <Link to="/">Go to Homepage</Link>
      </div>
    </NotFoundWrapper>
  );
}
