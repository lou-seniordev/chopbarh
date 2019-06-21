import React from "react";
import { Helmet } from "react-helmet";
import UserHeader from "../../Dashboard/shared/UserHeader/UserHeader";
import UserNavigation from "../../Dashboard/shared/UserNavigation/UserNavigation";
import ChangePinForm from "./ChangePinForm/ChangePinForm";
import Footer from "../../UI/Footer/Footer";

export default function ChangePin() {
  return (
    <>
      {/* <Helmet title={`Chopbarh \u{2192} Change Pin`} /> */}
      <UserHeader />
      <UserNavigation />
      <ChangePinForm />
      <Footer />
    </>
  );
}
