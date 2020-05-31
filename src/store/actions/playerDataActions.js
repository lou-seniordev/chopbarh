import * as actionType from "../actionTypes/actionTypes";

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

  fetch("https://pay.chopbarh.com/ng/api/get_user_profile", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      apiKey: process.env.REACT_APP_API_KEY,
    },
    body: JSON.stringify({
      playerId: localStorage.getItem("chopbarh-id"),
      token: localStorage.getItem("chopbarh-token"),
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === true) {
        dispatch(fetchPlayerSuccess(data.data));
      } else {
        dispatch(fetchPlayerFail());
      }
    })
    .catch(err => {
      dispatch(fetchPlayerFail());
    });
};

export const resetPlayerData = () => ({
  type: actionType.RESET_PLAYER_DATA,
});
