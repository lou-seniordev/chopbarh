import React from "react";
import UserHeader from "../shared/UserHeader/UserHeader";
import UserNavigation from "../shared/UserNavigation/UserNavigation";
import EditProfileForm from "../EditProfileForm/EditProfileForm";
import Footer from "../../UI/Footer/Footer";

export default function UserEditProfile() {
  return (
    <>
      <UserHeader />
      <UserNavigation />
      <EditProfileForm />
      <Footer />
    </>
  );
}
