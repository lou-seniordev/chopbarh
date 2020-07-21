import * as actionType from "../actionTypes/actionTypes";
import firebase from "../../firebase";
import { toast } from "react-toastify";

export const fetchPlayerInit = () => ({
  type: actionType.FETCH_PLAYER_DATA_INIT,
});

export const fetchPlayerSuccess = data => ({
  type: actionType.FETCH_PLAYER_DATA_SUCCESS,
  data,
});

export const fetchPlayerFail = () => ({
  type: actionType.FETCH_PLAYER_DATA_FAIL,
});

export const fetchPlayerData = () => async (dispatch, getState) => {
  dispatch(fetchPlayerInit());

  const idToken = await firebase.auth().currentUser.getIdToken();
  const user = firebase.auth().currentUser;

  if (user) {
    fetch(
      "https://us-central1-dev-sample-31348.cloudfunctions.net/userProfileUtil/profile/get",
      {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          playerId: localStorage.getItem("chopbarh-id"),
        }),
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data.status === true) {
          dispatch(fetchPlayerSuccess(data.data));
        } else {
          dispatch(fetchPlayerFail());
          toast.error("There was a network error. Please, sign in again");
          setTimeout(() => {
            window.location = "/";
          }, 5000);
        }
      })
      .catch(err => {
        dispatch(fetchPlayerFail());
      });
  } else {
    window.location = "/";
  }
};

export const resetPlayerData = () => ({
  type: actionType.RESET_PLAYER_DATA,
});
