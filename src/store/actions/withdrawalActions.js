import * as actionType from "../actionTypes/actionTypes";
import firebase, { firestore } from "../../firebase";

export const fetchWithdrawalHistoryInit = () => ({
  type: actionType.FETCH_WITHDRAWAL_HISTORY_INIT
});

export const fetchWithdrawalHistorySuccess = data => ({
  type: actionType.FETCH_WITHDRAWAL_HISTORY_SUCCESS,
  data
});

export const fetchWithdrawalHistoryFail = () => ({
  type: actionType.FETCH_WITHDRAWAL_HISTORY_FAIL
});

export const fetchWithdrawalHistoryData = () => async (dispatch, getState) => {
  dispatch(fetchWithdrawalHistoryInit());

  try {
    const snapshot = await firestore
      .collection("withdrawals")
      .where("id", "==", getState().auth.id)
      .get();

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (data.length) {
      dispatch(fetchWithdrawalHistorySuccess(data[0].data.reverse()));
    } else {
      dispatch(fetchWithdrawalHistoryFail());
    }
  } catch (err) {
    dispatch(fetchWithdrawalHistoryFail());
  }
};

export const setWithdrawalHistoryInit = () => ({
  type: actionType.SET_WITHDRAWAL_HISTORY_INIT
});

export const setWithdrawalHistorySuccess = data => ({
  type: actionType.SET_WITHDRAWAL_HISTORY_SUCCESS,
  data
});

export const setWithdrawalHistoryFail = () => ({
  type: actionType.SET_WITHDRAWAL_HISTORY_FAIL
});

export const setWithdrawalHistory = payload => async (dispatch, getState) => {
  dispatch(setWithdrawalHistoryInit());
  try {
    const snapshot = await firestore
      .collection("withdrawals")
      .where("id", "==", getState().auth.id)
      .get();

    const withdrawals = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    if (withdrawals.length) {
      const docRef = await firestore
        .collection("withdrawals")
        .doc(getState().auth.id)
        .update({
          data: firebase.firestore.FieldValue.arrayUnion({
            amount: payload.amount,
            status: payload.status,
            transaction_fee: payload.fee,
            transaction_reference: payload.reference,
            channel: payload.channel,
            withdrawal_date: payload.date,
            paid_at: payload.date
          })
        });
      dispatch(setWithdrawalHistorySuccess(docRef));
    } else {
      const docRef = await firestore
        .collection("withdrawals")
        .doc(getState().auth.id)
        .set({
          id: getState().auth.id,
          data: [
            {
              amount: payload.amount,
              status: payload.status,
              transaction_fee: payload.fee,
              transaction_reference: payload.reference,
              channel: payload.channel,
              withdrawal_date: payload.date,
              paid_at: payload.date
            }
          ]
        });
      dispatch(setWithdrawalHistorySuccess(docRef));
    }
  } catch (err) {
    dispatch(setWithdrawalHistoryFail());
  }
};
