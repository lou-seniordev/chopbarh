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
};

export const resetPlayerData = () => ({
	type: actionType.RESET_PLAYER_DATA
});
