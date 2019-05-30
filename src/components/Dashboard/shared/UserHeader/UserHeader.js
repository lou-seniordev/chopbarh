import React, { Component, memo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import colors from "../../../styles/colors";
import Logo from "../../../UI/Logo/Logo";
import Icon from "../Icon/Icon";
import CoinSymbol from "../../../assets/svg/CoinSymbol.svg";
import VisibilityButton from "../../../assets/svg/VisibilityButton.svg";
import CashIcon from "../../../assets/svg/CashIcon.svg";
import { fetchPlayerData } from "../../../../store/actions/playerDataActions";

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

class UserHeader extends Component {
  state = {
    showBalance: true
  };

  componentDidMount = () => {
    if (!this.props.isPlayerDataAvailable) {
      this.props.fetchPlayerData();
    }
  };

  toggleBalanceVisibility = () => {
    this.setState({ showBalance: !this.state.showBalance });
  };

  render() {
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
          {this.props.loading ? (
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto" />
              <ul className="navbar-nav">
                <li className="nav-item">
                  <span className="nav-link text-uppercase mr-5">
                    <Spinner />
                  </span>
                </li>
              </ul>
            </div>
          ) : (
            <>
              {!this.props.error ? (
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav mr-auto" />
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <span className="nav-link text-uppercase mr-5">
                        <Icon icon={CoinSymbol} height="15" />
                        {new Intl.NumberFormat().format(
                          this.props.playerData.CBCoins
                        )}
                        <Icon icon={VisibilityButton} height="10" />
                      </span>
                    </li>
                    <li className="nav-item">
                      <span className="nav-link text-uppercase mr-5">
                        <Icon icon={CashIcon} height="18" />
                        &#8358;
                        {new Intl.NumberFormat().format(
                          this.props.playerData.RealCoins
                        )}
                        <Icon icon={VisibilityButton} height="10" />
                      </span>
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
                        {this.props.playerData.DisplayName ||
                          this.props.playerData.FullName}
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-right"
                        aria-labelledby="navbarDropdown"
                      >
                        <Link className="dropdown-item" to="edit-profile">
                          Edit Profile
                        </Link>
                        <span className="dropdown-item" to="edit-profile">
                          {this.state.showBalance ? "Hide" : "Show"} Balance
                        </span>
                        <Link className="dropdown-item" to="logout">
                          Logout
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              ) : (
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav mr-auto" />
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <span className="nav-link text-uppercase mr-5">
                        Not Available
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
        </nav>
      </HeaderWrapper>
    );
  }
}

const mapStateToProps = state => ({
  isPlayerDataAvailable: state.player.playerData !== null,
  playerData: state.player.playerData,
  loading: state.player.loading,
  error: state.player.error
});

const mapDispatchToProps = {
  fetchPlayerData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(UserHeader));
