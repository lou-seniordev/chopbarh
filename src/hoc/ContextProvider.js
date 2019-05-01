import React, { Component } from "react";
import axios from "axios";
import { AppContext } from "./AppContext";

export default class ContextProvider extends Component {
  state = {
    auth: localStorage.getItem("chopbarh-token") !== null,
    userInfo: {
      displayName: "Nutod"
    },
    userGameData: null
  };

  componentDidMount = () => {
    if (localStorage.getItem("chopbarh-id")) {
      const postRequestData = {
        "@class": ".LogEventRequest",
        eventKey: "LOAD_DATA_PLAYER",
        playerId: localStorage.getItem("chopbarh-id")
          ? localStorage.getItem("chopbarh-id")
          : null,
        Player_ID: localStorage.getItem("chopbarh-id")
          ? localStorage.getItem("chopbarh-id")
          : null
      };

      axios(
        "https://c373328ysyuR.preview.gamesparks.net/rs/debug/AtfFvlREyWLhhmtWKbG13ASCyTCLLlm5/LogEventRequest",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          data: postRequestData
        }
      ).then(response => {
        if (response.data.error) {
        } else {
          console.log(response);
          this.setState({ userGameData: response.data.scriptData.PlayerData });
        }
      });
    }
  };

  authUpdate = () => {
    this.setState({ auth: localStorage.getItem("chopbarh-token") !== null });
  };

  setUserInfo = userInfo => {
    this.setState({ userInfo });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          authenticated: this.state.auth,
          authUpdate: this.authUpdate,
          setUserInfo: this.setUserInfo,
          getUserInfo: this.state.userInfo,
          getUserGameData: this.state.userGameData
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
