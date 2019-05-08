import * as actionType from "../actionTypes/actionTypesypes";

const initialState = {
  authenticated: false,
  loading: true,
  token: null,
  id: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_START:
      return {
        ...state,
        loading: true
      };
    case actionType.AUTH_SUCCESS:
      return {
        ...state,
        authenticated: true,
        loading: false,
        token: action.token,
        id: action.id
      };
    case actionType.AUTH_FAILURE:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
