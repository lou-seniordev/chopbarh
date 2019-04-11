import React from "react";
import { Helmet } from "react-helmet";
import Header from "../UI/Header/Header";
import Footer from "../UI/Footer/Footer";
import GamesHero from "./GamesHero/GamesHero";
import GameItems from "./GameItems/GameItems";

export default function Games() {
  return (
    <>
      <Helmet>
        <title>Chopbarh &rarr; Games</title>
      </Helmet>
      <Header />
      <GamesHero />
      <GameItems />
      <Footer />
    </>
  );
}
