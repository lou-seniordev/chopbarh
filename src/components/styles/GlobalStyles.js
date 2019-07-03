import { createGlobalStyle } from "styled-components";
import color from "./colors";

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
  }

  body {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2rem;
    color: #4c4c4c;
  }
`;
