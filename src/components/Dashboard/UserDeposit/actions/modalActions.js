import * as actionType from "../../../../store/actionTypes/actionTypes";

export const openPinModal = () => ({
  type: actionType.OPEN_SUBMIT_PIN_MODAL
});

export const closePinModal = () => ({
  type: actionType.CLOSE_SUBMIT_PIN_MODAL
});

export const openOTPModal = () => ({
  type: actionType.OPEN_SUBMIT_OTP_MODAL
});

export const closeOTPModal = () => ({
  type: actionType.CLOSE_SUBMIT_OTP_MODAL
});
