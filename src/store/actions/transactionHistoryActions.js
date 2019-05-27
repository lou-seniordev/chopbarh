import * as actionType from "../actionTypes/actionTypes";
import apiService from "../../config/apiService";

export const fetchTransactionHistoryInit = () => ({
  type: actionType.FETCH_TRANSACTION_HISTORY_INIT
});

export const fetchTransactionHistorySuccess = data => ({
  type: actionType.FETCH_TRANSACTION_HISTORY_SUCCESS,
  data
});

export const fetchTransactionHistoryFail = () => ({
  type: actionType.FETCH_TRANSACTION_HISTORY_FAIL
});

export const fetchTransactionHistoryData = () => (dispatch, getState) => {
  const postRequestData = {
    "@class": ".LogEventRequest",
    eventKey: "LOAD_TRANSACTION",
    playerId: getState().auth.id,
    PLAYER_ID: getState().auth.id
  };

  dispatch(fetchTransactionHistoryInit());
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
      dispatch(fetchTransactionHistorySuccess(data.scriptData.RESULTS));
    })
    .catch(err => {
      dispatch(fetchTransactionHistoryFail());
    });
};
