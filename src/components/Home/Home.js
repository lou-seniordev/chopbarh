import React from "react";
import styled from "styled-components";
import Header from "../UI/Header/Header";
import Hero from "./Hero/Hero";
import HowItWorks from "./HowItWorks/HowItWorks";
import PlayAndChop from "./PlayAndChop/PlayAndChop";
import Testimonials from "./Testimonials/Testimonials";
import GameList from "./GameList/GameList";
import Footer from "../UI/Footer/Footer";
import Background from "../assets/svg/WavyBackground.svg";

const BackgroundImage = styled.div`
  background: url(${Background});
  height: auto;
  max-width: 99.2vw;
  margin-top: -7rem;
  padding-top: 9rem;
`;

/*

This is the Landing Page for the App. Our current approach merges components
into the same folder. We'll eventually move stuff around so it's easier to 
reason about in the end

*/

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <BackgroundImage>
        <HowItWorks />
        <PlayAndChop />
        <Testimonials />
        <GameList />
      </BackgroundImage>
      <Footer />
    </>
  );
}
