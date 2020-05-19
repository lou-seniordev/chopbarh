import * as actionType from "../actionTypes/actionTypes";

const initialState = {
  submitOTPModal: false,
  submitPinModal: false,
  submitPhoneModal: false,
  submitBirthdayModal: false,
  transactionSuccessModal: false,
  transactionFailModal: false,
  cardPinModal: false,
  cardOTPModal: false,
  cardPhoneModal: false,
  cardBirthdayModal: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.OPEN_SUBMIT_PIN_MODAL:
      return {
        ...state,
        submitPinModal: true,
      };
    case actionType.CLOSE_SUBMIT_PIN_MODAL:
      return {
        ...state,
        submitPinModal: false,
      };
    case actionType.OPEN_SUBMIT_OTP_MODAL:
      return {
        ...state,
        submitOTPModal: true,
      };
    case actionType.CLOSE_SUBMIT_OTP_MODAL:
      return {
        ...state,
        submitOTPModal: false,
      };
    case actionType.OPEN_SUBMIT_PHONE_MODAL:
      return {
        ...state,
        submitPhoneModal: true,
      };
    case actionType.CLOSE_SUBMIT_PHONE_MODAL:
      return {
        ...state,
        submitPhoneModal: false,
      };
    case actionType.OPEN_SUBMIT_BIRTHDAY_MODAL:
      return {
        ...state,
        submitBirthdayModal: true,
      };
    case actionType.CLOSE_SUBMIT_BIRTHDAY_MODAL:
      return {
        ...state,
        submitBirthdayModal: false,
      };
    case actionType.OPEN_TRANSACTION_SUCCESS_MODAL:
      return {
        ...state,
        transactionSuccessModal: true,
      };
    case actionType.CLOSE_TRANSACTION_SUCCESS_MODAL:
      return {
        ...state,
        transactionSuccessModal: false,
      };
    case actionType.OPEN_TRANSACTION_FAIL_MODAL:
      return {
        ...state,
        transactionFailModal: true,
      };
    case actionType.CLOSE_TRANSACTION_FAIL_MODAL:
      return {
        ...state,
        transactionFailModal: false,
      };
    case actionType.OPEN_CARD_PIN_MODAL:
      return {
        ...state,
        cardPinModal: true,
      };
    case actionType.CLOSE_CARD_PIN_MODAL:
      return {
        ...state,
        cardPinModal: false,
      };
    case actionType.OPEN_CARD_OTP_MODAL:
      return {
        ...state,
        cardOTPModal: true,
      };
    case actionType.CLOSE_CARD_OTP_MODAL:
      return {
        ...state,
        cardOTPModal: false,
      };
    case actionType.OPEN_CARD_PHONE_MODAL:
      return {
        ...state,
        cardPhoneModal: true,
      };
    case actionType.CLOSE_CARD_PHONE_MODAL:
      return {
        ...state,
        cardPhoneModal: false,
      };
    case actionType.OPEN_CARD_BIRTHDAY_MODAL:
      return {
        ...state,
        cardBirthdayModal: true,
      };
    case actionType.CLOSE_CARD_BIRTHDAY_MODAL:
      return {
        ...state,
        cardBirthdayModal: false,
      };
    default:
      return state;
  }
};
