import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  reference: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_CHARGE_REFERENCE:
      return {
        ...state,
        reference: action.reference
      };
    default:
      return state;
  }
};
