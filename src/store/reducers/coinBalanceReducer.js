import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  loading: false,
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
        loading: false
      };
    default:
      return state;
  }
};
