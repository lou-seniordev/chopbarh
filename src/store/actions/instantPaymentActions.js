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
   .doc(getState().auth.id)
   .get();

  const data = snapshot.data();
  //   console.log(snapshot.data(), getState().auth.id);
  //   if (data.length) {
  if (!Object.keys(data).length) {
   dispatch(fetchInstantPaymentAccountFail());
  } else {
   dispatch(fetchInstantPaymentAccountSuccess(data));
  }
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
