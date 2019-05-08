import * as actionType from "../../../../store/actionTypes/actionTypes";

export const SignUpStart = () => ({
  type: actionType.SIGNUP_INIT
});

export const SignUpSuccess = (token, id) => ({
  type: actionType.SIGNUP_SUCCESS,
  token,
  id
});

export const SignUpFail = () => ({ type: actionType.SIGNUP_FAILURE });
