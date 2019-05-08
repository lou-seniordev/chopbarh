import * as actionType from "./actionTypes/actions";

const initialState = {
  authenticated: false,
  count: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_AUTH:
      return {
        ...state,
        authenticated: true,
        count: state.count + 1
      };
    default:
      return state;
  }
};
