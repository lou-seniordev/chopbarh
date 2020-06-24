import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  loading: true,
  raveCard: [],
  cvv: null,
  fetched: false,
  removing: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_RAVE_CARD_INIT:
      return {
        ...state,
        loading: true,
      };
    case actionType.FETCH_RAVE_CARD_SUCCESS:
      return {
        ...state,
        raveCard: [...action.data],
        loading: false,
        fetched: true,
      };
    case actionType.FETCH_RAVE_CARD_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionType.RESET_RAVE_CARD:
      return {
        ...state,
        raveCard: [],
      };
    case actionType.REMOVE_RAVE_CARD_INIT:
      return {
        ...state,
        removing: true,
      };
    case actionType.REMOVE_RAVE_CARD_SUCCESS:
      return {
        ...state,
        removing: false,
      };
    case actionType.AUTH_LOGOUT:
      return {
        ...state,
        loading: true,
        raveCard: [],
      };
    default:
      return state;
  }
};
