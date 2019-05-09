import * as actionType from '../../../../../store/actionTypes/actionTypes'

export const fetchTopEarnersStart = () => ({
  type: actionType.FETCH_TOP_EARNERS_INIT
})

export const fetchTopEarnersSuccess = () => ({
type: actionType.FETCH_TOP_EARNERS_SUCCESS
})

export const fetchTopEarnersFail = () => ({
type: actionType.FETCH_TOP_EARNERS_FAIL
})

export const fetchTopEarners = () => (dispatch, getState) => ({
  const postRequestData = {
      "@class": ".LogEventRequest",
      eventKey: "ANALYTICS_TOP_EARNERS",
      playerId: getState().auth.id
    };

    fetch(
      "https://c373328ysyuR.preview.gamesparks.net/rs/debug/AtfFvlREyWLhhmtWKbG13ASCyTCLLlm5/LogEventRequest",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        data: JSON.stringify(postRequestData)
      }
    ).then(response => response.json())
      .then(data => {
        if (data.error) {
          dispatch(fetchTopEarnersFail())
        } else {
          dispatch(fetchTopEarnersSuccess())
        }
      })
      .catch(err => {dispatch(fetchTopEarnersFail())});
})

