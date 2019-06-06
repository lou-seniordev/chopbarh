import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  loading: true,
  depositHistory: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_DEPOSIT_HISTORY_INIT:
      return {
        ...state,
        loading: true
      };
    case actionType.FETCH_DEPOSIT_HISTORY_SUCCESS:
      return {
        ...state,
        depositHistory: [...action.data],
        loading: false
      };
    case actionType.FETCH_DEPOSIT_HISTORY_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      };
    case actionType.AUTH_LOGOUT:
      return {
        ...state,
        loading: true,
        transactionHistory: null
      };
    default:
      return state;
  }
};
