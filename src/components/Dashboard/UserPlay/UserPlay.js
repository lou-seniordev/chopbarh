import React from "react";
import { Helmet } from "react-helmet";
import UserHeader from "../shared/UserHeader/UserHeader";
import Footer from "../../UI/Footer/Footer";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import QuickPlayTransaction from "../UserTransaction/QuickPlayTransaction/QuickPlayTransaction";

export default function UserPlay() {
  return (
    <>
      <Helmet title={`Chopbarh \u{2192} Play`} />
      <UserHeader />
      <UserNavigation />
      <div className="container" style={{ minHeight: "70vh" }}>
        <div className="row">
          <div className="col-md-12">
            <QuickPlayTransaction noHeader />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
