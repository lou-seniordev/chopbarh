import React from "react";
import SignUp from "../components/auth/SignUp/SignUp";
import { AppContext } from "../hoc/AppContext";

export default function SignUpPage() {
  return (
    <AppContext.Consumer>
      {({ getUserInfo }) => <SignUp getUserInfo={getUserInfo} />}
    </AppContext.Consumer>
  );
}
