import React from "react";
import CompleteProfile from "../components/auth/CompleteProfile/CompleteProfile";
import { AppContext } from "../hoc/AppContext";

export default function CompleteProfilePage() {
  return (
    <AppContext.Consumer>
      {({ getUserInfo }) => <CompleteProfile getUserInfo={getUserInfo} />}
    </AppContext.Consumer>
  );
}
