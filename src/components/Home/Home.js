import React from "react";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import HowItWorks from "../HowItWorks/HowItWorks";
import PlayAndChop from "../PlayAndChop/PlayAndChop";
import Testimonials from "../Testimonials/Testimonials";

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
      <p>Footer</p>
    </div>
  );
}
