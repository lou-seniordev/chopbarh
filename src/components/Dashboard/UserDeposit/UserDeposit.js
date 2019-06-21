import React from "react";
import { Helmet } from "react-helmet";
import UserHeader from "../shared/UserHeader/UserHeader";
import Footer from "../../UI/Footer/Footer";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import DepositTabs from "./DepositTabs/DepositTabs";

export default function UserDeposit() {
  return (
    <>
      {/* <Helmet title={`Chopbarh \u{2192} Deposit`} /> */}
      <UserHeader />
      <UserNavigation />
      <DepositTabs />
      <Footer />
    </>
  );
}
