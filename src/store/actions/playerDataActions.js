import * as actionType from "../actionTypes/actionTypes";

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

export const fetchPlayerData = () => async (dispatch, getState) => {
  dispatch(fetchPlayerInit());

  fetch("https://chopbarh-api.nutod.repl.co/api/get_user_profile", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ playerId: getState().auth.id })
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

  // fetch(
  //   "https://cors-anywhere.herokuapp.com/https://backend.chopbarh.com/api/player/get",
  //   {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       "api-key": process.env.REACT_APP_API_KEY
  //     },
  //     body: JSON.stringify({
  //       phone_number: "09014202339"
  //     })
  //   }
  // )
  //   .then(response => response.json())
  //   .then(data => {})
  //   .catch(err => {
  //     console.log(err);
  //   });

  // fetch("https://backend.chopbarh.com/api/player/get", {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     "api-key": process.env.REACT_APP_API_KEY
  //   },
  //   body: JSON.stringify({
  //     phone_number: "09014202339"
  //   })
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
};

export const resetPlayerData = () => ({
  type: actionType.RESET_PLAYER_DATA
});
