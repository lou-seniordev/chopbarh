import * as actionType from "../actionTypes/actionTypes";
import firebase, { firestore } from "../../firebase";

export const fetchTransferCreditInit = () => ({
  type: actionType.FETCH_CREDIT_TRANSFER_INIT
});

export const fetchTransferCreditSuccess = data => ({
  type: actionType.FETCH_CREDIT_TRANSFER_SUCCESS,
  data
});

export const fetchTransferCreditFail = () => ({
  type: actionType.FETCH_CREDIT_TRANSFER_FAIL
});

export const fetchTransferCreditData = () => async (dispatch, getState) => {
  dispatch(fetchTransferCreditInit());

  try {
    const snapshot = await firestore
      .collection("transfers")
      .where("id", "==", getState().auth.id)
      .get();

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (data.length) {
      dispatch(fetchTransferCreditSuccess(data[0].data.reverse()));
    } else {
      dispatch(fetchTransferCreditFail());
    }
  } catch (err) {
    dispatch(fetchTransferCreditFail());
  }
};

export const setTransferCreditInit = () => ({
  type: actionType.SET_CREDIT_TRANSFER_INIT
});

export const setTransferCreditSuccess = data => ({
  type: actionType.SET_CREDIT_TRANSFER_SUCCESS,
  data
});

export const setTransferCreditFail = () => ({
  type: actionType.SET_CREDIT_TRANSFER_FAIL
});

export const setTransferCredit = payload => async (dispatch, getState) => {
  dispatch(setTransferCreditInit());

  try {
    const snapshot = await firestore
      .collection("transfers")
      .where("id", "==", getState().auth.id)
      .get();

    const transfers = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(transfers);

    if (transfers.length) {
      const docRef = await firestore
        .collection("transfers")
        .doc(getState().auth.id)
        .update({
          data: firebase.firestore.FieldValue.arrayUnion({
            amount: payload.amount / 100,
            channel: payload.channel,
            deposit_date: payload.transaction_date,
            paid_at: payload.paid_at,
            transaction_fees: payload.fees,
            transaction_reference: payload.reference,
            status: payload.status
          })
        });
      dispatch(setTransferCreditSuccess(docRef));
    } else {
      const docRef = await firestore
        .collection("transfers")
        .doc(getState().auth.id)
        .set({
          id: getState().auth.id,
          data: [
            {
              amount: payload.amount / 100,
              channel: payload.channel,
              deposit_date: payload.transaction_date,
              paid_at: payload.paid_at,
              transaction_fees: payload.fees,
              transaction_reference: payload.reference,
              status: payload.status
            }
          ]
        });
      dispatch(setTransferCreditSuccess(docRef));
    }
  } catch (err) {
    console.log(err);
    dispatch(setTransferCreditFail());
  }
};
