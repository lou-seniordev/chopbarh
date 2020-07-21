import { toast } from "react-toastify";

import * as actionType from "../actionTypes/actionTypes";
import { firestore } from "../../firebase";

export const fetchRaveCardInit = () => ({
  type: actionType.FETCH_RAVE_CARD_INIT,
});

export const fetchRaveCardSuccess = data => ({
  type: actionType.FETCH_RAVE_CARD_SUCCESS,
  data,
});

export const fetchRaveCardFail = () => ({
  type: actionType.FETCH_RAVE_CARD_FAIL,
});

export const fetchRaveCardData = () => async (dispatch, getState) => {
  dispatch(fetchRaveCardInit());

  try {
    const snapshot = await firestore
      .collection("rave_card")
      .where("playerId", "==", getState().auth.id)
      .get();

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // console.log(data);
    if (data.length) {
      dispatch(fetchRaveCardSuccess(data));
    } else {
      dispatch(fetchRaveCardFail());
    }
  } catch (err) {
    dispatch(fetchRaveCardFail());
  }
};

export const removeRaveCardInit = () => ({
  type: actionType.REMOVE_RAVE_CARD_INIT,
});

export const removeRaveCardSuccess = () => ({
  type: actionType.REMOVE_RAVE_CARD_SUCCESS,
});

export const removeRaveCardFail = () => ({
  type: actionType.REMOVE_RAVE_CARD_FAIL,
});

const resetRaveCard = () => ({
  type: actionType.RESET_RAVE_CARD,
});

export const removeRaveCard = (event, authCode) => async (
  dispatch,
  getState
) => {
  dispatch(removeRaveCardInit());

  const raveCardIdToBeRemoved = getState().raveCard.raveCard.filter(
    card => card.auth_code === authCode
  );

  if (raveCardIdToBeRemoved.length) {
    try {
      const raveCardRemovalResponse = await (
        await fetch(
          `https://backend.chopbarh.com/api/cards/rave/${getState().auth.id}`,
          {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "api-key": process.env.REACT_APP_API_KEY_PROD,
            },
            body: JSON.stringify({
              auth_code: authCode,
              playerId: getState().auth.id,
            }),
          }
        )
      ).json();

      if (raveCardRemovalResponse.status === true) {
        await firestore
          .collection("rave_card")
          .doc(raveCardIdToBeRemoved[0].id)
          .delete();
        dispatch(resetRaveCard());
        toast.success("Card was removed");
        dispatch(fetchRaveCardData());
      } else {
        toast.error("Card was not successfully removed");
      }
    } catch (err) {
      // console.log("Error...", err);
      toast.error("Card was not successfully removed");
      dispatch(removeRaveCardFail());
    }
  } else {
    toast.error(
      "An error occured while trying to remove this account. Please try again later"
    );
  }
};
