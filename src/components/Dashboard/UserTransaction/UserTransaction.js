import React from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import UserHeader from "../shared/UserHeader/UserHeader";
import Footer from "../../UI/Footer/Footer";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import QuickPlayTransaction from "./QuickPlayTransaction/QuickPlayTransaction";
import VoucherTransaction from "./VoucherTransaction/VoucherTransaction";
import TransactionTabs from "./TransactionTabs/TransactionTabs";

export default function UserTransaction() {
  const auth = localStorage.getItem("chopbarh-token");

  return (
    <>
      {!auth && <Redirect to="/" />}
      <Helmet>
        <title>Chopbarh &rarr; Dashboard</title>
      </Helmet>
      <UserHeader />
      <UserNavigation />
      <TransactionTabs />
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <QuickPlayTransaction />
          </div>
          <div className="col-lg-6">
            <VoucherTransaction />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
