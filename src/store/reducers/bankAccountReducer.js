import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  loading: true,
  bankAccount: [],
  error: false,
  removing: false
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
    case actionType.REMOVE_BANK_ACCOUNT_INIT:
      return {
        ...state,
        removing: true
      };
    case actionType.REMOVE_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        removing: false
      };
    case actionType.REMOVE_BANK_ACCOUNT_FAIL:
      return {
        ...state,
        removing: false
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
