import React from "react";
import UserHeader from "../shared/UserHeader/UserHeader";
import Footer from "../../UI/Footer/Footer";
import UserNavigation from "../shared/UserNavigation/UserNavigation";

export default function UserHome() {
  return (
    <>
      <UserHeader />
      <UserNavigation />
      <Footer />
    </>
  );
}