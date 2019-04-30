import React from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import UserHeader from "../shared/UserHeader/UserHeader";
import Footer from "../../UI/Footer/Footer";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import Overview from "./Overview/Overview";
import Voucher from "./Voucher/Voucher";
import QuickPlay from "./QuickPlay/QuickPlay";

export default function UserHome() {
  const auth = localStorage.getItem("chopbarh-token");

  return (
    <>
      {!auth && <Redirect to="/" />}
      <Helmet>
        <title>Chopbarh &rarr; Dashboard</title>
      </Helmet>
      <UserHeader />
      <UserNavigation />
      <Overview />
      <Voucher />
      <QuickPlay />
      <Footer />
    </>
  );
}
