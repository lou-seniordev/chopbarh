import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  loading: true,
  transferHistory: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_CREDIT_TRANSFER_INIT:
      return {
        ...state,
        loading: true
      };
    case actionType.FETCH_CREDIT_TRANSFER_SUCCESS:
      return {
        ...state,
        transferHistory: [...action.data],
        loading: false
      };
    case actionType.FETCH_CREDIT_TRANSFER_FAIL:
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
