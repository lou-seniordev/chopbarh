import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  loading: false,
  playerData: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_PLAYER_DATA_INIT:
      return {
        ...state,
        loading: true
      };
    case actionType.FETCH_PLAYER_DATA_SUCCESS:
      return {
        ...state,
        playerData: {
          ...action.data,
          loading: false
        }
      };
    case actionType.FETCH_PLAYER_DATA_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
