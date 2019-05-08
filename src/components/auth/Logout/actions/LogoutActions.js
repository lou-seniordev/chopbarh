import * as actionType from "../../../../store/actionTypes/actionTypes";

export const authLogout = () => {
  localStorage.removeItem("chopbarh-token");
  localStorage.removeItem("chopbarh-id");

  return {
    type: actionType.AUTH_LOGOUT
  };
};
