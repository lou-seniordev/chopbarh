export const increaseCoinBalance = amount => {
  return fetch(
    "https://c373328ysyuR.preview.gamesparks.net/rs/debug/AtfFvlREyWLhhmtWKbG13ASCyTCLLlm5/LogEventRequest",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "@class": ".LogEventRequest",
        eventKey: "PLAYER_COINS_UPDATE",
        playerId: localStorage.getItem("chopbarh-id")
          ? localStorage.getItem("chopbarh-id")
          : null,
        Coins: amount,
        Condition: 1
      })
    }
  );
};
