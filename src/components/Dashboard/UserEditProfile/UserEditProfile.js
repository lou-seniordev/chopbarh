import React from "react";
import { Helmet } from "react-helmet";
import UserHeader from "../shared/UserHeader/UserHeader";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import EditProfileForm from "./EditProfileForm/EditProfileForm";
import Footer from "../../UI/Footer/Footer";

export default function UserEditProfile() {
  return (
    <>
      <Helmet title={`Chopbarh \u{2192} Profile`} />
      <UserHeader />
      <UserNavigation />
      <div style={{ minHeight: "80vh" }}>
        <EditProfileForm />
      </div>
      <Footer />
    </>
  );
}
