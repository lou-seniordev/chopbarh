import * as actionType from "./actionTypes/actions";

const initialState = {
  authenticated: false
};

export default function(state = initialState, action) {
  switch (action.types) {
    case actionType.SET_AUTH:
      return {
        ...state,
        authenticated: true
      };
    default:
      return {
        ...state
      };
  }
}
