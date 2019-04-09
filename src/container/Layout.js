import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";
import ErrorBoundary from "../hoc/ErrorBoundary";
import color from "../components/styles/colors";
//import Home from "../components/Home/Home";
import Games from "../components/Games/Games";

/*

To prevent this component from bloat, consider moving the
globalStyles to a different component. Also, move the 
components that render Pages to the Pages folder

*/

const GlobalStyles = createGlobalStyle`
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
  }

  body {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2rem;
  }
`;

export default class Layout extends Component {
  render() {
    return (
      <ErrorBoundary>
        <GlobalStyles />
        <Games />
        {/* <Home /> */}
      </ErrorBoundary>
    );
  }
}
