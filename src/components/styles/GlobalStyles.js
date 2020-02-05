import { createGlobalStyle } from "styled-components";
import color from "./colors";
import breakPoint from "./breakpoints";

export const GlobalStyles = createGlobalStyle`
  *, 
  *:after, 
  *:before {
    padding: 0;
    margin: 0;
    box-sizing:inherit;
  }

  *::selection {
    background: ${color.colorPrimaryHover}
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;

    /* // Adjust font sizes here */
    @media only screen and (max-width: ${breakPoint.largest}) {
      font-size: 58%;
    }

    @media only screen and (max-width: ${breakPoint.large}) {
      font-size: 55%;
    }

    @media only screen and (max-width: ${breakPoint.smallest}) {
      font-size: 54%;
    }
  }

  body {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2rem;
    color: #4c4c4c;
  }
`;
