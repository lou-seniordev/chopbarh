import * as actionType from "../../../../store/actionTypes/actionTypes";

export const authStart = () => ({
  type: actionType.AUTH_START
});

export const authOTPGenerator = otp => ({
  type: actionType.AUTH_OTP,
  otp
});

export const authSuccess = (token, id) => ({
  type: actionType.AUTH_SUCCESS,
  token,
  id
});

export const authFail = () => ({ type: actionType.AUTH_FAILURE });
