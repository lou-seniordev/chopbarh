import * as actionType from "../actionTypes/actionTypes";
import firebase, { firestore } from "../../firebase";

export const fetchDepositHistoryInit = () => ({
  type: actionType.FETCH_DEPOSIT_HISTORY_INIT
});

export const fetchDepositHistorySuccess = data => ({
  type: actionType.FETCH_DEPOSIT_HISTORY_SUCCESS,
  data
});

export const fetchDepositHistoryFail = () => ({
  type: actionType.FETCH_DEPOSIT_HISTORY_FAIL
});

export const fetchDepositHistoryData = () => async (dispatch, getState) => {
  dispatch(fetchDepositHistoryInit());

  try {
    const snapshot = await firestore
      .collection("deposits")
      .where("id", "==", getState().auth.id)
      .get();

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (data.length) {
      dispatch(fetchDepositHistorySuccess(data[0].data));
    } else {
      dispatch(fetchDepositHistoryFail());
    }
  } catch (err) {
    dispatch(fetchDepositHistoryFail());
  }
};

export const setDepositHistoryInit = () => ({
  type: actionType.SET_DEPOSIT_HISTORY_INIT
});

export const setDepositHistorySuccess = data => ({
  type: actionType.SET_DEPOSIT_HISTORY_SUCCESS,
  data
});

export const setDepositHistoryFail = () => ({
  type: actionType.SET_DEPOSIT_HISTORY_FAIL
});

export const setDepositHistory = payload => async (dispatch, getState) => {
  dispatch(setDepositHistoryInit());

  try {
    const snapshot = await firestore
      .collection("deposits")
      .where("id", "==", getState().auth.id)
      .get();

    const deposits = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(deposits);

    if (deposits.length) {
      const docRef = await firestore
        .collection("deposits")
        .doc(getState().auth.id)
        .update({
          data: firebase.firestore.FieldValue.arrayUnion({
            amount: payload.amount / 100,
            channel: payload.channel,
            deposit_date: payload.transaction_date,
            paid_at: payload.paid_at
          })
        });
      dispatch(setDepositHistorySuccess(docRef));
    } else {
      const docRef = await firestore
        .collection("deposits")
        .doc(getState().auth.id)
        .set({
          id: getState().auth.id,
          data: [
            {
              amount: payload.amount / 100,
              channel: payload.channel,
              deposit_date: payload.transaction_date,
              paid_at: payload.paid_at
            }
          ]
        });
      dispatch(setDepositHistorySuccess(docRef));
    }
  } catch (err) {
    console.log(err);
    dispatch(setDepositHistoryFail());
  }
};
