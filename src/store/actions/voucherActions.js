import * as actionType from "../actionTypes/actionTypes";
import firebase, { firestore } from "../../firebase";
import { getReference } from "../../lib/getReference";

export const setVoucherValue = value => ({
  type: actionType.SET_VOUCHER_VALUE,
  value
});

export const setVoucherHistoryInit = () => ({
  type: actionType.SET_VOUCHER_HISTORY_INIT
});

export const setVoucherHistorySuccess = data => ({
  type: actionType.SET_VOUCHER_HISTORY_SUCCESS,
  data
});

export const setVoucherHistoryFail = () => ({
  type: actionType.SET_VOUCHER_HISTORY_FAIL
});

export const setVoucherHistory = payload => async (dispatch, getState) => {
  dispatch(setVoucherHistoryInit());

  try {
    await firestore.collection("new_deposits").add({
      amount: payload.value,
      channel: "Voucher",
      deposit_date: payload.transaction_date,
      paid_at: Date.now(),
      transaction_fees: 0,
      transaction_reference: getReference(),
      status: payload.status,
      customer_id: getState().player.playerData.PhoneNum,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      playerId: getState().auth.id,
      refId: "--",
      gateway: "CHOPBARH VOUCHER"
    });
  } catch (err) {}
};
