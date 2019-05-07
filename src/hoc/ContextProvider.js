import React, { Component } from "react";
import axios from "axios";
import { AppContext } from "./AppContext";

const fetchData = () => {
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

  return axios(
    "https://c373328ysyuR.preview.gamesparks.net/rs/debug/AtfFvlREyWLhhmtWKbG13ASCyTCLLlm5/LogEventRequest",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: postRequestData
    }
  );
};
export default class ContextProvider extends Component {
  state = {
    auth: localStorage.getItem("chopbarh-token") !== null,
    userInfo: null,
    userGameData: null,
    dataLoading: true,
    coinValue: null
  };

  componentDidMount = () => {
    if (localStorage.getItem("chopbarh-id")) {
      fetchData().then(response => {
        if (response.data.error) {
          this.setState({ dataLoading: false });
        } else {
          this.setState({
            userGameData: response.data.scriptData.PlayerData,
            dataLoading: false
          });
        }
      });
    }
    // Handle possible error case here
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log("Props Changed...");
    if (prevProps !== this.props) {
      fetchData().then(response => {
        if (response.data.error) {
          this.setState({ dataLoading: false });
        } else {
          this.setState({
            userGameData: response.data.scriptData.PlayerData,
            dataLoading: false
          });
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

  setCoinValue = coinValue => {
    fetchData().then(response => {
      if (response.data.error) {
        this.setState({ dataLoading: false });
      } else {
        this.setState({
          userGameData: response.data.scriptData.PlayerData,
          dataLoading: false,
          coinValue
        });
      }
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          authenticated: this.state.auth,
          authUpdate: this.authUpdate,
          setUserInfo: this.setUserInfo,
          getUserInfo: this.state.userInfo,
          userGameData: this.state.userGameData,
          dataLoading: this.state.dataLoading,
          setCoinValue: this.setCoinValue
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
