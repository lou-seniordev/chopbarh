import React from "react";
import { Helmet } from "react-helmet";
import Header from "../UI/Header/Header";
import Hero from "./Hero/Hero";
import HowItWorks from "./HowItWorks/HowItWorks";
import PlayAndChop from "./PlayAndChop/PlayAndChop";
import Testimonials from "./Testimonials/Testimonials";
import GameList from "./GameList/GameList";
import Footer from "../UI/Footer/Footer";

/*

This is the Landing Page for the App. Our current approach merges components
into the same folder. We'll eventually move stuff around so it's easier to 
reason about in the end

*/

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Chopbarh &rarr; Home</title>
      </Helmet>
      <Header />
      <Hero />
      <HowItWorks />
      <PlayAndChop />
      <Testimonials />
      <GameList />
      <Footer />
    </>
  );
}
