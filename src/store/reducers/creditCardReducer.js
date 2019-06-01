import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  loading: true,
  creditCard: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_CREDIT_CARD_INIT:
      return {
        ...state,
        loading: true
      };
    case actionType.FETCH_CREDIT_CARD_SUCCESS:
      return {
        ...state,
        creditCard: [...action.data],
        loading: false
      };
    case actionType.FETCH_CREDIT_CARD_FAIL:
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
