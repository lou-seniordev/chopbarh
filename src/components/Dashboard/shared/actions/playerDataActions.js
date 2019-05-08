import * as actionType from "../../../../store/actionTypes/actionTypes";

export const fetchPlayerInit = () => ({
  type: actionType.FETCH_PLAYER_DATA_INIT
});

export const fetchPlayerSuccess = () => ({
  type: actionType.FETCH_PLAYER_DATA_SUCCESS
});

export const fetchPlayerFail = () => ({
  type: actionType.FETCH_PLAYER_DATA_FAIL
});

export const fetchPlayer = () => dispatch => {
  fetch()
    .then(response => response.json())
    .then(data => {
      dispatch(fetchPlayerSuccess());
    })
    .catch(err => {
      dispatch(fetchPlayerFail());
    });
};
