import React from "react";
import { Helmet } from "react-helmet";
import Header from "../UI/Header/Header";
import Footer from "../UI/Footer/Footer";
import GamesHero from "./GamesHero/GamesHero";
// import GameItems from "./GameItems/GameItems";
import QuickPlayTransaction from "../Dashboard/UserTransaction/QuickPlayTransaction/QuickPlayTransaction";

export default function Games() {
  return (
    <>
      <Helmet title={`Chopbarh \u{2192} Games`} />
      <Header />
      <GamesHero />
      <div className="container" style={{ minHeight: "70vh" }}>
        <div className="row">
          <div className="col-md-12">
            <QuickPlayTransaction noHeader />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
