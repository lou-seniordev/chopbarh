import React, { Component, memo } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";
import { setCoinBalance } from "../../../../store/actions/coinBalanceActions";
import { setWithdrawalHistory } from "../../../../store/actions/withdrawalActions";
// import { getReference } from "../../../../lib/getReference";
// import firebase, { firestore } from "../../../../firebase";

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
    amount: ""
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

    // if (this.state.amount > this.props.playerData.RealCoins) {
    //   this.setState({ loading: false });
    //   toast.error("You cannot transfer more than you have");
    //   return;
    // }

    // const payload = {
    //   ...this.state
    // };

    // // Get the user with the number
    // try {
    //   const playerDataResponse = await fetch(
    //     "https://Y376891fcBvk.live.gamesparks.net/rs/debug/lz53ZTZDy60nxL9nXbJDvnYzSN8YYCJN/LogEventRequest",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json"
    //       },
    //       body: JSON.stringify({
    //         "@class": ".LogEventRequest",
    //         eventKey: "ANALYTICS_PLAYER_DATA_VIA_PHONE",
    //         playerId: "5ceab8bada4bd40515df67a0",
    //         PHONE_NUM: payload.phone
    //       })
    //     }
    //   );
    //   const playerData = await playerDataResponse.json();

    //   if (playerData.scriptData.results.length) {
    //     const playerId = playerData.scriptData.results[0].PlayerID;
    //     const historyObject = {
    //       status: "Success",
    //       amount: payload.amount,
    //       date: new Date().toISOString(),
    //       reference: getReference(),
    //       fee: 0,
    //       channel: "Credit Transfer"
    //     };
    //     // Reduce Coin Balance
    //     this.props.setCoinBalance(payload.amount, 2);
    //     // Add to history
    //     this.props.setWithdrawalHistory(historyObject);
    //     this.setState({ loading: false, phone: "", amount: "" });
    //     toast.success("Credit was transferred successfully");
    //     try {
    //       // Increase their coin balance
    //       const data = await fetch(
    //         "https://Y376891fcBvk.live.gamesparks.net/rs/debug/lz53ZTZDy60nxL9nXbJDvnYzSN8YYCJN/LogEventRequest",
    //         {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json"
    //           },
    //           body: JSON.stringify({
    //             "@class": ".LogEventRequest",
    //             eventKey: "PLAYER_COINS_UPDATE",
    //             playerId: playerId,
    //             Coins: payload.amount,
    //             Condition: 1
    //           })
    //         }
    //       );

    //       try {
    //         const snapshot = await firestore
    //           .collection("deposits")
    //           .where("id", "==", playerId)
    //           .get();

    //         const deposits = snapshot.docs.map(doc => ({
    //           id: doc.id,
    //           ...doc.data()
    //         }));

    //         if (deposits.length) {
    //           const docRef = await firestore
    //             .collection("deposits")
    //             .doc(playerId)
    //             .update({
    //               data: firebase.firestore.FieldValue.arrayUnion({
    //                 amount: historyObject.amount,
    //                 channel: historyObject.channel,
    //                 deposit_date: historyObject.date,
    //                 paid_at: historyObject.date,
    //                 transaction_fees: historyObject.fee,
    //                 transaction_reference: historyObject.reference,
    //                 status: historyObject.status
    //               })
    //             });
    //         } else {
    //           const docRef = await firestore
    //             .collection("deposits")
    //             .doc(playerId)
    //             .set({
    //               id: playerId,
    //               data: [
    //                 {
    //                   amount: historyObject.amount,
    //                   channel: historyObject.channel,
    //                   deposit_date: historyObject.date,
    //                   paid_at: historyObject.date,
    //                   transaction_fees: historyObject.fee,
    //                   transaction_reference: historyObject.reference,
    //                   status: historyObject.status
    //                 }
    //               ]
    //             });
    //         }
    //       } catch (err) {}
    //     } catch (err) {}
    //   } else {
    //     toast.error("User with the phone number not found");
    //     return;
    //   }
    // } catch (err) {
    //   console.log(err);
    //   toast.error("Transfer could not be completed");
    // }
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
            <FormItem>
              <input type="password" placeholder="Pin" />
            </FormItem>
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
              <span>{this.state.loading ? "Transferring..." : "Transfer"}</span>
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
  setCoinBalance,
  setWithdrawalHistory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(VoucherTransaction));
