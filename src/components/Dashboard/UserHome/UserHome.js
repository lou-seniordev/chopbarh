import React from "react";
import { Helmet } from "react-helmet";
import UserHeader from "../shared/UserHeader/UserHeader";
import Footer from "../../UI/Footer/Footer";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import Overview from "./Overview/Overview";
import Voucher from "./Voucher/Voucher";
import TopEarners from "./TopEarners/TopEarners";
import QuickPlayTransaction from "../UserTransaction/QuickPlayTransaction/QuickPlayTransaction";
import VoucherTransaction from "../UserTransaction/VoucherTransaction/VoucherTransaction";

// Add redirect logic to Complete Registration when it isn't complete

export default function UserHome() {
  return (
    <>
      <Helmet title={`Chopbarh \u{2192} Dashboard`} />
      <UserHeader />
      <UserNavigation />
      <div className="m-2">
        <Overview />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 p-0 d-sm-flex justify-content-sm-center">
            <Voucher center="true" />
          </div>
          <div className="col-lg-4 mt-4 mt-md-5 p-0">
            <VoucherTransaction />
          </div>
          <div className="col-lg-4 mt-4 p-0">
            <TopEarners />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <QuickPlayTransaction />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
