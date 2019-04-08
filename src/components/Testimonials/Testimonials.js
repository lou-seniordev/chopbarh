import React from "react";
import styled from "styled-components";
import color from "../styles/colors";
import breakPoints from "../styles/breakpoints";

const TestimonialsWrapper = styled.div`
  text-align: center;
  padding: 2rem;
  margin-top: 5rem;
`;

/* 

This styles should be moved to a separate file altogether

*/

const ContentBlock = styled.div`
  max-width: 32rem;
  min-height: 22rem;
  background: #aca3a3;
  transform: skew(-8deg);
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${color.colorPrimary};
  color: ${color.colorWhite};

  @media only screen and (max-width: ${breakPoints.mediumLite}) {
    margin: 0 auto;
  }

  & > * {
    transform: skew(8deg);
  }
`;

const HeadingThree = styled.h3`
  font-size: 3rem;
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;
  color: ${color.colorPrimary};
`;

export default function Testimonials() {
  return (
    <TestimonialsWrapper>
      <div className="container">
        <HeadingThree className="mb-5">Testimonials</HeadingThree>
        <div className="row mb-5">
          <div className="col-md-4 mb-2">
            <ContentBlock>
              <div>
                <h4 className="text-uppercase">Judith Bello</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Alias soluta recusandae cupiditate similique modi accusantium
                  deserunt quos, sapiente laudantium sunt, expedita porro magni
                  hic, rerum ullam consequatur voluptatibus et quisquam!
                </p>
              </div>
            </ContentBlock>
          </div>
          <div className="col-md-4 mb-2">
            <ContentBlock>
              <div>
                <h4 className="text-uppercase">Fellow Man</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                  accusamus fugiat magnam voluptatem quia, reprehenderit nam,
                  saepe qui aliquam voluptatum expedita aspernatur nostrum.
                  Harum, culpa dolores commodi voluptate cum sunt.
                </p>
              </div>
            </ContentBlock>
          </div>
          <div className="col-md-4 mb-2">
            <ContentBlock>
              <div>
                <h4 className="text-uppercase">Shaun Lee</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolorum numquam aspernatur dicta nemo unde maiores molestias
                  impedit quasi quae, ullam dolore amet deleniti doloribus
                  ratione, quidem eligendi at eaque officiis
                </p>
              </div>
            </ContentBlock>
          </div>
        </div>
      </div>
    </TestimonialsWrapper>
  );
}
