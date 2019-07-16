import React, { Component, memo } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, Spinner } from "reactstrap";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";
import {
  Form,
  FormItem,
  HalfColumn,
  FormSubmitButton
} from "../../../styles/CardCharge";
import SubmitOTP from "./SubmitOTP/SubmitOTP";
import { setChargeReference } from "../../../../store/actions/chargeActions";
import {
  openOTPModal,
  closeOTPModal
} from "../../../../store/actions/modalActions";
import { fetchBankAccountData } from "../../../../store/actions/bankAccountActions";
import SubmitAmount from "./SubmitAmount/SubmitAmount";
import { removeCreditCard } from "../../../../store/actions/creditCardActions";

class BankCharge extends Component {
  state = {
    loading: false,
    dataLoading: true,
    bankList: null,
    amount: "",
    bank: "",
    account_number: "",
    auth_code: "",
    submitAmountModal: false
  };

  componentDidMount = () => {
    this.props.fetchBankAccountData();
    fetch("https://api.paystack.co/bank?gateway=emandate&pay_with_bank=true", {
      headers: {
        Authorization: `Bearer sk_test_c644c86e3b42191b981bbc1c263f98c7020c9841`,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ bankList: data.data, dataLoading: false });
      })
      .catch(err => this.setState({ dataLoading: false }));
  };

  toggleSubmitAmountModal = () => {
    this.setState({ submitAmountModal: !this.state.submitAmountModal });
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  formIsValid = ({ amount, bank, account_number }) => {
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
      toast.error(`Form is not valid`);
      this.setState({ loading: false });
      return;
    }

    const postData = {
      email: "somebody@mail.com",
      amount: this.state.amount * 100,
      bank: {
        code: this.state.bank,
        account_number: this.state.account_number
      },
      birthday: "1995-03-29"
    };

    try {
      const response = await fetch("https://api.paystack.co/charge", {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `Bearer sk_test_c644c86e3b42191b981bbc1c263f98c7020c9841`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });
      const data = await response.json();
      this.setState({
        loading: false,
        amount: "",
        bank: "",
        account_number: ""
      });
      if (data.data.status === "send_otp") {
        this.props.setChargeReference(data.data.reference);
        this.props.openOTPModal();
      } else {
        toast.error(`Transaction not successful`);
      }
    } catch (err) {
      toast.error(`Something went wrong`);
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.props.otpModal}
          toggle={this.props.closeOTPModal}
          style={{
            marginTop: "22rem"
          }}
        >
          <ModalBody className="text-center" style={{ height: "20vh" }}>
            <SubmitOTP />
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.submitAmountModal}
          toggle={this.toggleSubmitAmountModal}
          style={{
            marginTop: "22rem"
          }}
        >
          <ModalBody className="text-center" style={{ height: "20vh" }}>
            <SubmitAmount
              auth_code={this.state.auth_code}
              close={this.toggleSubmitAmountModal}
            />
          </ModalBody>
        </Modal>
        {this.state.bankList ? (
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              <label>Bank</label>
              <select
                name="bank"
                value={this.state.bank}
                onChange={this.handleInputChange}
                required
              >
                {this.state.bankList.map(bank => (
                  <option key={bank.id} value={bank.code}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </FormItem>
            <HalfColumn>
              <FormItem className="mr-3">
                <label>Account Number</label>

                <NumberFormat
                  value={this.state.account_number}
                  onChange={this.handleInputChange}
                  name="account_number"
                  required
                  placeholder="Account Number"
                />
              </FormItem>
              <FormItem>
                <label>Amount</label>
                <NumberFormat
                  thousandSeparator
                  value={this.state.amount}
                  onChange={this.handleInputChange}
                  name="amount"
                  required
                  placeholder="Amount(NGN)"
                />
              </FormItem>
            </HalfColumn>
            <FormSubmitButton
              type="submit"
              className="mr-2"
              disabled={this.state.loading}
            >
              <span>{this.state.loading ? "Processing..." : "Load"}</span>
            </FormSubmitButton>
          </Form>
        ) : (
          <div className="mt-5 text-center" style={{ minHeight: "30vh" }}>
            <Spinner />
          </div>
        )}
        <div className="text-center" style={{ color: "#000" }}>
          <p>
            **For deposits of &#8358;2,500 and above, there is a &#8358;100
            charge added to the deposit amount**
          </p>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  otpModal: state.modal.submitOTPModal,
  bankAccount: state.bankAccount.bankAccount
});

const mapDispatchToProps = {
  setChargeReference,
  fetchBankAccountData,
  removeCreditCard,
  openOTPModal,
  closeOTPModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(BankCharge));
