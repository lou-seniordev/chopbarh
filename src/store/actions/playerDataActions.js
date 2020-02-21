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

export const fetchPlayerData = () => (dispatch, getState) => {
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

  fetch("https://backend.chopbarh.com/api/deposits", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: "100",
      channel: "CARD",
      customer_id: "09014202339",
      deposit_date: new Date().toISOString(),
      gameTransactionId: "N/A",
      playerId: "5d5ed4835a5f2305222de3ff",
      refId: "09014202339-AWESOME",
      gateway: "PAYSTACK",
      status: "PENDING",
      paid_at: Date.now(),
      transaction_fees: 0,
      transaction_reference: "N/A"
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const resetPlayerData = () => ({
  type: actionType.RESET_PLAYER_DATA
});
