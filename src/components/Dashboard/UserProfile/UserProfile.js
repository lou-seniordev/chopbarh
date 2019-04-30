import React from "react";
import { Redirect } from "react-router-dom";
import UserHeader from "../shared/UserHeader/UserHeader";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import EditProfileForm from "./EditProfileForm/EditProfileForm";
import Footer from "../../UI/Footer/Footer";

export default function UserProfile() {
  const auth = localStorage.getItem("chopbarh-token");

  return (
    <>
      {!auth && <Redirect to="/" />}
      <UserHeader />
      <UserNavigation />
      <EditProfileForm />
      <Footer />
    </>
  );
}
