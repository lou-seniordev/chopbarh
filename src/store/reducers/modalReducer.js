import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  submitOTPModal: false,
  submitPinModal: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.OPEN_SUBMIT_PIN_MODAL:
      return {
        ...state,
        submitPinModal: true
      };
    case actionType.CLOSE_SUBMIT_PIN_MODAL:
      return {
        ...state,
        submitPinModal: false
      };
    case actionType.OPEN_SUBMIT_OTP_MODAL:
      return {
        ...state,
        submitOTPModal: true
      };
    case actionType.CLOSE_SUBMIT_OTP_MODAL:
      return {
        ...state,
        submitOTPModal: false
      };
    default:
      return state;
  }
};
