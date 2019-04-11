import React from "react";
import { Helmet } from "react-helmet";
import UserHeader from "../shared/UserHeader/UserHeader";
import Footer from "../../UI/Footer/Footer";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import QuickPlayTransaction from "./QuickPlayTransaction/QuickPlayTransaction";
import VoucherTransaction from "./VoucherTransaction/VoucherTransaction";

export default function UserTransaction() {
  return (
    <>
      <Helmet>
        <title>Chopbarh &rarr; Dashboard</title>
      </Helmet>
      <UserHeader />
      <UserNavigation />
      <div className="container">
        <div className="row">
          <div className="col-md-6 mr-5">
            <QuickPlayTransaction />
          </div>
          <div className="col-md-6">
            <VoucherTransaction />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
