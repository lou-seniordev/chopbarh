import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  loading: true,
  results: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_TOP_EARNERS_INIT:
      return {
        ...state,
        loading: true
      };
    case actionType.FETCH_TOP_EARNERS_SUCCESS:
      return {
        ...state,
        results: {
          ...action.data
        },
        loading: false
      };
    case actionType.FETCH_TOP_EARNERS_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
