import * as actionType from "../actionTypes/actionTypes";

export const authStart = () => ({
  type: actionType.AUTH_START
});

export const authOTPGenerator = otp => ({
  type: actionType.AUTH_OTP,
  otp
});

export const authSuccess = (token, id) => {
  // expirationTimer();

  return {
    type: actionType.AUTH_SUCCESS,
    token,
    id
  };
};

export const authFail = () => ({ type: actionType.AUTH_FAILURE });

export const authLogout = () => {
  localStorage.removeItem("chopbarh-token:live");
  localStorage.removeItem("chopbarh-id:live");

  return {
    type: actionType.AUTH_LOGOUT
  };
};

export const expirationTimer = () => {
  setTimeout(() => {
    authLogout();
  }, 10000);
};
