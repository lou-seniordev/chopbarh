import React, { Component, memo } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, Spinner, Button } from "reactstrap";
import styled from "styled-components";
import crypto from "crypto-extra";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { RadioGroup, Radio } from "react-radio-group";
import {
  Form,
  FormItem,
  HalfColumn,
  FormSubmitButton,
  ExistingCardForm,
  ExistingCardFormItem,
  Button as FormElementButton,
} from "../../../styles/CardCharge";
import { toast } from "react-toastify";

import { setWithdrawalHistory } from "../../../../store/actions/withdrawalActions";
import AccountUI from "../AccountUI/AccountUI";
import {
  removeWithdrawalBankAccount,
  fetchWithdrawalBankAccountData,
  setWithdrawalBankAccountData,
} from "../../../../store/actions/withdrawalAccountActions";
import { fetchPlayerData } from "../../../../store/actions/playerDataActions";

import "react-accessible-accordion/dist/fancy-example.css";

const FormWrapper = styled(Form)`
  min-height: 20rem;
  margin-bottom: 3.2rem;
`;

const PassworForm = styled(Form)`
  min-height: 11rem;
`;

class AccountNumber extends Component {
  state = {
    loading: false,
    amount: "",
    authAmount: "",
    bank: "",
    bankName: "",
    account_number: "",
    account_confirmed: false,
    account_name: "",
    modal: false,
    bankList: null,
    error: false,
    dataLoading: true,
    selectedValue: null,
    paying: false,
    popoverOpen: false,
    removeWithdrawalBankAccountModal: false,
    password: "",
    passwordModal: "",
  };

