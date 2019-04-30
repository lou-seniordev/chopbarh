import React from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import UserHeader from "../shared/UserHeader/UserHeader";
import Footer from "../../UI/Footer/Footer";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import DepositTabs from "./DepositTabs/DepositTabs";

export default function UserDeposit() {
  const auth = localStorage.getItem("chopbarh-token");

  return (
    <>
      {!auth && <Redirect to="/" />}
      <Helmet>
        <title>Chopbarh &rarr; Dashboard</title>
      </Helmet>
      <UserHeader />
      <UserNavigation />
      <DepositTabs />
      <Footer />
    </>
  );
}
