import React from "react";
import Header from "../UI/Header/Header";
import Footer from "../UI/Footer/Footer";
import GamesHero from "./GamesHero/GamesHero";
import GameItems from "./GameItems/GameItems";

export default function Games() {
  return (
    <>
      <Header transparent />
      <GamesHero />
      <GameItems />
      <Footer />
    </>
  );
}
