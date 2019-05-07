import React from "react";
import UserProfile from "../components/Dashboard/UserProfile/UserProfile";
import { AppContext } from "../hoc/AppContext";

export default function EditProfilePage() {
  return (
    <AppContext.Consumer>
      {({ userGameData }) => <UserProfile userInfo={userGameData} />}
    </AppContext.Consumer>
  );
}
