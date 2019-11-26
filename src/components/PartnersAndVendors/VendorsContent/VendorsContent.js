import React from "react";
import styled from "styled-components";
import { Container, Col, Row } from "reactstrap";
import color from "../../styles/colors";
import breakPoints from "../../styles/breakpoints";
import bg from "../../assets/img/page_background@2x.png";
import image from "../../assets/img/chopbarh_ad.png";

const VendorsContentWrapper = styled.div``;

const VendorsContentHeader = styled.div`
  background: ${color.colorPrimary} url(${bg});
  background-size: cover;
  background-repeat: no-repeat;
  height: 20vh;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 15rem 0;

  @media only screen and (max-width: ${breakPoints.medium}) {
    padding: 8rem 0;
  }

  h3 {
    font-size: 5rem;
    line-height: 0.9;
    text-transform: uppercase;
    margin-bottom: 0.8rem;

    @media only screen and (max-width: ${breakPoints.medium}) {
      font-size: 3rem;
    }

    @media only screen and (max-width: ${breakPoints.small}) {
      font-size: 2.5rem;
    }

    @media only screen and (max-width: ${breakPoints.smaller}) {
      font-size: 2rem;
    }
  }

  span {
    width: 45%;
    font-size: 1.5rem;

    @media only screen and (max-width: ${breakPoints.medium}) {
      width: 60%;
      font-size: 1.2rem;
    }

    @media only screen and (max-width: ${breakPoints.small}) {
      width: 70%;
    }

    @media only screen and (max-width: ${breakPoints.smaller}) {
      width: 90%;
      font-size: 1rem;
    }
  }
`;

const VendorsContentSection = styled.div`
  min-height: 20vh;
  margin: 5rem 0;

  @media only screen and (max-width: ${breakPoints.medium}) {
    text-align: center;
  }

  div {
    @media only screen and (max-width: ${breakPoints.medium}) {
      margin-bottom: 1.3rem;
    }
  }

  h4 {
    font-size: 2rem;

    @media only screen and (max-width: ${breakPoints.small}) {
      font-size: 1.8rem;
    }
  }

  p {
    margin: 0;
    font-size: 1.4rem;

    @media only screen and (max-width: ${breakPoints.small}) {
      font-size: 1.2rem;
      margin: 0 2.5rem;
    }
  }
`;

const VendorsContentCaption = styled.div`
  @media only screen and (max-width: ${breakPoints.medium}) {
    text-align: center;
  }

  img {
    width: 120%;
    margin-left: -40px;

    @media only screen and (max-width: ${breakPoints.medium}) {
      width: 80%;
      margin-left: -20px;
    }

    @media only screen and (max-width: ${breakPoints.small}) {
      width: 60%;
      margin-left: 0px;
    }
  }

  p {
    padding-top: 3rem;
    font-size: 1.4rem;

    @media only screen and (max-width: ${breakPoints.small}) {
      font-size: 1.2rem;
      margin: 0 2.5rem;
      margin-bottom: 2rem;
    }
  }
`;

export default function VendorsContent() {
  return (
    <VendorsContentWrapper>
      <VendorsContentHeader>
        <h3>
          Become a <br /> Voucher Reseller
        </h3>
        <span>
          Make over 50k profit everyday being a ChopBarh Super agent. <br />
          To become a Super Agent please visit any of our Authorized Centers
          near you to for requirements and onboarding. Or call 07063741315 for
          information
        </span>
      </VendorsContentHeader>
      <VendorsContentSection>
        <Container>
          <Row>
            <div className="col-md-6">
              <h4>What a Super Agent Does</h4>
              <p>Open a ChopBarh center</p>
              <p>Install the Chopbarh App for users</p>
              <p>Facilitate ChopBarh games</p>
              <p>Make money on every game played</p>
              <p>Make additional money on every win</p>
              <p>Make money cashing out for customers</p>
              <p>
                Open other sub-agents and make money from all their transactions
              </p>
            </div>
            <div className="col-md-6">
              <h4>Minimum Requirements for a Chopbarh Super Agent</h4>
              <p>Location/Shop: Get a shop space</p>
              <p>
                Equipments: Minimum of 2 Smartphones(Android or iPhone), 2 TVs,
                1 Generator set and good internet
              </p>
              <p>
                Branding: Location/Shop should be painted in Chopbarh colors
              </p>
            </div>
          </Row>
        </Container>
      </VendorsContentSection>
      <VendorsContentSection>
        <Container>
          <Row>
            <div className="col-md-4">
              <h4>Lagos (Surulere)</h4>
              <p>31 Adelabu street </p>
              <p>Surulere</p>
              <p>Lagos</p>
              <p>Tel: 08142827759</p>
            </div>
            <div className="col-md-4">
              <h4>Abuja</h4>
              <p>
                Suite D shop 4 Sabondale Shopping Complex Plot 526 Obafemi
                Awolowo Way, (behind Southern Fried Chicken) Jabi District,
                Abuja.
              </p>
              <p>Tel: 08166937015</p>
            </div>
            <div className="col-md-4">
              <h4>Port Harcourt</h4>
              <p>Rafco Plaza Ada George Road</p>
              <p>Port Harcourt</p>
              <p>Rivers state</p>
              <p>Tel: 08134883256</p>
            </div>
          </Row>
        </Container>
      </VendorsContentSection>
      <VendorsContentCaption>
        <Container>
          <Row>
            <div className="col-md-4">
              <img src={image} alt="Chopbarh Vendor" />
            </div>
            <div className="col-md-4">
              <p>
                For Corporate inquiries and Partnerships please contact us at
                08071721925 for availability and requirements
              </p>
            </div>
          </Row>
        </Container>
      </VendorsContentCaption>
    </VendorsContentWrapper>
  );
}
