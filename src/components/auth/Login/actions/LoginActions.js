import * as actionType from "../../../../store/actionTypes/actionTypes";

export const authStart = () => ({ type: actionType.AUTH_START });

export const authSuccess = () => ({ type: actionType.AUTH_SUCCESS });

export const authFail = () => ({ type: actionType.AUTH_FAILURE });
