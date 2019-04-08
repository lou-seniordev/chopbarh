import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";
import Home from "../components/Home/Home";
import color from "../components/styles/colors";

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
      <>
        <GlobalStyles />
        <Home />
      </>
    );
  }
}
