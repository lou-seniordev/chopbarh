import React from "react";
import { Helmet } from "react-helmet";
import UserHeader from "../shared/UserHeader/UserHeader";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import UserProfileContent from "./UserProfileContent/UserProfileContent";
import Footer from "../../UI/Footer/Footer";

export default function UserProfile({ userInfo }) {
  return (
    <>
      <Helmet>
        <title>Chopbarh &rarr; Profile</title>
      </Helmet>
      <UserHeader />
      <UserNavigation />
      <UserProfileContent userInfo={userInfo} />
      <Footer />
    </>
  );
}
