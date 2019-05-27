import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  loading: false,
  error: false,
  cashValue: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_CASH_BALANCE_INIT:
      return {
        ...state,
        loading: true
      };
    case actionType.SET_CASH_BALANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        cashValue: action.cashValue
      };
    case actionType.SET_CASH_BALANCE_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      };
    case actionType.AUTH_LOGOUT:
      return {
        ...state,
        cashValue: null
      };
    default:
      return state;
  }
};
