import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  voucherValue: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_VOUCHER_VALUE:
      return {
        ...state,
        voucherValue: action.value
      };
    case actionType.AUTH_LOGOUT:
      return {
        ...state,
        voucherValue: null
      };
    default:
      return state;
  }
};
