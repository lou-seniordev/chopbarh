import * as actionType from "../actionTypes/actionTypes";
import firebase, { firestore } from "../../firebase";

export const fetchTransactionHistoryInit = () => ({
  type: actionType.FETCH_TRANSACTION_HISTORY_INIT
});

export const fetchTransactionHistorySuccess = data => ({
  type: actionType.FETCH_TRANSACTION_HISTORY_SUCCESS,
  data
});

export const fetchTransactionHistoryFail = () => ({
  type: actionType.FETCH_TRANSACTION_HISTORY_FAIL
});

export const fetchTransactionHistoryData = () => async (dispatch, getState) => {
  dispatch(fetchTransactionHistoryInit());

  try {
    const snapshot = await firestore
      .collection("transactions")
      .where("id", "==", getState().auth.id)
      .get();

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(data);
    dispatch(fetchTransactionHistorySuccess(data[0].data));
  } catch (err) {
    console.log("Error...", err);
    dispatch(fetchTransactionHistoryFail());
  }
};

export const setTransactionHistoryInit = () => ({
  type: actionType.SET_TRANSACTION_HISTORY_INIT
});

export const setTransactionHistorySuccess = data => ({
  type: actionType.SET_TRANSACTION_HISTORY_SUCCESS,
  data
});

export const setTransactionHistoryFail = () => ({
  type: actionType.SET_TRANSACTION_HISTORY_FAIL
});

export const setTransactionHistory = payload => async (dispatch, getState) => {
  dispatch(setTransactionHistoryInit());
  try {
    const snapshot = await firestore
      .collection("transactions")
      .where("id", "==", getState().auth.id)
      .get();

    const transactions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(transactions);

    if (transactions) {
      const docRef = await firestore
        .collection("transactions")
        .doc(getState().auth.id)
        .update({
          data: firebase.firestore.FieldValue.arrayUnion({
            amount: payload.amount,
            channel: payload.channel,
            transaction_date: payload.transaction_date,
            paid_at: payload.paid_at
          })
        });
    } else {
      const docRef = await firestore
        .collection("transactions")
        .doc(getState().auth.id)
        .set({
          id: getState().auth.id,
          data: [
            {
              amount: payload.amount,
              channel: payload.channel,
              transaction_date: payload.transaction_date,
              paid_at: payload.paid_at
            }
          ]
        });
    }
  } catch (err) {
    console.log("Error", err);
  }
};
