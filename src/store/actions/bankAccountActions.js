import { toast } from "react-toastify";
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
    if (data.length) {
      dispatch(fetchBankAccountSuccess(data[0].data));
    } else {
      dispatch(fetchBankAccountFail());
    }
  } catch (err) {
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

export const setBankAccountData = payload => async (dispatch, getState) => {
  dispatch(setBankAccountInit());

  try {
    const snapshot = await firestore
      .collection("bank_charge")
      .where("id", "==", getState().auth.id)
      .get();

    const bankAccounts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    if (bankAccounts[0].data.length === 3) {
      toast.info(
        "You have reached the maximum number of bank accounts that can be saved"
      );
    } else if (bankAccounts.length) {
      const accountExists = getState().bankAccount.bankAccount.filter(
        account => account.last_digits === payload.last4
      );

      if (accountExists.length) {
      } else {
        const docRef = await firestore
          .collection("bank_charge")
          .doc(getState().auth.id)
          .update({
            data: firebase.firestore.FieldValue.arrayUnion({
              auth_code: payload.authorization_code,
              bank: payload.bank,
              last_digits: payload.last4
            })
          });
        dispatch(setBankAccountSuccess(docRef));
      }
      dispatch(fetchBankAccountData());
    } else {
      const docRef = await firestore
        .collection("bank_charge")
        .doc(getState().auth.id)
        .set({
          id: getState().auth.id,
          data: [
            {
              auth_code: payload.authorization_code,
              bank: payload.bank,
              last_digits: payload.last4
            }
          ]
        });
      dispatch(setBankAccountSuccess(docRef));
    }
  } catch (err) {
    dispatch(setBankAccountFail());
  }
};

export const removeBankAccountInit = () => ({
  type: actionType.REMOVE_BANK_ACCOUNT_INIT
});

export const removeBankAccountSuccess = () => ({
  type: actionType.REMOVE_BANK_ACCOUNT_SUCCESS
});

export const removeBankAccountFail = () => ({
  type: actionType.REMOVE_BANK_ACCOUNT_FAIL
});

export const removeBankAccount = (event, authCode) => async (
  dispatch,
  getState
) => {
  dispatch(removeBankAccountInit());

  try {
    const snapshot = await firestore
      .collection("bank_charge")
      .where("id", "==", getState().auth.id)
      .get();

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // console.log(data);
    if (data.length) {
      // dispatch(fetchBankAccountSuccess(data[0].data));
      const accountsArray = data[0].data;
      let filteredArray = accountsArray.filter(
        account => account.auth_code !== authCode
      );

      try {
        const docRef = await firestore
          .collection("bank_charge")
          .doc(getState().auth.id)
          .update({
            data: filteredArray
          });
        dispatch(removeBankAccountSuccess(docRef));
      } catch (err) {
        toast.error("Account could not be removed. Please try again");
      }
      window.location.reload();
      dispatch(fetchBankAccountData());
      toast.success("Account was removed");
    } else {
      // dispatch(fetchBankAccountFail());
    }
  } catch (err) {
    console.log("Error...", err);
    dispatch(removeBankAccountFail());
  }
};
