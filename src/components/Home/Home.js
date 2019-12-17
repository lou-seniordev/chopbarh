import React from "react";
import { Helmet } from "react-helmet";
import MediaQuery from "react-responsive";
import Header from "../UI/Header/Header";
import Hero from "./Hero/Hero";
import HowItWorks from "./HowItWorks/HowItWorks";
// import PlayAndChop from "./PlayAndChop/PlayAndChop";
// import Testimonials from "./Testimonials/Testimonials";
import GameList from "./GameList/GameList";
import Footer from "../UI/Footer/Footer";

export default function Home() {
  return (
    <>
      <Helmet title={`Chopbarh \u{2192} Home`} />
      <Header />
      <Hero />
      <MediaQuery minDeviceWidth={425}>
        <HowItWorks />
        <GameList />
      </MediaQuery>
      <MediaQuery maxDeviceWidth={425}>
        <div>Hey there!!!</div>
      </MediaQuery>
      <Footer />
    </>
  );
}
