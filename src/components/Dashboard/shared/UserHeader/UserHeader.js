import React, { Component, memo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import { Update } from "grommet-icons";
import MediaQuery from "react-responsive";
import colors from "../../../styles/colors";
import Logo from "../../../UI/Logo/Logo";
import Icon from "../Icon/Icon";
import CoinSymbol from "../../../assets/svg/CoinSymbol.svg";
import VisibilityButton from "../../../assets/svg/VisibilityButton.svg";
import CashIcon from "../../../assets/svg/CashIcon.svg";
import Home from "../../../assets/svg/home.svg";
import Deposit from "../../../assets/svg/Deposit.svg";
import Withdrawal from "../../../assets/svg/Withdrawal.svg";
import Play from "../../../assets/svg/Play.svg";
import Transactions from "../../../assets/svg/Transaction.svg";
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
    text-decoration: none;
  }
`;

class UserHeader extends Component {
  state = {
    cashBalance: true,
    coinBalance: true
  };

  componentDidMount = () => {
    if (!this.props.isPlayerDataAvailable) {
      this.props.fetchPlayerData();
    }
  };

  togglecashBalanceVisibility = () => {
    this.setState({ cashBalance: !this.state.cashBalance });
  };

  togglecoinBalanceVisibility = () => {
    this.setState({ coinBalance: !this.state.coinBalance });
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
          <MediaQuery minDeviceWidth={576}>
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
                      <>
                        <li className="nav-item">
                          <span className="nav-link text-uppercase mr-5">
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={this.props.fetchPlayerData}
                              >
                                <Update size="small" color="white" />
                              </span>
                            <Icon icon={CoinSymbol} height="15" />
                            {this.state.coinBalance ? (
                              <>
                                {new Intl.NumberFormat().format(
                                  this.props.playerData.CBCoins
                                )}
                              </>
                            ) : (
                              <>
                                {[
                                  ...new Array(
                                    Number(this.props.playerData.CBCoins)
                                      .toString()
                                      .split("").length
                                  )
                                ].map((item, id) => (
                                  <span key={id}>*</span>
                                ))}
                              </>
                            )}

                            <Icon
                              clicked={this.togglecoinBalanceVisibility}
                              icon={VisibilityButton}
                              height="10"
                            />
                            
                          </span>
                        </li>
                        <li className="nav-item">
                          <span className="nav-link text-uppercase mr-5">
                            <Icon icon={CashIcon} height="18" />
                            {this.state.cashBalance ? (
                              <>
                                &#8358;
                                {new Intl.NumberFormat().format(
                                  this.props.playerData.RealCoins
                                )}
                              </>
                            ) : (
                              <>
                                {[
                                  ...new Array(
                                    Number(this.props.playerData.RealCoins)
                                      .toString()
                                      .split("").length
                                  )
                                ].map((item, id) => (
                                  <span key={id}>*</span>
                                ))}
                              </>
                            )}
                            <Icon
                              clicked={this.togglecashBalanceVisibility}
                              icon={VisibilityButton}
                              height="10"
                            />
                            
                          </span>
                        </li>
                      </>
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
                            Profile
                          </Link>
                          <Link className="dropdown-item" to="change-pin">
                            Change Pin
                          </Link>
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
          </MediaQuery>
          <MediaQuery maxDeviceWidth={576}>
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
                    <ul className="navbar-nav text-center">
                      <>
                        <Link className="" to="user">
                          <Icon icon={Home} height="15" color="#fff" />
                          <span className="nav-link text-uppercase">Home</span>
                        </Link>
                        <Link className="" to="deposit">
                          <Icon icon={Deposit} height="15" color="#fff" />
                          <span className="nav-link text-uppercase">
                            Deposit
                          </span>
                        </Link>
                        <Link className="" to="withdraw">
                          <Icon icon={Withdrawal} height="15" color="#fff" />
                          <span className="nav-link text-uppercase">
                            Withdraw
                          </span>
                        </Link>
                        <Link className="" to="play">
                          <Icon icon={Play} height="15" color="#fff" />
                          <span className="nav-link text-uppercase">Play</span>
                        </Link>
                        <Link className="" to="transaction">
                          <Icon icon={Transactions} height="15" color="#fff" />
                          <span className="nav-link text-uppercase">
                            Transactions
                          </span>
                        </Link>
            
                        <li className="nav-item">
                          <span className="nav-link text-uppercase mr-5">
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={this.props.fetchPlayerData}
                              >
                                <Update size="small" color="white" />
                              </span>
                            <Icon icon={CoinSymbol} height="15" />
                            {this.state.coinBalance ? (
                              <>
                                {new Intl.NumberFormat().format(
                                  this.props.playerData.CBCoins
                                )}
                              </>
                            ) : (
                              <>
                                {[
                                  ...new Array(
                                    Number(this.props.playerData.CBCoins)
                                      .toString()
                                      .split("").length
                                  )
                                ].map((item, id) => (
                                  <span key={id}>*</span>
                                ))}
                              </>
                            )}

                            <Icon
                              clicked={this.togglecoinBalanceVisibility}
                              icon={VisibilityButton}
                              height="10"
                            />
                            
                          </span>
                        </li>
                        <li className="nav-item">
                          <span className="nav-link text-uppercase mr-5">
                            <Icon icon={CashIcon} height="18" />
                            {this.state.cashBalance ? (
                              <>
                                &#8358;
                                {new Intl.NumberFormat().format(
                                  this.props.playerData.RealCoins
                                )}
                              </>
                            ) : (
                              <>
                                {[
                                  ...new Array(
                                    Number(this.props.playerData.RealCoins)
                                      .toString()
                                      .split("").length
                                  )
                                ].map((item, id) => (
                                  <span key={id}>*</span>
                                ))}
                              </>
                            )}
                            <Icon
                              clicked={this.togglecashBalanceVisibility}
                              icon={VisibilityButton}
                              height="10"
                            />
                            
                          </span>
                        </li>
                      </>
                      {/* <li className="nav-item dropdown">
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
                            Profile
                          </Link>
                          <Link className="dropdown-item" to="change-pin">
                            Change Pin
                          </Link>
                          <Link className="dropdown-item" to="logout">
                            Logout
                          </Link>
                        </div>
                      </li> */}
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
                        <span className="nav-link text-center text-uppercase mr-5">
                          Not Available
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </MediaQuery>
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
