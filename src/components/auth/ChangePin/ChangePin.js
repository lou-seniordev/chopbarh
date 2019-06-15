import React from "react";
import { Helmet } from "react-helmet";
import UserHeader from "../../Dashboard/shared/UserHeader/UserHeader";
import UserNavigation from "../../Dashboard/shared/UserNavigation/UserNavigation";
import ChangePinForm from "./ChangePinForm/ChangePinForm";
import Footer from "../../UI/Footer/Footer";

export default function ChangePin() {
  return (
    <>
      <Helmet>
        <title>Chopbarh &rarr; Change Pin</title>
      </Helmet>
      <UserHeader />
      <UserNavigation />
      <ChangePinForm />
      <Footer />
    </>
  );
}
