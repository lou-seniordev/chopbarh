import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  loading: true,
  bankAccount: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_BANK_ACCOUNT_INIT:
      return {
        ...state,
        loading: true
      };
    case actionType.FETCH_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        bankAccount: [...action.data],
        loading: false
      };
    case actionType.FETCH_BANK_ACCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      };
    case actionType.AUTH_LOGOUT:
      return {
        ...state,
        loading: true,
        bankAccount: null
      };
    default:
      return state;
  }
};
