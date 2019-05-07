import React from "react";
import { Helmet } from "react-helmet";
import UserHeader from "../shared/UserHeader/UserHeader";
import Footer from "../../UI/Footer/Footer";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import Overview from "./Overview/Overview";
import Voucher from "./Voucher/Voucher";
import TopEarners from "./TopEarners/TopEarners";
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
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Voucher />
          </div>
          <div className="col-md-6 mt-4">
            <TopEarners />
          </div>
        </div>
      </div>
      <QuickPlay />
      <Footer />
    </>
  );
}
