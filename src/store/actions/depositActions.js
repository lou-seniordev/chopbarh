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
      dispatch(fetchDepositHistorySuccess(data[0].data.reverse()));
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

    if (deposits.length) {
      const docRef = await firestore
        .collection("deposits")
        .doc(getState().auth.id)
        .update({
          data: firebase.firestore.FieldValue.arrayUnion({
            amount: payload.amount,
            channel: payload.channel,
            deposit_date: payload.transaction_date,
            paid_at: payload.transaction_date,
            transaction_fees: payload.fees,
            transaction_reference: payload.reference,
            status: "Pending",
            refId: payload.refId,
            gateway: payload.gateway,
            customer_id: getState().player.playerData.PhoneNum
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
              amount: payload.amount,
              channel: payload.channel,
              deposit_date: payload.transaction_date,
              paid_at: payload.transaction_date,
              transaction_fees: payload.fees,
              transaction_reference: payload.reference,
              status: "Pending",
              refId: payload.refId,
              gateway: payload.gateway,
              customer_id: getState().player.playerData.PhoneNum
            }
          ]
        });
      dispatch(setDepositHistorySuccess(docRef));
    }
  } catch (err) {
    dispatch(setDepositHistoryFail());
  }

  try {
    const snapshot = await firestore
      .collection("totalcounts")
      .doc("new_deposits")
      .get();

    const countValue = snapshot.data().count;

    const docRef = await firestore
      .collection("totalcounts")
      .doc("new_deposits");

    await firestore.collection("new_deposits").add({
      amount: payload.amount,
      channel: payload.channel,
      deposit_date: payload.transaction_date,
      paid_at: Date.now(),
      transaction_fees: payload.fees,
      transaction_reference: payload.reference,
      status: "PENDING",
      refId: payload.refId,
      gateway: payload.gateway,
      customer_id: getState().player.playerData.PhoneNum,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      playerId: getState().auth.id,
      rowNum: countValue + 1
    });

    docRef.update({
      count: firebase.firestore.FieldValue.increment(1)
    });
  } catch (err) {}

  try {
    await fetch(
      "https://cors-anywhere.herokuapp.com/https://backend.chopbarh.com/api/deposits",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "api-key": process.env.REACT_APP_API_KEY
        },
        body: JSON.stringify({
          amount: payload.amount,
          channel: payload.channel,
          customer_id: getState().player.playerData.PhoneNum,
          deposit_date: payload.transaction_date,
          gameTransactionId: "N/A",
          playerId: getState().auth.id,
          refId: payload.refId,
          gateway: payload.gateway,
          status: "PENDING",
          paid_at: Date.now(),
          transaction_fees: payload.fees,
          transaction_reference: payload.reference
        })
      }
    );
  } catch (err) {
    console.log(err);
  }
};
