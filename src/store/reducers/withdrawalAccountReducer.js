import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  loading: true,
  withdrawalAccount: [],
  error: false,
  removing: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_WITHDRAWAL_BANK_ACCOUNT_INIT:
      return {
        ...state,
        loading: true
      };
    case actionType.FETCH_WITHDRAWAL_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        withdrawalAccount: [...action.data],
        loading: false
      };
    case actionType.FETCH_WITHDRAWAL_BANK_ACCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      };
    case actionType.REMOVE_WITHDRAWAL_BANK_ACCOUNT_INIT:
      return {
        ...state,
        removing: true
      };
    case actionType.REMOVE_WITHDRAWAL_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        removing: false
      };
    case actionType.REMOVE_WITHDRAWAL_BANK_ACCOUNT_FAIL:
      return {
        ...state,
        removing: false
      };
    case actionType.AUTH_LOGOUT:
      return {
        ...state,
        loading: true,
        withdrawalAccount: null
      };
    default:
      return state;
  }
};
