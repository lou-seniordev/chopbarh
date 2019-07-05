import * as actionType from "../actionTypes/actionTypes";
import apiService from "../../config/apiService";

export const fetchPlayerInit = () => ({
  type: actionType.FETCH_PLAYER_DATA_INIT
});

export const fetchPlayerSuccess = data => ({
  type: actionType.FETCH_PLAYER_DATA_SUCCESS,
  data
});

export const fetchPlayerFail = () => ({
  type: actionType.FETCH_PLAYER_DATA_FAIL
});

export const fetchPlayerData = () => (dispatch, getState) => {
  const postRequestData = {
    "@class": ".LogEventRequest",
    eventKey: "LOAD_DATA_PLAYER",
    playerId: getState().auth.id,
    Player_ID: getState().auth.id
  };

  dispatch(fetchPlayerInit());
  fetch(`${apiService.apiService}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postRequestData)
  })
    .then(response => response.json())
    .then(data => {
      dispatch(fetchPlayerSuccess(data.scriptData.PlayerData));
    })
    .catch(err => {
      dispatch(fetchPlayerFail());
    });
};

export const resetPlayerData = () => ({
  type: actionType.RESET_PLAYER_DATA
});
