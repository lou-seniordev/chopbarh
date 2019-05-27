import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  loading: true,
  transactionHistory: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_TRANSACTION_HISTORY_INIT:
      return {
        ...state,
        loading: true
      };
    case actionType.FETCH_TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        transactionHistory: {
          ...action.data
        },
        loading: false
      };
    case actionType.FETCH_TRANSACTION_HISTORY_FAIL:
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
