import * as actionType from "../../../../store/actionTypes/actionTypes";

export const authLogout = () => {
  localStorage.removeItem("chopbarh-token:live");
  localStorage.removeItem("chopbarh-id:live");

  return {
    type: actionType.AUTH_LOGOUT
  };
};
