import React from "react";
import UserEditProfile from "../components/Dashboard/UserEditProfile/UserEditProfile";
import { AppContext } from "../hoc/AppContext";

export default function EditProfilePage() {
  return (
    <AppContext.Consumer>
      {({ userGameData }) => <UserEditProfile userInfo={userGameData} />}
    </AppContext.Consumer>
  );
}
