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
    default:
      return state;
  }
};
