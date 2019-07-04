import React from "react";
import { Helmet } from "react-helmet";
import MediaQuery from "react-responsive";
import UserHeader from "../shared/UserHeader/UserHeader";
import Footer from "../../UI/Footer/Footer";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import WithdrawTabs from "./WithdrawTabs/WithdrawTabs";

export default function UserDeposit() {
  return (
    <>
      <Helmet title={`Chopbarh \u{2192} Withdraw`} />
      <UserHeader />
      <UserNavigation />
      <div style={{ minHeight: "80vh" }}>
        <MediaQuery minDeviceWidth={767}>
          <WithdrawTabs />
        </MediaQuery>
      </div>
      {/* <div className="container">
        <p>
          Note: No. We are not sending you airtime! You can withdraw by dialing
          *242# on your phone number Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Purus gravida quis blandit turpis cursus in hac
          habitasse. Auctor urna nunc id cursus metus aliquam. Laoreet id donec
          ultrices tincidunt arcu non. Sed pulvinar proin gravida hendrerit.
          Adipiscing at in tellus integer feugiat scelerisque. Egestas congue
          quisque egestas diam in. Nec nam aliquam sem et tortor consequat id
          porta nibh. Montes nascetur ridiculus mus mauris vitae.
        </p>
      </div> */}
      <Footer />
    </>
  );
}
