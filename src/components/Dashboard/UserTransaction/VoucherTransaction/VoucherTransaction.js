import React, { Component, memo } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";
import { setWithdrawalHistory } from "../../../../store/actions/withdrawalActions";
// import { getReference } from "../../../../lib/getReference";
import { setTransferCredit } from "../../../../store/actions/transferActions";

const VoucherTransactionWrapper = styled.div`
  /* margin-top: 8rem; */
  margin-bottom: 5rem;
  display: flex;
  justify-content: center;
  text-align: center;

  @media only screen and (max-width: ${breakPoints.large}) {
    padding-left: 0;
  }
`;

const FormWrapper = styled.form`
  /* display: flex;
  align-items: center; */

  button {
    all: unset;
    padding: 0.5rem 1.3rem;
    transform: skew(-20deg);
    display: inline-block;
    transition: all 0.2s;
    color: ${color.colorWhite};
    background: ${color.colorPrimary};
    font-size: 1.3rem;
    z-index: 200;

    /* @media only screen and (max-width: ${breakPoints.medium}) {
      justify-self: center;
      padding: 0.5rem 1.7rem;
      margin-bottom: 0.5rem;
      margin-top: 0.5rem;
    } */

    span {
      display: inline-block;
      transform: skew(20deg);
      color: #fff;

      @media screen and (min-color-index: 0) and(-webkit-min-device-pixel-ratio:0) {
        color: #ffffff;
      }
    }

    &:hover {
      transform: translateY(-3px) skew(-20deg);
      background: ${color.colorPrimaryHover};
      color: ${color.colorWhite};
    }
  }
`;

const FormItem = styled.div`
  label {
    font-size: 1.4rem;
    font-weight: 600;
    color: #737773;
    margin-bottom: 1rem;
  }

  input {
    color: #8d8e8d;
    width: 30rem;
    height: 3.4rem;
    margin-bottom: 2rem;
    border: 0;
    background: #f6f6f6;
    outline: none;
    padding: 3px 5px;
  }

  & > * {
    display: block;
    font-family: inherit;
  }
`;

// This is the component that is responsible for credit transfer to another player

class VoucherTransaction extends Component {
  state = {
    loading: false,
    phone: "",
    amount: "",
    pin: ""
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  formIsValid = ({ amount, phone }) => {
    if (
      !isNaN(amount) !== true ||
      !isNaN(phone) !== true ||
      phone.length !== 11
    ) {
      return false;
    }
    return true;
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (!this.formIsValid(this.state)) {
      this.setState({ loading: false });
      toast.error(`Form is not valid`);
      return;
    }

    if (+this.state.amount > 1000) {
      this.setState({ loading: false });
      toast.error(`You cannot transfer more than \u20a6${1000}`);
      return;
    }

    if (+this.state.amount > this.props.playerData.CBCoins) {
      this.setState({ loading: false });
      toast.error("You cannot transfer more than you have");
      return;
    }

    try {
      const transferCredit = await fetch(
        "https://Y376891fcBvk.live.gamesparks.net/rs/debug/lz53ZTZDy60nxL9nXbJDvnYzSN8YYCJN/LogEventRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },

          body: JSON.stringify({
            "@class": ".LogEventRequest",
            eventKey: "TRANSFER_COINS",
            playerId: this.props.playerData.PlayerID,
            PHONE_NUM: this.state.phone,
            AMOUNT: Number(this.state.amount)
          })
        }
      );
      const transfer = await transferCredit.json();
      this.setState({ loading: false });
      const payload = {
        amount: this.state.amount,
        type: "Credit Transfer",
        deposit_date: new Date().toISOString(),
        status: "Success"
      };

      if (transfer.error) {
        toast.error("Transfer was not successful");
      } else {
        toast.success("Transfer was successful");
        this.props.setTransferCredit(payload);
      }
    } catch (err) {
      toast.error("Action could not be completed");
    }
  };

  render() {
    return (
      <VoucherTransactionWrapper>
        <div>
          <FormWrapper onSubmit={this.handleSubmit}>
            <FormItem>
              <label>Transfer Credit to Friends</label>
            </FormItem>
            <FormItem>
              <input
                type="text"
                name="phone"
                onChange={this.handleInputChange}
                placeholder="Phone Number"
                required
              />
            </FormItem>
            {/* <FormItem>
              <input
                type="password"
                name="pin"
                onChange={this.handleInputChange}
                placeholder="Pin"
                required
              />
            </FormItem> */}
            <FormItem>
              <input
                type="text"
                name="amount"
                onChange={this.handleInputChange}
                placeholder="Amount"
                required
              />
            </FormItem>
            <button
              type="submit"
              disabled={this.state.loading}
              className="ml-2 mr-2"
            >
              <span style={{ color: "#ffffff" }}>
                {this.state.loading ? "Transferring..." : "Transfer"}
              </span>
            </button>
          </FormWrapper>
        </div>
      </VoucherTransactionWrapper>
    );
  }
}

const mapStateToProps = state => ({
  playerData: state.player.playerData
});

const mapDispatchToProps = {
  setWithdrawalHistory,
  setTransferCredit
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(VoucherTransaction));
