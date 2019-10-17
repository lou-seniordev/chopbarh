import * as actionType from "../actionTypes/actionTypes";
import firebase, { firestore } from "../../firebase";

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
   .where("id", "==", getState().auth.id)
   .get();

  const data = snapshot.docs.map(doc => ({ ...doc.data() }));
  console.log(data);
  //   if (data.length) {
  //    dispatch(fetchInstantPaymentAccountSuccess(data[0].data));
  //   } else {
  //    dispatch(fetchInstantPaymentAccountFail());
  //   }
 } catch (err) {
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
    account_number: payload.account_number
   });

  dispatch(fetchBankAccountData());
 } catch (err) {
  dispatch(setInstantPaymentAccountFail());
 }
};
