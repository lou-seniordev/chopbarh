import React from "react";
import styled from "styled-components";

const NotFoundWrapper = styled.div`
  height: 100vh;
  background: pink;
`;

export default function NotFound() {
  return (
    <NotFoundWrapper>
      <h3>Ooop!</h3>
      <p>Page not found</p>
    </NotFoundWrapper>
  );
}
