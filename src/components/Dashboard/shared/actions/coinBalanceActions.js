import * as actionType from "../../../../store/actionTypes/actionTypes";
import { fetchPlayerData } from "./playerDataActions";
import apiService from "../../../../config/apiService";

export const setCoinBalanceInit = () => ({
  type: actionType.SET_COIN_BALANCE_INIT
});

export const setCoinBalanceSuccess = coinValue => ({
  type: actionType.SET_COIN_BALANCE_SUCCESS,
  coinValue
});

export const setCoinBalanceFail = () => ({
  type: actionType.SET_COIN_BALANCE_FAIL
});

export const setCoinBalance = (amount, condition = 1) => (
  dispatch,
  getState
) => {
  dispatch(setCoinBalanceInit());
  fetch(`${apiService.apiService}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "@class": ".LogEventRequest",
      eventKey: "PLAYER_COINS_UPDATE",
      playerId: getState().auth.id,
      Coins: amount,
      Condition: condition
    })
  })
    .then(response => response.json())
    .then(data => {
      dispatch(setCoinBalanceSuccess(amount));
      dispatch(fetchPlayerData());
    })
    .catch(err => {
      dispatch(setCoinBalanceFail());
    });
};
