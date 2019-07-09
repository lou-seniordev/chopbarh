import { toast } from "react-toastify";

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
    // console.log(data);
    if (data.length) {
      dispatch(fetchCreditCardSuccess(data[0].data));
    } else {
      dispatch(fetchCreditCardFail());
    }
  } catch (err) {
    console.log("Error...", err);
    dispatch(fetchCreditCardFail());
  }
};

export const setCreditCardCVV = cvv => ({
  type: actionType.SET_CREDIT_CARD_CVV,
  cvv
});

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

export const setCreditCardData = payload => async (dispatch, getState) => {
  dispatch(setCreditCardInit());

  try {
    const snapshot = await firestore
      .collection("card_charge")
      .where("id", "==", getState().auth.id)
      .get();

    const creditCards = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    if (creditCards.length) {
      // Check if it exists already
      const cardExists = getState().creditCard.creditCard.filter(
        card => card.last_digits === payload.last4
      );

      console.log(cardExists);

      if (cardExists.length) {
      } else {
        const docRef = await firestore
          .collection("card_charge")
          .doc(getState().auth.id)
          .update({
            data: firebase.firestore.FieldValue.arrayUnion({
              auth_code: payload.authorization_code,
              card_type: payload.brand,
              exp_month: payload.exp_month,
              exp_year: payload.exp_year,
              last_digits: payload.last4,
              cvv: payload.cvv
            })
          });
        console.log(docRef);
      }
    } else {
      const docRef = await firestore
        .collection("card_charge")
        .doc(getState().auth.id)
        .set({
          id: getState().auth.id,
          data: [
            {
              auth_code: payload.authorization_code,
              card_type: payload.card_type,
              exp_month: payload.exp_month,
              exp_year: payload.exp_year,
              last_digits: payload.last4,
              cvv: payload.cvv
            }
          ]
        });

      console.log(docRef);
    }
  } catch (err) {
    console.log("Error Setting new Card", err);
    dispatch(setCreditCardFail());
  }
};

export const removeCreditCardInit = () => ({
  type: actionType.REMOVE_CREDIT_CARD_INIT
});

export const removeCreditCardSuccess = () => ({
  type: actionType.REMOVE_CREDIT_CARD_SUCCESS
});

export const removeCreditCardFail = () => ({
  type: actionType.REMOVE_CREDIT_CARD_FAIL
});

export const removeCreditCard = (event, authCode) => async (
  dispatch,
  getState
) => {
  dispatch(removeCreditCardInit());

  try {
    const snapshot = await firestore
      .collection("card_charge")
      .where("id", "==", getState().auth.id)
      .get();

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // console.log(data);
    if (data.length) {
      // dispatch(fetchCreditCardSuccess(data[0].data));
      const cardsArray = data[0].data;
      let filteredArray = cardsArray.filter(
        card => card.auth_code !== authCode
      );

      try {
        const docRef = await firestore
          .collection("card_charge")
          .doc(getState().auth.id)
          .update({
            data: filteredArray
          });

        toast.success("Card was removed");
        dispatch(fetchCreditCardData());
        window.location.reload();
      } catch (err) {
        toast.error("Card could not be removed. Please try again");
        // console.log("Error Setting new Card", err);
        // dispatch(setCreditCardFail());
      }
    } else {
      // dispatch(fetchCreditCardFail());
    }
  } catch (err) {
    console.log("Error...", err);
    dispatch(removeCreditCardFail());
  }
};
