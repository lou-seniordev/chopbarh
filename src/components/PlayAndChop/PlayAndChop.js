import React from "react";
import styled from "styled-components";
import color from "../styles/colors";

const PlayAndChopWrapper = styled.div`
  text-align: center;
  margin-top: 5rem;
`;

const HeadingThree = styled.h3`
  font-size: 3rem;
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;
  color: ${color.colorPrimary};
`;

/* 

Swap this out for dynamically imported component in styles

*/
const ParagraphOne = styled.p`
  width: 75%;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0 auto;
`;

const Button = styled.button`
  all: unset;
  color: ${color.colorWhite};
  background: ${color.colorPrimary};
  padding: 1rem 1.5rem;
  font-size: 1.3rem;
  font-weight: 600;
  transform: skew(-20deg);
  display: inline-block;
  transition: all 0.2s;

  span {
    display: inline-block;
    transform: skew(20deg);
  }

  &:hover {
    transform: translateY(-3px) skew(-20deg);
    color: ${color.colorWhite};
    background: ${color.colorPrimaryHover};
  }
`;

export default function PlayAndChop() {
  return (
    <PlayAndChopWrapper>
      <div className="container">
        <HeadingThree className="mb-5">Play and Chop!</HeadingThree>
        <ParagraphOne>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          praesentium placeat dolorum doloribus alias temporibus autem aliquam
          fuga aperiam odit! Sequi, modi. Possimus culpa dolorem eum fugiat
          explicabo a quos! Sit quia repudiandae provident maxime et, autem
          totam tempora, obcaecati illo corporis vitae error perferendis sequi.
          Asperiores est voluptatem repudiandae molestias modi.
        </ParagraphOne>
        <Button className="mt-3">
          <span>Explore</span>
        </Button>
      </div>
    </PlayAndChopWrapper>
  );
}
