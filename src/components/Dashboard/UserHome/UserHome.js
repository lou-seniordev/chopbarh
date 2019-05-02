import React from "react";
import { Helmet } from "react-helmet";
import UserHeader from "../shared/UserHeader/UserHeader";
import Footer from "../../UI/Footer/Footer";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import Overview from "./Overview/Overview";
import Voucher from "./Voucher/Voucher";
import QuickPlay from "./QuickPlay/QuickPlay";

// Add redirect logic to Complete Registration when it isn't complete

export default function UserHome() {
  return (
    <>
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
