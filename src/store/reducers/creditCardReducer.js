import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  loading: true,
  creditCard: [],
  cvv: null,
  fetched: false,
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
        creditCard: state.creditCard.concat(action.data),
        loading: false,
        fetched: true
      };
    case actionType.FETCH_CREDIT_CARD_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      };
    case actionType.SET_CREDIT_CARD_SUCCESS:
      return {
        ...state,
        creditCard: state.creditCard.concat(action.data),
        loading: false
      };
    case actionType.SET_CREDIT_CARD_CVV:
      return {
        ...state,
        cvv: action.cvv
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
