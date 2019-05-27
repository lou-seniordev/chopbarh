import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  authenticated: false,
  loading: false,
  error: false,
  token: null,
  id: null,
  otp: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_START:
      return {
        ...state,
        loading: true
      };
    case actionType.AUTH_OTP:
      return {
        ...state,
        otp: action.otp
      };
    case actionType.AUTH_SUCCESS:
      return {
        ...state,
        authenticated: true,
        loading: false,
        token: action.token,
        id: action.id
      };
    case actionType.AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    case actionType.AUTH_LOGOUT:
      return {
        ...state,
        authenticated: false,
        token: null,
        id: null
      };
    default:
      return state;
  }
};
