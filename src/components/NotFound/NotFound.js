import React, { Component } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
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
    font-size: 7rem;

    @media screen and (max-width: ${breakpoint.medium}) {
      font-size: 5.5rem;
    }
  }

  span {
    background: #fff;
    padding: -3.5rem;
    font-size: 1.8rem;
  }

  a {
    margin: 1rem auto;
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

class NotFound extends Component {
  goBack = () => {
    this.props.history.push("/");
    window.location.reload();
  };

  render() {
    return (
      <NotFoundWrapper>
        <div>
          <h3>
            Ooops! <br />
            <span>Page was not found!</span>
          </h3>
          <Link to="/" onClick={this.goBack}>
            Home
          </Link>
        </div>
      </NotFoundWrapper>
    );
  }
}

export default withRouter(NotFound);
