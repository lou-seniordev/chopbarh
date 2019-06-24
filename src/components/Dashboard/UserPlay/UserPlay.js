import React from "react";
import { Helmet } from "react-helmet";
import UserHeader from "../shared/UserHeader/UserHeader";
import Footer from "../../UI/Footer/Footer";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import GameItems from "./GameItems/GameItems";

export default function UserPlay() {
  return (
    <>
      <Helmet title={`Chopbarh \u{2192} Play`} />
      <UserHeader />
      <UserNavigation />
      <GameItems />
      <Footer />
    </>
  );
}
