import React from "react";
import { Helmet } from "react-helmet";
// import MediaQuery from "react-responsive";
import UserHeader from "../shared/UserHeader/UserHeader";
import Footer from "../../UI/Footer/Footer";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
// import DepositTabs from "./DepositTabs/DepositTabs";
import DepositSmallScreens from "./DepositSmallScreens/DepositSmallScreens";

export default function UserDeposit() {
  return (
    <>
      <Helmet title={`Chopbarh \u{2192} Deposit`} />
      <UserHeader />
      <UserNavigation />
      <div style={{ minHeight: "80vh" }}>
        {/* <MediaQuery minDeviceWidth={767}>
          <DepositTabs />
        </MediaQuery> */}
        <DepositSmallScreens />
        {/* <MediaQuery maxDeviceWidth={767}>
        </MediaQuery> */}
      </div>
      <Footer />
    </>
  );
}
