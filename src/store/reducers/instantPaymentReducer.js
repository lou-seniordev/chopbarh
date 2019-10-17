import * as actionType from "../actionTypes/actionTypes";

const initialState = {
 loading: true,
 account_number: null,
 error: false
};

export default (state = initialState, action) => {
 switch (action.type) {
  case actionType.FETCH_INSTANT_PAYMENT_ACCOUNT_INIT:
   return {
    ...state,
    loading: true
   };
  case actionType.FETCH_INSTANT_PAYMENT_ACCOUNT_SUCCESS:
   return {
    ...state,
    account_number: { ...action.data },
    loading: false
   };
  case actionType.FETCH_INSTANT_PAYMENT_ACCOUNT_FAIL:
   return {
    ...state,
    loading: false,
    error: true
   };
  case actionType.AUTH_LOGOUT:
   return {
    ...state,
    loading: true,
    account_number: null
   };
  default:
   return state;
 }
};
