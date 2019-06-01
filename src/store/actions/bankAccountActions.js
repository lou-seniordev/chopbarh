import * as actionType from "../actionTypes/actionTypes";
import firebase, { firestore } from "../../firebase";

export const fetchBankAccountInit = () => ({
  type: actionType.FETCH_BANK_ACCOUNT_INIT
});

export const fetchBankAccountSuccess = data => ({
  type: actionType.FETCH_BANK_ACCOUNT_SUCCESS,
  data
});

export const fetchBankAccountFail = () => ({
  type: actionType.FETCH_BANK_ACCOUNT_FAIL
});

export const fetchBankAccountData = () => async (dispatch, getState) => {
  dispatch(fetchBankAccountInit());

  try {
    const snapshot = await firestore
      .collection("bank_charge")
      .where("id", "==", getState().auth.id)
      .get();

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(data);
    if (data) {
      dispatch(fetchBankAccountSuccess(data[0].data));
    } else {
      dispatch(fetchBankAccountFail());
    }
  } catch (err) {
    console.log("Error...", err);
    dispatch(fetchBankAccountFail());
  }
};

export const setBankAccountInit = () => ({
  type: actionType.SET_BANK_ACCOUNT_INIT
});

export const setBankAccountSuccess = data => ({
  type: actionType.SET_BANK_ACCOUNT_SUCCESS,
  data
});

export const setBankAccountFail = () => ({
  type: actionType.SET_BANK_ACCOUNT_FAIL
});

export const setBankAccountData = () => async (dispatch, getState) => {
  dispatch(setBankAccountInit());

  try {
    const snapshot = await firestore
      .collection("card_charge")
      .where("id", "==", getState().auth.id)
      .get();

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(data);
    // dispatch(setBankAccountSuccess(data[0].data));
  } catch (err) {
    console.log("Error...", err);
    dispatch(setBankAccountFail());
  }
};
