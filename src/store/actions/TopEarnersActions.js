import * as actionType from "../actionTypes/actionTypes";
import apiService from "../../config/apiService";

export const fetchTopEarnersStart = () => ({
  type: actionType.FETCH_TOP_EARNERS_INIT
});

export const fetchTopEarnersSuccess = data => ({
  type: actionType.FETCH_TOP_EARNERS_SUCCESS,
  data
});

export const fetchTopEarnersFail = () => ({
  type: actionType.FETCH_TOP_EARNERS_FAIL
});

export const fetchTopEarners = () => (dispatch, getState) => {
  const postRequestData = {
    "@class": ".LogEventRequest",
    eventKey: "ANALYTICS_TOP_EARNERS",
    playerId: getState().auth.id
  };

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
      if (data.error) {
        dispatch(fetchTopEarnersFail());
      } else {
        dispatch(fetchTopEarnersSuccess(data.scriptData.RESULTS));
      }
    })
    .catch(err => {
      dispatch(fetchTopEarnersFail());
    });
};
