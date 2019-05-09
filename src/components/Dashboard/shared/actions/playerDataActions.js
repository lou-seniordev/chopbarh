import * as actionType from "../../../../store/actionTypes/actionTypes";

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
  fetch(
    "https://c373328ysyuR.preview.gamesparks.net/rs/debug/AtfFvlREyWLhhmtWKbG13ASCyTCLLlm5/LogEventRequest",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postRequestData)
    }
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      dispatch(fetchPlayerSuccess(data.scriptData.PlayerData));
    })
    .catch(err => {
      dispatch(fetchPlayerFail());
    });
};
