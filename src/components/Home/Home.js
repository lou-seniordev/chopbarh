import React from "react";
import Header from "../UI/Header/Header";
import Hero from "../Hero/Hero";
import HowItWorks from "../HowItWorks/HowItWorks";
import PlayAndChop from "./PlayAndChop/PlayAndChop";
import Testimonials from "./Testimonials/Testimonials";
import Games from "../Games/Games";
import Footer from "../UI/Footer/Footer";

/*

This is the Landing Page for the App. Our current approach merges components
into the same folder. We'll eventually move stuff around so it's easier to 
reason about in the end

*/

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <HowItWorks />
      <PlayAndChop />
      <Testimonials />
      <Games />
      <Footer />
    </div>
  );
}
