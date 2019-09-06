import { toast } from "react-toastify";

import * as actionType from "../actionTypes/actionTypes";
import { firestore } from "../../firebase";

export const fetchRaveCardInit = () => ({
  type: actionType.FETCH_RAVE_CARD_INIT
});

export const fetchRaveCardSuccess = data => ({
  type: actionType.FETCH_RAVE_CARD_SUCCESS,
  data
});

export const fetchRaveCardFail = () => ({
  type: actionType.FETCH_RAVE_CARD_FAIL
});

export const fetchRaveCardData = () => async (dispatch, getState) => {
  dispatch(fetchRaveCardInit());

  try {
    const snapshot = await firestore
      .collection("rave_card")
      .where("id", "==", getState().auth.id)
      .get();

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // console.log(data);
    if (data.length) {
      dispatch(fetchRaveCardSuccess(data[0].data));
      console.log(data[0].data);
    } else {
      dispatch(fetchRaveCardFail());
    }
  } catch (err) {
    console.log("Error...", err);
    dispatch(fetchRaveCardFail());
  }
};

export const removeRaveCardInit = () => ({
  type: actionType.REMOVE_RAVE_CARD_INIT
});

export const removeRaveCardSuccess = () => ({
  type: actionType.REMOVE_RAVE_CARD_SUCCESS
});

export const removeRaveCardFail = () => ({
  type: actionType.REMOVE_RAVE_CARD_FAIL
});

export const removeRaveCard = (event, authCode) => async (
  dispatch,
  getState
) => {
  dispatch(removeRaveCardInit());

  try {
    const snapshot = await firestore
      .collection("rave_card")
      .where("id", "==", getState().auth.id)
      .get();

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // console.log(data);
    if (data.length) {
      // dispatch(fetchRaveCardSuccess(data[0].data));
      const cardsArray = data[0].data;
      let filteredArray = cardsArray.filter(
        card => card.auth_code !== authCode
      );

      try {
        const docRef = await firestore
          .collection("rave_card")
          .doc(getState().auth.id)
          .update({
            data: filteredArray
          });
        dispatch(removeRaveCardSuccess(docRef));
      } catch (err) {
        toast.error("Card could not be removed. Please try again");
        // console.log("Error Setting new Card", err);
        // dispatch(setRaveCardFail());
      }
      // window.location.reload();
      if (cardsArray.length !== filteredArray.length) {
        dispatch(fetchRaveCardData());
        toast.success("Card was removed");
      } else {
        toast.error("Card was not removed");
      }
    } else {
      // dispatch(fetchRaveCardFail());
    }
  } catch (err) {
    console.log("Error...", err);
    dispatch(removeRaveCardFail());
  }
};
