import * as actionType from "../../../../store/actionTypes/actionTypes";
import { fetchPlayerData } from "./playerDataActions";

export const setCashBalanceInit = () => ({
  type: actionType.SET_CASH_BALANCE_INIT
});

export const setCashBalanceSuccess = cashValue => ({
  type: actionType.SET_CASH_BALANCE_SUCCESS,
  cashValue
});

export const setCashBalanceFail = () => ({
  type: actionType.SET_CASH_BALANCE_FAIL
});

export const setCashBalance = (amount, condition = 1) => (
  dispatch,
  getState
) => {
  dispatch(setCashBalanceInit());
  fetch(
    "https://c373328ysyuR.preview.gamesparks.net/rs/debug/AtfFvlREyWLhhmtWKbG13ASCyTCLLlm5/LogEventRequest",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "@class": ".LogEventRequest",
        eventKey: "PLAYER_CASH_UPDATE",
        playerId: getState().auth.id,
        Cash: amount,
        Condition: condition
      })
    }
  )
    .then(response => response.json())
    .then(data => {
      dispatch(setCashBalanceSuccess(amount));
      dispatch(fetchPlayerData());
    })
    .catch(err => {
      dispatch(setCashBalanceFail());
    });
};
