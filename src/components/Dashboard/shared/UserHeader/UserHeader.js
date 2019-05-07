import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import colors from "../../../styles/colors";
import Logo from "../../../UI/Logo/Logo";
import Icon from "../Icon/Icon";
import CoinSymbol from "../../../assets/svg/CoinSymbol.svg";
import VisibilityButton from "../../../assets/svg/VisibilityButton.svg";
import CashIcon from "../../../assets/svg/CashIcon.svg";
import { AppContext } from "../../../../hoc/AppContext";

const HeaderWrapper = styled.div`
  background: ${colors.colorGrayDarkOne};
  min-height: 6rem;
  padding: 0.4rem 2rem;
  position: relative;
  z-index: 300;
  text-align: left !important;

  a {
    font-size: 1.35rem;
  }
`;

export default function UserHeader() {
  // const [coinValue, setCoinValue] = useState(null);
  // const [moneyValue, setMoneyValue] = useState(null);
  // const [displayName, setdisplayName] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  // const postRequestData = {
  //   "@class": ".LogEventRequest",
  //   eventKey: "LOAD_DATA_PLAYER",
  //   playerId: localStorage.getItem("chopbarh-id")
  //     ? localStorage.getItem("chopbarh-id")
  //     : null,
  //   Player_ID: localStorage.getItem("chopbarh-id")
  //     ? localStorage.getItem("chopbarh-id")
  //     : null
  // };

  // useEffect(() => {
  //   axios(
  //     "https://c373328ysyuR.preview.gamesparks.net/rs/debug/AtfFvlREyWLhhmtWKbG13ASCyTCLLlm5/LogEventRequest",
  //     {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       data: postRequestData
  //     }
  //   ).then(response => {
  //     if (response.data.error) {
  //       setIsLoading(false);
  //     } else {
  //       const result = response.data.scriptData.PlayerData;
  //       setIsLoading(false);
  //       setCoinValue(result.CBCoins);
  //       setMoneyValue(result.RealCoins);
  //       setdisplayName(result.DisplayName);
  //     }
  //   });
  // }, []);
  return (
    <HeaderWrapper>
      <nav
        className="navbar navbar-expand-lg navbar-expand-md navbar-dark mt-2"
        role="navigation"
      >
        <Link className="navbar-brand navbar-logo mt-n4" to="/">
          <Logo />
        </Link>
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <AppContext.Consumer>
          {({ userGameData }) => {
            if (userGameData !== null) {
              return (
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav mr-auto" />
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link text-uppercase mr-5">
                        <Icon icon={CoinSymbol} height="15" />
                        {new Intl.NumberFormat().format(userGameData.CBCoins)}
                        <Icon icon={VisibilityButton} height="10" />
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-uppercase mr-5">
                        <Icon icon={CashIcon} height="18" />
                        &#8358;
                        {new Intl.NumberFormat().format(userGameData.RealCoins)}
                        <Icon icon={VisibilityButton} height="10" />
                      </Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle text-uppercase"
                        href="drop"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {userGameData.DisplayName}
                      </a>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <Link className="dropdown-item" to="profile">
                          User Profile
                        </Link>
                        <Link className="dropdown-item" to="edit-profile">
                          Edit Profile
                        </Link>
                        <Link className="dropdown-item" to="logout">
                          Logout
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              );
            }
            return (
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto" />
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link text-uppercase mr-5">
                      <Spinner />
                    </Link>
                  </li>
                </ul>
              </div>
            );
          }}
        </AppContext.Consumer>
      </nav>
    </HeaderWrapper>
  );
}
