import * as actionType from "../actionTypes/actionTypes";
import firebase, { firestore } from "../../firebase";

const logErrors = async payload => {
  try {
    await firestore.collection("errors_log").add({
      channel: payload.channel,
      data: payload.data,
      date: new Date().toISOString(),
      time: firebase.firestore.FieldValue.serverTimestamp(),
      at: Date.now(),
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchDepositHistoryInit = () => ({
  type: actionType.FETCH_DEPOSIT_HISTORY_INIT,
});

export const fetchDepositHistorySuccess = data => ({
  type: actionType.FETCH_DEPOSIT_HISTORY_SUCCESS,
  data,
});

export const fetchDepositHistoryFail = () => ({
  type: actionType.FETCH_DEPOSIT_HISTORY_FAIL,
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
  type: actionType.SET_DEPOSIT_HISTORY_INIT,
});

export const setDepositHistorySuccess = data => ({
  type: actionType.SET_DEPOSIT_HISTORY_SUCCESS,
  data,
});

export const setDepositHistoryFail = () => ({
  type: actionType.SET_DEPOSIT_HISTORY_FAIL,
});

export const setDepositHistory = payload => async (dispatch, getState) => {
  dispatch(setDepositHistoryInit());

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
      amount: Number(payload.amount),
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
      rowNum: countValue + 1,
    });

    docRef.update({
      count: firebase.firestore.FieldValue.increment(1),
    });
  } catch (err) {
    logErrors({
      channel: "Deposit Recording",
      data: {
        type: err.name,
        message: err.message,
      },
    });
  }

  try {
    await fetch("https://backend.chopbarh.com/api/deposits", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": process.env.REACT_APP_API_KEY_PROD,
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
        transaction_reference: payload.reference,
      }),
    });
  } catch (err) {
    logErrors({
      channel: "Deposit Recording",
      data: {
        type: err.name,
        message: err.message,
      },
    });
  }
};
