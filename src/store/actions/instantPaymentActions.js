import * as actionType from "../actionTypes/actionTypes";
import firebase, { firestore } from "../../firebase";
import { toast } from "react-toastify";

export const fetchInstantPaymentAccountInit = () => ({
  type: actionType.FETCH_INSTANT_PAYMENT_ACCOUNT_INIT
});

export const fetchInstantPaymentAccountSuccess = data => ({
  type: actionType.FETCH_INSTANT_PAYMENT_ACCOUNT_SUCCESS,
  data
});

export const fetchInstantPaymentAccountFail = () => ({
  type: actionType.FETCH_INSTANT_PAYMENT_ACCOUNT_FAIL
});

export const fetchInstantPaymentAccountData = () => async (
  dispatch,
  getState
) => {
  dispatch(fetchInstantPaymentAccountInit());

  try {
    const snapshot = await firestore
      .collection("instant_payment")
      .doc(getState().auth.id)
      .get();

    const data = snapshot.data();

    // console.log(data);
    //   console.log(snapshot.data(), getState().auth.id);
    //   if (data.length) {
    try {
      if (!Object.keys(data).length) {
        dispatch(fetchInstantPaymentAccountFail());
      } else {
        dispatch(fetchInstantPaymentAccountSuccess(data));
      }
    } catch (err) {
      dispatch(fetchInstantPaymentAccountFail());
    }
    //   } else {
    //    dispatch(fetchInstantPaymentAccountFail());
    //   }
  } catch (err) {
    console.log(err);
    dispatch(fetchInstantPaymentAccountFail());
  }
};

export const setInstantPaymentAccountInit = () => ({
  type: actionType.SET_INSTANT_PAYMENT_ACCOUNT_INIT
});

export const setInstantPaymentAccountSuccess = data => ({
  type: actionType.SET_INSTANT_PAYMENT_ACCOUNT_SUCCESS,
  data
});

export const setInstantPaymentAccountFail = () => ({
  type: actionType.SET_INSTANT_PAYMENT_ACCOUNT_FAIL
});

export const setInstantPaymentAccountData = payload => async (
  dispatch,
  getState
) => {
  dispatch(setInstantPaymentAccountInit());

  try {
    const docRef = await firestore
      .collection("instant_payment")
      .doc(getState().auth.id)
      .set({
        account_number: payload.account_number,
        bank_name: payload.bank_name
      });

    setTimeout(() => {
      dispatch(
        fetchInstantPaymentAccountSuccess({
          account_number: payload.account_number,
          bank_name: payload.bank_name
        })
      );
    }, 5000);
  } catch (err) {
    console.log(err);
    dispatch(setInstantPaymentAccountFail());
  }
};

export const removeInstantPaymentAccountInit = () => ({
  type: actionType.REMOVE_INSTANT_PAYMENT_ACCOUNT_INIT
});

export const removeInstantPaymentAccountSuccess = () => ({
  type: actionType.REMOVE_INSTANT_PAYMENT_ACCOUNT_SUCCESS
});

export const removeInstantPaymentAccountFail = () => ({
  type: actionType.REMOVE_INSTANT_PAYMENT_ACCOUNT_FAIL
});

export const removeInstantPaymentAccount = event => async (
  dispatch,
  getState
) => {
  dispatch(removeInstantPaymentAccountInit());

  try {
    const docRef = await firestore
      .collection("instant_payment")
      .doc(getState().auth.id)
      .delete();

    toast.success("Account Successfully deleted");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (err) {
    console.log(err);
    dispatch(setInstantPaymentAccountFail());
  }

  //  try {
  //   const snapshot = await firestore
  //    .collection("bank_charge")
  //    .where("id", "==", getState().auth.id)
  //    .get();

  //   const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //   // console.log(data);
  //   if (data.length) {
  //    // dispatch(fetchInstantPaymentAccountSuccess(data[0].data));
  //    const accountsArray = data[0].data;
  //    let filteredArray = accountsArray.filter(
  //     account => account.auth_code !== authCode
  //    );

  //    try {
  //     const docRef = await firestore
  //      .collection("bank_charge")
  //      .doc(getState().auth.id)
  //      .update({
  //       data: filteredArray
  //      });
  //     dispatch(removeInstantPaymentAccountSuccess(docRef));
  //    } catch (err) {
  //     toast.error("Account could not be removed. Please try again");
  //    }
  //    // window.location.reload();

  //    if (accountsArray.length !== filteredArray.length) {
  //     dispatch(fetchInstantPaymentAccountData());
  //     toast.success("Account was removed");
  //    } else {
  //     toast.error("Account was not removed");
  //    }
  //   } else {
  //    // dispatch(fetchInstantPaymentAccountFail());
  //   }
  //  } catch (err) {
  //   console.log("Error...", err);
  //   dispatch(removeInstantPaymentAccountFail());
  //  }
};
