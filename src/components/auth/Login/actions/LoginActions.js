import * as actionType from "../../../../store/actionTypes/actionTypes";

export const authStart = () => ({
  type: actionType.AUTH_START
});

export const authOTPGenerator = () => {
  const otp = Math.floor(111111 + Math.random() * 999999);

  return {
    type: actionType.AUTH_OTP,
    otp
  };
};

export const authSuccess = (token, id) => ({
  type: actionType.AUTH_SUCCESS,
  token,
  id
});

export const authFail = () => ({ type: actionType.AUTH_FAILURE });
