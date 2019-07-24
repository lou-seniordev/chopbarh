import * as actionType from "../actionTypes/actionTypes";

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

export const openPhoneModal = () => ({
  type: actionType.OPEN_SUBMIT_PHONE_MODAL
});

export const closePhoneModal = () => ({
  type: actionType.CLOSE_SUBMIT_PHONE_MODAL
});

export const openBirthdayModal = () => ({
  type: actionType.OPEN_SUBMIT_BIRTHDAY_MODAL
});

export const closeBirthdayModal = () => ({
  type: actionType.CLOSE_SUBMIT_BIRTHDAY_MODAL
});

export const openTransactionSuccessModal = () => ({
  type: actionType.OPEN_TRANSACTION_SUCCESS_MODAL
});

export const closeTransactionSuccessModal = () => ({
  type: actionType.CLOSE_TRANSACTION_SUCCESS_MODAL
});

export const openTransactionFailModal = () => ({
  type: actionType.OPEN_TRANSACTION_FAIL_MODAL
});

export const closeTransactionFailModal = () => ({
  type: actionType.CLOSE_TRANSACTION_FAIL_MODAL
});
