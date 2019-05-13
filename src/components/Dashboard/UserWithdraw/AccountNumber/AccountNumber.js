import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody } from "reactstrap";
import styled from "styled-components";
import { Form, FormItem, HalfColumn } from "../../../styles/CardCharge";
import {
  openTransactionSuccessModal,
  openTransactionFailModal,
  closeTransactionFailModal,
  closeTransactionSuccessModal
} from "../../UserDeposit/actions/modalActions";
import { setCashBalance } from "../../shared/actions/cashBalanceActions";

const FormWrapper = styled(Form)`
  min-height: 20rem;
`;

const Banks = [
  {
    Id: 137,
    Code: "011",
    Name: "First Bank of Nigeria"
  },
  {
    Id: 141,
    Code: "057",
    Name: "Zenith Bank"
  },
  {
    Id: 142,
    Code: "068",
    Name: "Standard Chartered Bank"
  },
  {
    Id: 144,
    Code: "070",
    Name: "Fidelity Bank"
  },
  {
    Id: 145,
    Code: "023",
    Name: "CitiBank"
  },
  {
    Id: 146,
    Code: "215",
    Name: "Unity Bank"
  },
  {
    Id: 151,
    Code: "301",
    Name: "JAIZ Bank"
  },
  {
    Id: 152,
    Code: "050",
    Name: "Ecobank Plc"
  },
  {
    Id: 158,
    Code: "221",
    Name: "Stanbic IBTC Bank"
  },
  {
    Id: 159,
    Code: "501",
    Name: "Fortis Microfinance Bank"
  },
  {
    Id: 168,
    Code: "035",
    Name: "Wema Bank"
  },
  {
    Id: 170,
    Code: "063",
    Name: "Diamond Bank"
  },
  {
    Id: 172,
    Code: "100",
    Name: "SunTrust Bank"
  },
  {
    Id: 177,
    Code: "058",
    Name: "GTBank Plc"
  },
  {
    Id: 178,
    Code: "032",
    Name: "Union Bank"
  },
  {
    Id: 179,
    Code: "232",
    Name: "Sterling Bank"
  },
  {
    Id: 180,
    Code: "076",
    Name: "Skye Bank"
  },
  {
    Id: 181,
    Code: "082",
    Name: "Keystone Bank"
  },
  {
    Id: 186,
    Code: "214",
    Name: "First City Monument Bank"
  },
  {
    Id: 190,
    Code: "033",
    Name: "United Bank for Africa"
  },
  {
    Id: 191,
    Code: "044",
    Name: "Access Bank"
  }
];

// export default {
//   secretKey: "FLWSECK_TEST-98c53727b0776e98a1ad0e0dacc220f7-X"
// };

class AccountNumber extends Component {
  state = {
    loading: false,
    formErrorModal: false,
    overdraftModal: false,
    successModal: false,
    amount: "",
    bank: "",
    account_number: ""
  };

  formErrorModalToggle = () => {
    this.setState({ formErrorModal: !this.state.formErrorModal });
  };

  successModalToggle = () => {
    this.setState({ successModal: !this.state.successModal });
  };

  overdraftModalToggle = () => {
    this.setState({ overdraftModal: !this.state.overdraftModal });
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  formIsValid = ({ amount, account_number }) => {
    if (
      !isNaN(amount) !== true ||
      !isNaN(account_number) !== true ||
      account_number.length < 10
    ) {
      return false;
    }
    return true;
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (!this.formIsValid(this.state)) {
      this.setState({ formErrorModal: true });
      this.setState({ loading: false });
      return;
    }

    if (this.state.amount > this.props.playerData.RealCoins) {
      this.setState({ overdraftModal: true });
      return;
    }

    // Add Validation to check amount before withdrawing

    const postData = {
      account_bank: this.state.bank,
      account_number: this.state.account_number,
      amount: this.state.amount,
      seckey: "FLWSECK_TEST-98c53727b0776e98a1ad0e0dacc220f7-X",
      narration: "Chopbarh Transfer",
      currency: "NGN",
      reference: `chopbarh-${new Date().getDate()}-${new Date().getDate()}-${new Date().getSeconds()}-jk`
    };

    try {
      const response = await fetch(
        "https://ravesandboxapi.flutterwave.com/v2/gpx/transfers/create",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(postData)
        }
      );
      const data = await response.json();
      this.setState({
        loading: false,
        amount: "",
        bank: "",
        account_number: ""
      });
      if (response.status === 200) {
        this.props.openTransactionSuccessModal();
        // this.props.setCashBalance(data.data.amount, 2);
      } else {
        this.props.openTransactionFailModal();
      }
    } catch (err) {
      this.setState({ loading: false });
      this.setState({ formErrorModal: true });
    }
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.state.formErrorModal}
          toggle={this.formErrorModalToggle}
          style={{
            marginTop: "22rem"
          }}
        >
          <ModalBody className="text-center" style={{ height: "20vh" }}>
            <h2>Ooops!</h2>
            <p>Something went wrong. Please try again</p>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.props.transactionSuccessModal}
          toggle={this.props.closeTransactionSuccessModal}
          style={{
            marginTop: "22rem"
          }}
        >
          <ModalBody
            className="text-center"
            style={{ height: "20vh", paddingTop: "4rem" }}
          >
            <h2>Success!</h2>
            <p>The Transaction was successful</p>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.props.transactionFailModal}
          toggle={this.props.closeTransactionFailModal}
          style={{
            marginTop: "22rem"
          }}
        >
          <ModalBody
            className="text-center"
            style={{ height: "20vh", paddingTop: "4rem" }}
          >
            <h2>Failed!</h2>
            <p>The transaction was not successful. Please try again</p>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.overdraftModal}
          toggle={this.overdraftModalToggle}
          style={{
            marginTop: "22rem"
          }}
        >
          <ModalBody
            className="text-center"
            style={{ height: "20vh", paddingTop: "4rem" }}
          >
            <h2>Oh Snap!</h2>
            <p>The amount is above your winnings</p>
          </ModalBody>
        </Modal>
        <FormWrapper onSubmit={this.handleSubmit}>
          <FormItem>
            <label>Bank</label>
            <select
              name="bank"
              value={this.state.bank}
              onChange={this.handleInputChange}
              required
            >
              {Banks.map(bank => (
                <option key={bank.Id} value={bank.Code}>
                  {bank.Name}
                </option>
              ))}
            </select>
          </FormItem>
          <HalfColumn>
            <FormItem className="mr-3">
              <label>Account Number</label>
              <input
                type="text"
                value={this.state.account_number}
                onChange={this.handleInputChange}
                name="account_number"
                required
                placeholder="Account Number"
              />
            </FormItem>
            <FormItem>
              <label>Amount</label>
              <input
                type="text"
                value={this.state.amount}
                onChange={this.handleInputChange}
                name="amount"
                required
                placeholder="Amount(NGN)"
              />
            </FormItem>
          </HalfColumn>
          <button type="submit" className="mr-2" disabled={this.state.loading}>
            <span>{this.state.loading ? "Processing..." : "Load"}</span>
          </button>
        </FormWrapper>
      </>
    );
  }
}

const mapStateToProps = state => ({
  transactionSuccessModal: state.modal.transactionSuccessModal,
  transactionFailModal: state.modal.transactionFailModal,
  playerData: state.player.playerData
});

const mapDispatchToProps = {
  openTransactionSuccessModal,
  openTransactionFailModal,
  closeTransactionFailModal,
  closeTransactionSuccessModal,
  setCashBalance
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountNumber);
