import { toast } from "react-toastify";
import * as actionType from "../actionTypes/actionTypes";
import firebase, { firestore } from "../../firebase";

export const fetchWithdrawalBankAccountInit = () => ({
  type: actionType.FETCH_WITHDRAWAL_BANK_ACCOUNT_INIT
});

export const fetchWithdrawalBankAccountSuccess = data => ({
  type: actionType.FETCH_WITHDRAWAL_BANK_ACCOUNT_SUCCESS,
  data
});

export const fetchWithdrawalBankAccountFail = () => ({
  type: actionType.FETCH_WITHDRAWAL_BANK_ACCOUNT_FAIL
});

export const fetchWithdrawalBankAccountData = () => async (
  dispatch,
  getState
) => {
  dispatch(fetchWithdrawalBankAccountInit());

  try {
    const snapshot = await firestore
      .collection("withdrawal_account")
      .where("id", "==", getState().auth.id)
      .get();

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (data.length) {
      dispatch(fetchWithdrawalBankAccountSuccess(data[0].data));
    } else {
      dispatch(fetchWithdrawalBankAccountFail());
    }
  } catch (err) {
    dispatch(fetchWithdrawalBankAccountFail());
  }
};

export const setWithdrawalBankAccountInit = () => ({
  type: actionType.SET_WITHDRAWAL_BANK_ACCOUNT_INIT
});

export const setWithdrawalBankAccountSuccess = data => ({
  type: actionType.SET_WITHDRAWAL_BANK_ACCOUNT_SUCCESS,
  data
});

export const setWithdrawalBankAccountFail = () => ({
  type: actionType.SET_WITHDRAWAL_BANK_ACCOUNT_FAIL
});

export const setWithdrawalBankAccountData = payload => async (
  dispatch,
  getState
) => {
  dispatch(setWithdrawalBankAccountInit());

  try {
    const snapshot = await firestore
      .collection("withdrawal_account")
      .where("id", "==", getState().auth.id)
      .get();

    const withdrawalBankAccounts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    if (withdrawalBankAccounts.length === 2) {
      toast.info(
        "You have reached the maximum number of bank accounts that can be saved"
      );
    } else if (withdrawalBankAccounts.length) {
      const accountExists = getState().withdrawalAccount.withdrawalAccount.filter(
        account => account.account_number === payload.account_number
      );

      if (accountExists.length) {
      } else {
        const docRef = await firestore
          .collection("withdrawal_account")
          .doc(getState().auth.id)
          .update({
            data: firebase.firestore.FieldValue.arrayUnion({
              account_number: payload.account_number,
              bank: payload.bank,
              code: payload.code
            })
          });
        dispatch(setWithdrawalBankAccountSuccess(docRef));
      }
      dispatch(fetchWithdrawalBankAccountData());
    } else {
      const docRef = await firestore
        .collection("withdrawal_account")
        .doc(getState().auth.id)
        .set({
          id: getState().auth.id,
          data: [
            {
              account_number: payload.account_number,
              bank: payload.bank,
              code: payload.code
            }
          ]
        });
      dispatch(setWithdrawalBankAccountSuccess(docRef));
    }
  } catch (err) {
    dispatch(setWithdrawalBankAccountFail());
  }
};

export const removeWithdrawalBankAccountInit = () => ({
  type: actionType.REMOVE_WITHDRAWAL_BANK_ACCOUNT_INIT
});

export const removeWithdrawalBankAccountSuccess = () => ({
  type: actionType.REMOVE_WITHDRAWAL_BANK_ACCOUNT_SUCCESS
});

export const removeWithdrawalBankAccountFail = () => ({
  type: actionType.REMOVE_WITHDRAWAL_BANK_ACCOUNT_FAIL
});

export const removeWithdrawalBankAccount = (event, code) => async (
  dispatch,
  getState
) => {
  dispatch(removeWithdrawalBankAccountInit());

  try {
    const snapshot = await firestore
      .collection("withdrawal_account")
      .where("id", "==", getState().auth.id)
      .get();

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // console.log(data);
    if (data.length) {
      // dispatch(fetchWithdrawalBankAccountSuccess(data[0].data));
      const accountsArray = data[0].data;
      let filteredArray = accountsArray.filter(
        account => account.code !== code
      );

      try {
        const docRef = await firestore
          .collection("withdrawal_account")
          .doc(getState().auth.id)
          .update({
            data: filteredArray
          });
        dispatch(removeWithdrawalBankAccountSuccess(docRef));
      } catch (err) {
        toast.error("Account could not be removed. Please try again");
      }
      window.location.reload();
      dispatch(fetchWithdrawalBankAccountData());
      toast.success("Account was removed");
    } else {
      // dispatch(fetchWithdrawalBankAccountFail());
    }
  } catch (err) {
    console.log("Error...", err);
    dispatch(removeWithdrawalBankAccountFail());
  }
};
