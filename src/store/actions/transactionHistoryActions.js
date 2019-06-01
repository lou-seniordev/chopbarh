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

export const setTransactionHistory = data => async (dispatch, getState) => {
  dispatch(setTransactionHistoryInit());
  console.log(data);
  // const snapshot = await firestore
  //     .collection("transactions")
  //     .where("id", "==", "ghbrtfjvnijnijdngjd")
  //     .get();

  //   const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  //   if (data) {
  //     const docRef = await firestore
  //       .collection("transactions")
  //       .doc("this_is_the_id")
  //       .update({
  //         data: firebase.firestore.FieldValue.arrayUnion({
  //           amount: "Nutod",
  //           paid_at: 20
  //         })
  //       });

  //     console.log(docRef);
  //   } else {
  //     console.log("Yay---");
  //   }
  // const docRef = await firestore
  //   .collection("transactions")
  //   .doc("this_is_the_id")
  //   .set({
  //     id: "ghbrtfjvnijnijdngjd",
  //     reference: "iafbviuabiu39",
  //     data: [{}, {}]
  //   });

  try {
    const snapshot = await firestore
      .collection("transactions")
      .where("id", "==", getState().auth.id)
      .get();

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(data);
    dispatch(setTransactionHistorySuccess(data[0].data));
  } catch (err) {
    console.log("Error...", err);
    dispatch(setTransactionHistoryFail());
  }
};
