import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import colors from "../../../styles/colors";
import Icon from "../Icon/Icon";

const HeaderWrapper = styled.div`
  background: #dfebdf;
  min-height: 6rem;
  padding: 0.4rem 2rem;
  position: relative;
  z-index: 300;
  text-align: left !important;

  a {
    font-size: 1.35rem;
  }
`;

const NavItem = styled.div``;

export default function UserNavigation() {
  return (
    <HeaderWrapper>
      <NavItem>
        <p>Item</p>
      </NavItem>
    </HeaderWrapper>
  );
}