  componentDidMount = () => {
    this.props.fetchWithdrawalBankAccountData();

    fetch(
      "https://api.ravepay.co/v2/banks/ng?public_key=FLWPUBK-48046ea864f738ab3e4506a5f741f99b-X",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(response => response.json())
      .then(data => {
        const { Banks } = data.data;
        const bankList = Banks.filter(bank => bank.Code !== "090175");

        this.setState({
          bankList,
          dataLoading: false,
          bank: data.data.Banks[0].Code,
        });
      })
      .catch(err => this.setState({ error: err, dataLoading: false }));
  };

  componentDidUpdate = prevProps => {
    if (this.props !== prevProps) {
      this.props.withdrawalAccount.length &&
        this.setState({
          selectedValue: this.props.withdrawalAccount[0].account_number,
        });
    }
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
      loading: false,
      password: "",
      amount: "",
      authAmount: "",
    });
  };

  togglePasswordModal = () => {
    this.setState({ passwordModal: !this.state.passwordModal, loading: false });
  };

  handleRadioChange = value => {
    this.setState({ selectedValue: value });
  };

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  };

  toggleRemoveWithdrawalBankAccount = () => {
    this.setState({
      removeWithdrawalBankAccountModal: !this.state
        .removeWithdrawalBankAccountModal,
    });
  };

  removeWithdrawalBankAccount = () => {
    this.setState({ removeWithdrawalBankAccountModal: false });
    this.props.removeWithdrawalBankAccount(null, this.state.selectedValue);
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handlePasswordInputValidation = event => {
    event.preventDefault();

    if (this.state.password.length >= 4) {
      this.setState({
        passwordModal: false,
        modal: true,
        verifying: false,
      });
    }
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

  withdrawCash = async () => {
    if (this.state.password.length < 4) {
      this.setState({
        amount: "",
        account_number: "",
        paying: false,
        modal: false,
      });
      return;
    }

    this.setState({ paying: true, loading: false });

    const bankName = this.state.bankList.filter(
      bank => bank.Code === this.state.bank
    );

    try {
      const verif = process.env.REACT_APP_HASH_KEY_PROD;

      const response = await fetch(
        "https://pay.chopbarh.com/ng/user/withdraw",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            apiKey: process.env.REACT_APP_NODE_SERVER_API_KEY,
            verification: crypto.encrypt(this.state.password, verif),
          },
          body: JSON.stringify({
            playerId: this.props.playerData.PlayerID,
            amount: +this.state.amount,
            phone_number: this.props.playerData.PhoneNum,
            account_number: this.state.account_number,
            bank: this.state.bank,
            bank_name: bankName[0].Name,
          }),
        }
      );

      const data = await response.json();

      if (data.status === true) {
        this.setState({
          amount: "",
          account_number: "",
          paying: false,
          modal: false,
        });
        toast.info("Transaction is Processing");
        this.props.fetchPlayerData();
      } else {
        this.setState({
          amount: "",
          account_number: "",
          paying: false,
          modal: false,
          password: "",
        });
        toast.error("Transaction was not successful. Please try again later");
      }
    } catch (err) {
      this.setState({
        amount: "",
        account_number: "",
        paying: false,
        modal: false,
        password: "",
      });
      toast.error("Something went wrong");
    }
  };

  withdrawCashAuth = async () => {
    if (this.state.password.length < 4) {
      this.setState({
        authAmount: "",
        account_number: "",
        paying: false,
        modal: false,
      });
      return;
    }

    this.setState({ paying: true, loading: false });

    const bankInformation = this.props.withdrawalAccount.filter(
      account => account.account_number === this.state.selectedValue
    );

    if (bankInformation[0].code === "090175") {
      this.setState({
        authAmount: "",
        account_number: "",
        paying: false,
        modal: false,
      });
      toast.error("Service is unavailable at the moment");
      return;
    }

    try {
      const verif = process.env.REACT_APP_HASH_KEY_PROD;

      const response = await fetch(
        "https://pay.chopbarh.com/ng/user/withdraw",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            apiKey: process.env.REACT_APP_NODE_SERVER_API_KEY,
            verification: crypto.encrypt(this.state.password, verif),
          },
          body: JSON.stringify({
            playerId: this.props.playerData.PlayerID,
            amount: +this.state.authAmount,
            phone_number: this.props.playerData.PhoneNum,
            account_number: bankInformation[0].account_number,
            bank: bankInformation[0].code,
            bank_name: "",
          }),
        }
      );

      const data = await response.json();

      if (data.status === true) {
        this.setState({
          authAmount: "",
          account_number: "",
          paying: false,
          modal: false,
        });
        toast.info("Transaction is being processed");
        this.props.fetchPlayerData();
      } else {
        this.setState({
          authAmount: "",
          account_number: "",
          paying: false,
          modal: false,
          password: "",
        });
        toast.error("Transaction was not successful. Please try again later");
      }
    } catch (err) {
      this.setState({
        authAmount: "",
        account_number: "",
        paying: false,
        modal: false,
        password: "",
      });
      toast.error("Something went wrong");
    }
  };

  handleAuthSubmit = event => {
    event.preventDefault();

    if (this.props.playerData.PlayerStatus === 0) {
      toast.error("Your account has been deactivated.");
      return;
    }

    this.setState({ loading: true, amount: "" });

    if (!isNaN(this.state.authAmount) !== true) {
      toast.error("Form is not valid");
      this.setState({ loading: false });
      return;
    }

    if (Number(this.state.authAmount) > this.props.playerData.RealCoins) {
      toast.error("You cannot withdraw more than you have won");
      this.setState({ loading: false });
      return;
    }

    if (Number(this.state.authAmount) < 1000) {
      toast.error(`You cannot withdraw less than \u20a6${1000}`);
      this.setState({ loading: false });
      return;
    }

    if (Number(this.state.authAmount) > 50000) {
      toast.error(
        `You cannot withdraw more than \u20a6${new Intl.NumberFormat().format(
          50000
        )} at once`
      );
      this.setState({ loading: false });
      return;
    }

    if (
      this.props.withdrawalStatus + Number(this.state.authAmount) >
      this.props.withdrawalLimit
    ) {
      toast.error(
        "Withdrawal could not be completed. Your daily limit will be exceeded."
      );
      this.setState({ loading: false });
      return;
    }

    this.setState({
      passwordModal: true,
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    if (this.props.playerData.PlayerStatus === 0) {
      toast.error("Your account has been deactivated.");
      return;
    }

    this.setState({ loading: true });

    if (!this.formIsValid(this.state)) {
      toast.error("Form is not valid");
      this.setState({ loading: false });
      return;
    }

    if (Number(this.state.amount) > this.props.playerData.RealCoins) {
      toast.error("You cannot withdraw more than you have won");
      this.setState({ loading: false });
      return;
    }

    if (Number(this.state.amount) < 1000) {
      toast.error(`You cannot withdraw less than \u20a6${1000}`);
      this.setState({ loading: false });
      return;
    }

    if (Number(this.state.amount) > 50000) {
      toast.error(
        `You cannot withdraw more than \u20a6${new Intl.NumberFormat().format(
          50000
        )} at once`
      );
      this.setState({ loading: false });
      return;
    }

    if (
      this.props.withdrawalStatus + Number(this.state.amount) >
      this.props.withdrawalLimit
    ) {
      toast.error(
        "Withdrawal could not be completed. Your daily limit will be exceeded."
      );
      this.setState({ loading: false });
      return;
    }

    const postData = {
      recipientaccount: this.state.account_number,
      destbankcode: this.state.bank,
      PBFPubKey: "FLWPUBK-48046ea864f738ab3e4506a5f741f99b-X",
    };

    fetch("https://api.ravepay.co/flwv3-pug/getpaidx/api/resolve_account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.data.data.accountname) {
          this.setState({
            account_confirmed: true,
            account_name: data.data.data.accountname,
            passwordModal: true,
          });
        } else {
          this.setState({ loading: false });
          toast.error(
            "Account verification not successful. Please check your details again"
          );
        }
      })
      .catch(err => {
        this.setState({ loading: false });
        toast.error("Something went wrong");
      });
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.state.removeWithdrawalBankAccountModal}
          toggle={this.toggleRemoveWithdrawalBankAccount}
          style={{
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ModalBody className="text-center p-4" style={{ minHeight: "12rem" }}>
            <p className="mt-4">
              This action will remove this card from your account. Do you want
              to continue?
            </p>
            <div className="d-flex justify-content-center">
              <FormElementButton
                className="mr-2"
                onClick={this.removeWithdrawalBankAccount}
              >
                <span>Yes</span>
              </FormElementButton>
              <FormElementButton
                onClick={this.toggleRemoveWithdrawalBankAccount}
              >
                <span>No</span>
              </FormElementButton>
            </div>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          style={{
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ModalBody
            className="text-center mt-5 mb-5"
            style={{ minHeight: "20vh" }}
          >
            {this.state.amount ? (
              <>
                <p>
                  <strong>Account: {this.state.account_name}</strong>
                </p>
                <p>
                  <strong>
                    Amount: &#8358;
                    {new Intl.NumberFormat().format(+this.state.amount)}
                  </strong>
                </p>
                <p>
                  <strong>Transaction Fee: &#8358;{50}</strong>
                </p>
                <p>
                  <strong>
                    Total: &#8358;
                    {new Intl.NumberFormat().format(+this.state.amount - 50)}
                  </strong>
                </p>
                <p>Proceed with withdrawal?</p>
                <div className="d-flex justify-content-center">
                  <FormElementButton
                    className="mr-1"
                    disabled={this.state.paying}
                    onClick={this.withdrawCash}
                  >
                    <span>{this.state.paying ? "Processing..." : "Yes"}</span>
                  </FormElementButton>
                  {!this.state.paying ? (
                    <FormElementButton
                      onClick={this.toggleModal}
                      className="ml-1"
                    >
                      <span>No</span>
                    </FormElementButton>
                  ) : (
                    <>{null}</>
                  )}
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>
                    Amount: &#8358;
                    {new Intl.NumberFormat().format(+this.state.authAmount)}
                  </strong>
                </p>
                <p>
                  <strong>Transaction Fee: &#8358;{50}</strong>
                </p>
                <p>
                  <strong>
                    Total: &#8358;
                    {new Intl.NumberFormat().format(
                      +this.state.authAmount - 50
                    )}
                  </strong>
                </p>
                <p>Proceed with withdrawal?</p>
                <div className="d-flex justify-content-center">
                  <FormElementButton
                    className="mr-1"
                    disabled={this.state.paying}
                    onClick={this.withdrawCashAuth}
                  >
                    <span>{this.state.paying ? "Processing..." : "Yes"}</span>
                  </FormElementButton>
                  {!this.state.paying ? (
                    <FormElementButton
                      onClick={this.toggleModal}
                      className="ml-1"
                    >
                      <span>No</span>
                    </FormElementButton>
                  ) : (
                    <>{null}</>
                  )}
                </div>
              </>
            )}
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.passwordModal}
          toggle={this.togglePasswordModal}
          style={{
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ModalBody
            className="text-center mt-5 mb-5"
            style={{ minHeight: "13.5vh" }}
          >
            <PassworForm onSubmit={this.handlePasswordInputValidation}>
              <>
                <FormItem>
                  <label>Enter your Password</label>
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    minLength="4"
                    maxLength="12"
                    required
                    placeholder="Password"
                  />
                </FormItem>
                <FormSubmitButton type="submit" className="mr-2">
                  <span>Submit</span>
                </FormSubmitButton>
              </>
              )}
            </PassworForm>
          </ModalBody>
        </Modal>
        {this.props.loading || this.props.playerDataLoading ? (
          <div className="mt-5 text-center" style={{ minHeight: "30vh" }}>
            <Spinner />
          </div>
        ) : (
          <>
            {this.props.playerData.PlayerStatus === 0 ? (
              <p className="text-center">Service currently unavailable</p>
            ) : (
              <>
                {this.props.withdrawalAccount.length > 0 ? (
                  <>
                    <div style={{ minHeight: "20rem" }}>
                      <Accordion>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              Withdraw with existing Account
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <ExistingCardForm
                              style={{ margin: "4rem 0" }}
                              onSubmit={event =>
                                this.handleAuthSubmit(
                                  event,
                                  this.state.bankName
                                )
                              }
                            >
                              <RadioGroup
                                name="withdrawalAccount"
                                selectedValue={this.state.selectedValue}
                                onChange={this.handleRadioChange}
                              >
                                {this.props.withdrawalAccount.map(
                                  (account, index) => (
                                    <div
                                      className="d-flex align-items-center justify-content-center flex-wrap"
                                      key={index}
                                    >
                                      <Radio value={account.account_number} />
                                      <AccountUI
                                        number={account.account_number}
                                        bank={account.bank}
                                      />

                                      <Button
                                        id="Popover"
                                        type="button"
                                        className="mb-lg-1 mb-md-1 mb-sm-2 ml-1"
                                        onClick={
                                          this.toggleRemoveWithdrawalBankAccount
                                        }
                                        disabled={
                                          this.state.selectedValue !==
                                          account.account_number
                                        }
                                      >
                                        &#10005;
                                      </Button>
                                    </div>
                                  )
                                )}
                              </RadioGroup>
                              <ExistingCardFormItem className="ml-5">
                                <input
                                  onChange={this.handleInputChange}
                                  name="authAmount"
                                  value={this.state.authAmount}
                                  minLength="1"
                                  required
                                  placeholder="Amount(NGN)"
                                />
                              </ExistingCardFormItem>
                              <FormSubmitButton
                                type="submit"
                                className="mr-2 mt-n4"
                                disabled={this.state.loading}
                              >
                                <span>
                                  {this.state.loading
                                    ? "Please wait..."
                                    : "Withdraw"}
                                </span>
                              </FormSubmitButton>
                            </ExistingCardForm>
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              Withdraw with new Account
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            {this.state.bankList ? (
                              <>
                                <FormWrapper onSubmit={this.handleSubmit}>
                                  <FormItem>
                                    <label>Bank</label>
                                    <select
                                      name="bank"
                                      value={this.state.bank}
                                      onChange={this.handleInputChange}
                                      required
                                    >
                                      {this.state.bankList.map(bank => (
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
                                  <FormSubmitButton
                                    type="submit"
                                    className="mr-2"
                                    disabled={this.state.loading}
                                  >
                                    <span>
                                      {this.state.loading
                                        ? "Processing..."
                                        : "Withdraw"}
                                    </span>
                                  </FormSubmitButton>
                                </FormWrapper>
                              </>
                            ) : (
                              <div
                                className="mt-5 text-center"
                                style={{ minHeight: "30vh" }}
                              >
                                <p>Something went wrong</p>
                              </div>
                            )}
                          </AccordionItemPanel>
                        </AccordionItem>
                      </Accordion>
                      <div className="text-center" style={{ color: "#000" }}>
                        <p>
                          **For all withdrawals there is a &#8358;50 deducted
                          from your cash balance**
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {!this.state.dataLoading ? (
                      <>
                        {this.state.bankList ? (
                          <>
                            <FormWrapper onSubmit={this.handleSubmit}>
                              <FormItem>
                                <label>Bank</label>
                                <select
                                  name="bank"
                                  value={this.state.bank}
                                  onChange={this.handleInputChange}
                                  required
                                >
                                  {this.state.bankList.map(bank => (
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
                              <FormSubmitButton
                                type="submit"
                                className="mr-2"
                                disabled={this.state.loading}
                              >
                                <span>
                                  {this.state.loading
                                    ? "Processing..."
                                    : "Withdraw"}
                                </span>
                              </FormSubmitButton>
                            </FormWrapper>
                            <div
                              className="text-center"
                              style={{ color: "#000" }}
                            >
                              <p>
                                **For all withdrawals there is a &#8358;50
                                deducted from your cash balance**
                              </p>
                            </div>
                          </>
                        ) : (
                          <div
                            className="mt-5 text-center"
                            style={{ minHeight: "30vh" }}
                          >
                            <p>Resource was not loaded</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div
                        className="mt-5 text-center"
                        style={{ minHeight: "30vh" }}
                      >
                        <Spinner />
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
        {/* <p className="text-center">Service currently unavailable</p> */}
      </>
    );
  }
}

const mapStateToProps = state => ({
  playerData: state.player.playerData,
  withdrawalLimit: state.withdrawal.withdrawalLimit,
  loading: state.withdrawalAccount.loading,
  playerDataLoading: state.player.loading,
  withdrawalStatus: state.withdrawal.withdrawalStatus,
  withdrawalAccount: state.withdrawalAccount.withdrawalAccount,
  removingAccount: state.withdrawalAccount.removing,
});

const mapDispatchToProps = {
  setWithdrawalHistory,
  removeWithdrawalBankAccount,
  fetchWithdrawalBankAccountData,
  setWithdrawalBankAccountData,
  fetchPlayerData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(AccountNumber));
