import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  loading: true,
  withdrawalHistory: null,
  withdrawalLimit: 500000,
  withdrawalStatus: 0,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_WITHDRAWAL_HISTORY_INIT:
      return {
        ...state,
        loading: true
      };
    case actionType.FETCH_WITHDRAWAL_HISTORY_SUCCESS:
      return {
        ...state,
        withdrawalHistory: [...action.data],
        loading: false
      };
    case actionType.FETCH_WITHDRAWAL_HISTORY_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      };
    case actionType.SET_WITHDRAWAL_STATUS:
      return {
        ...state,
        withdrawalStatus: action.value
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
