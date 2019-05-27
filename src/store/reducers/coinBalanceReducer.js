import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  loading: false,
  error: false,
  coinValue: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_COIN_BALANCE_INIT:
      return {
        ...state,
        loading: true
      };
    case actionType.SET_COIN_BALANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        coinValue: action.coinValue
      };
    case actionType.SET_COIN_BALANCE_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      };
    case actionType.AUTH_LOGOUT:
      return {
        ...state,
        coinValue: null
      };
    default:
      return state;
  }
};
