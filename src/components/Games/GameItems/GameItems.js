import React from "react";
import styled from "styled-components";
import Ludo from "../../assets/img/Ludo@2x.png";

const GameItemsWrapper = styled.div`
  margin-top: 5rem;
`;

export default function GameItems() {
  return (
    <GameItemsWrapper>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img alt="Ludo" src={Ludo} />
          </div>
          <div className="col-md-6">TABLE SOCCER</div>
        </div>
      </div>
    </GameItemsWrapper>
  );
}
