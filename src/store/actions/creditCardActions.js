import * as actionType from "../actionTypes/actionTypes";
import firebase, { firestore } from "../../firebase";

export const fetchCreditCardInit = () => ({
  type: actionType.FETCH_CREDIT_CARD_INIT
});

export const fetchCreditCardSuccess = data => ({
  type: actionType.FETCH_CREDIT_CARD_SUCCESS,
  data
});

export const fetchCreditCardFail = () => ({
  type: actionType.FETCH_CREDIT_CARD_FAIL
});

export const fetchCreditCardData = () => async (dispatch, getState) => {
  dispatch(fetchCreditCardInit());

  try {
    const snapshot = await firestore
      .collection("card_charge")
      .where("id", "==", getState().auth.id)
      .get();

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(data);
    if (data) {
      dispatch(fetchCreditCardSuccess(data[0].data));
    } else {
      dispatch(fetchCreditCardFail());
    }
  } catch (err) {
    console.log("Error...", err);
    dispatch(fetchCreditCardFail());
  }
};

export const setCreditCardInit = () => ({
  type: actionType.SET_CREDIT_CARD_INIT
});

export const setCreditCardSuccess = data => ({
  type: actionType.SET_CREDIT_CARD_SUCCESS,
  data
});

export const setCreditCardFail = () => ({
  type: actionType.SET_CREDIT_CARD_FAIL
});

export const setCreditCardData = () => async (dispatch, getState) => {
  dispatch(setCreditCardInit());

  try {
    const snapshot = await firestore
      .collection("card_charge")
      .where("id", "==", getState().auth.id)
      .get();

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(data);
    // dispatch(setCreditCardSuccess(data[0].data));
  } catch (err) {
    console.log("Error...", err);
    dispatch(setCreditCardFail());
  }
};
