import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  loading: true,
  refundHistory: [],
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_REFUND_HISTORY_INIT:
      return {
        ...state,
        loading: true
      };
    case actionType.FETCH_REFUND_HISTORY_SUCCESS:
      return {
        ...state,
        refundHistory: [...action.data],
        loading: false
      };
    case actionType.FETCH_REFUND_HISTORY_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      };
    case actionType.AUTH_LOGOUT:
      return {
        ...state,
        loading: true,
        refundHistory: null
      };
    default:
      return state;
  }
};
