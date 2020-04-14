import React, { Component, memo } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, Spinner, Button } from "reactstrap";
import { toast } from "react-toastify";
// import NumberFormat from "react-number-format";
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
import SubmitOTP from "./SubmitOTP/SubmitOTP";
import { setChargeReference } from "../../../../store/actions/chargeActions";
import {
  openOTPModal,
  closeOTPModal,
  openBirthdayModal,
  closeBirthdayModal,
  openPhoneModal,
  closePhoneModal,
} from "../../../../store/actions/modalActions";
import {
  fetchBankAccountData,
  removeBankAccount,
} from "../../../../store/actions/bankAccountActions";
import AccountUI from "./AccountUI/AccountUI";
import { setDepositHistory } from "../../../../store/actions/depositActions";
import SubmitBirthday from "./SubmitBirthday/SubmitBirthday";
import SubmitPhone from "./SubmitPhone/SubmitPhone";

import "react-accessible-accordion/dist/fancy-example.css";

function referenceId() {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
class BankCharge extends Component {
  state = {
    loading: false,
    dataLoading: true,
    bankList: null,
    amount: "",
    bank: "",
    bankName: "",
    account_number: "",
    authAmount: "",
    auth_code: "",
    submitAmountModal: false,
    selectedValue: null,
    modalOpen: false,
    paying: false,
    removeAccountModal: false,
  };

  componentDidMount = () => {
    this.props.fetchBankAccountData();

    fetch("https://api.paystack.co/bank?gateway=emandate&pay_with_bank=true", {
      headers: {
        Authorization: `Bearer sk_live_f46f17bcba5eefbb48baabe5f54d10e67c90e83a`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          bankList: data.data,
          dataLoading: false,
          bank: data.data[0].code,
        });
      })
      .catch((err) => this.setState({ dataLoading: false }));
  };

  componentDidUpdate = (prevProps) => {
    if (this.props !== prevProps) {
      try {
        this.props.bankAccount.length &&
          this.setState({
            selectedValue: this.props.bankAccount[0].auth_code,
            bankName: this.props.bankAccount[0].bank,
          });
      } catch (err) {}
    }
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen, loading: false });
  };

  handleRadioChange = (value) => {
    this.setState({ selectedValue: value });
  };

  toggleSubmitAmountModal = () => {
    this.setState({ submitAmountModal: !this.state.submitAmountModal });
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  toggleRemoveAccount = () => {
    this.setState({
      removeAccountModal: !this.state.removeAccountModal,
    });
  };

  removeBankAccount = () => {
    this.setState({ removeAccountModal: false });
    this.props.removeBankAccount(null, this.state.selectedValue);
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

  handleAuthSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    if (!isNaN(this.state.authAmount) !== true) {
      toast.error(`Form is not valid`);
      this.setState({ loading: false });
      return;
    }

    if (+this.state.authAmount < 100) {
      toast.error(`Minimum deposit is \u20a6${100}`);
      this.setState({ loading: false });
      return;
    }

    this.setState({ loading: false, modalOpen: true });
  };

  payAuthMoney = async () => {
    this.setState({ paying: true });

    const bankAccountObject = this.props.bankAccount.filter(
      (account) => account.auth_code === this.state.selectedValue
    );

    let refId = `${this.props.playerData.PhoneNum}-${referenceId()}`;
    let reference = `${this.props.playerData.PhoneNum}-${referenceId()}`;

    const postData = {
      email: `${this.props.playerData.PhoneNum}@mail.com`,
      amount: this.state.authAmount * 100,
      bank: {
        code: bankAccountObject[0].bank_code,
        account_number: bankAccountObject[0].account_number,
      },
      reference,
      metadata: {
        phone: this.props.playerData.PhoneNum,
        bank_code: bankAccountObject[0].bank_code,
        account_number: bankAccountObject[0].account_number,
        refId,
      },
    };

    const historyObject = {
      amount: this.state.authAmount,
      channel: "Bank",
      transaction_date: new Date().toISOString(),
      fees: +this.state.authAmount < 2500 ? 0 : 100,
      reference,
      status: "--",
      refId,
      gateway: "Paystack",
      made_by: this.props.playerData.PhoneNum,
    };

    this.props.setDepositHistory(historyObject);

    try {
      const response = await fetch("https://api.paystack.co/charge", {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `Bearer sk_live_f46f17bcba5eefbb48baabe5f54d10e67c90e83a`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const data = await response.json();

      this.setState({
        loading: false,
        authAmount: "",
        paying: false,
      });

      if (data.data.status === "send_otp") {
        this.props.setChargeReference(data.data.reference);
        this.toggleModal();
        this.props.openOTPModal();
      } else if (data.data.status === "send_phone") {
        this.toggleModal();
        this.props.openPhoneModal();
      } else if (data.data.status === "send_birthday") {
        this.toggleModal();
        this.props.openBirthdayModal();
      } else if (data.data.status === "open_url") {
        window.open(data.data.url, "_self");
      } else if (data.data.status === "pending") {
        this.toggleModal();
        toast.info("Transaction is processing");
      } else {
        toast.error(`Transaction not successful`);
      }
    } catch (err) {
      toast.error(`Something went wrong`);
      this.setState({ loading: false });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    if (!this.formIsValid(this.state)) {
      toast.error(`Form is not valid`);
      this.setState({ loading: false });
      return;
    }

    if (+this.state.amount < 100) {
      toast.error(`Minimum deposit is \u20a6${100}`);
      this.setState({ loading: false });
      return;
    }

    this.setState({ loading: false, modalOpen: true });
  };

  payMoney = async () => {
    this.setState({ paying: true });

    let refId = `${this.props.playerData.PhoneNum}-${referenceId()}`;
    let reference = `${this.props.playerData.PhoneNum}-${referenceId()}`;

    const postData = {
      email: `${this.props.playerData.PhoneNum}@mail.com`,
      amount: this.state.amount * 100,
      bank: {
        code: this.state.bank,
        account_number: this.state.account_number,
      },
      reference,
      metadata: {
        phone: this.props.playerData.PhoneNum,
        bank_code: this.state.bank,
        account_number: this.state.account_number,
        refId,
      },
    };

    const historyObject = {
      amount: this.state.amount,
      channel: "Bank",
      transaction_date: new Date().toISOString(),
      fees: +this.state.amount < 2500 ? 0 : 100,
      reference,
      status: "--",
      refId,
      gateway: "Paystack",
      made_by: this.props.playerData.PhoneNum,
    };

    this.props.setDepositHistory(historyObject);

    try {
      const response = await fetch("https://api.paystack.co/charge", {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `Bearer sk_live_f46f17bcba5eefbb48baabe5f54d10e67c90e83a`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const data = await response.json();

      this.setState({
        loading: false,
        amount: "",
        bank: "",
        account_number: "",
        paying: false,
      });

      if (data.data.status === "send_otp") {
        this.props.setChargeReference(data.data.reference);
        this.toggleModal();
        this.props.openOTPModal();
      } else if (data.data.status === "send_phone") {
        this.props.setChargeReference(data.data.reference);
        this.toggleModal();
        this.props.openPhoneModal();
      } else if (data.data.status === "send_birthday") {
        this.props.setChargeReference(data.data.reference);
        this.toggleModal();
        this.props.openBirthdayModal();
      } else if (data.data.status === "open_url") {
        window.open(data.data.url, "_self");
      } else if (data.data.status === "pending") {
        this.toggleModal();
        toast.info("Transaction is processing");
      } else {
        this.toggleModal();
        toast.error(`Transaction not successful`);
      }
    } catch (err) {
      this.toggleModal();
      toast.error(`Something went wrong`);
      this.setState({ loading: false, paying: false });
    }
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.state.removeAccountModal}
          toggle={this.toggleRemoveAccount}
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
                onClick={this.removeBankAccount}
              >
                <span>Yes</span>
              </FormElementButton>
              <FormElementButton onClick={this.toggleRemoveAccount}>
                <span>No</span>
              </FormElementButton>
            </div>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.props.otpModal}
          toggle={this.props.closeOTPModal}
          style={{
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ModalBody className="text-center" style={{ minHeight: "5rem" }}>
            <SubmitOTP />
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.props.birthdayModal}
          toggle={this.props.closeBirthdayModal}
          style={{
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ModalBody className="text-center" style={{ minHeight: "5rem" }}>
            <SubmitBirthday />
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.props.phoneModal}
          toggle={this.props.closePhoneModal}
          style={{
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <ModalBody className="text-center" style={{ minHeight: "5rem" }}>
            <SubmitPhone />
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.modalOpen}
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
                  <strong>
                    Amount: &#8358;
                    {new Intl.NumberFormat().format(+this.state.amount)}
                  </strong>
                </p>
                <p>
                  <strong>
                    Transaction Fee:{" "}
                    {+this.state.amount < 2500 ? `\u20a6${0}` : `\u20a6${100}`}
                  </strong>
                </p>
                <p>
                  <strong>
                    Total:{" "}
                    {+this.state.amount < 2500
                      ? `\u20a6${new Intl.NumberFormat().format(
                          +this.state.amount
                        )}`
                      : `\u20a6${new Intl.NumberFormat().format(
                          +this.state.amount + 100
                        )}`}
                  </strong>
                </p>
                <p>Proceed with deposit?</p>
                <div className="d-flex justify-content-center">
                  <FormElementButton
                    className="mr-1"
                    disabled={this.state.paying}
                    onClick={this.payMoney}
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
                  <strong>
                    Transaction Fee:{" "}
                    {+this.state.authAmount < 2500
                      ? `\u20a6${0}`
                      : `\u20a6${100}`}
                  </strong>
                </p>
                <p>
                  <strong>
                    Total:{" "}
                    {+this.state.authAmount < 2500
                      ? `\u20a6${new Intl.NumberFormat().format(
                          +this.state.authAmount
                        )}`
                      : `\u20a6${new Intl.NumberFormat().format(
                          +this.state.authAmount + 100
                        )}`}
                  </strong>
                </p>
                <p>Proceed with deposit?</p>
                <div className="d-flex justify-content-center">
                  <FormElementButton
                    className="mr-1"
                    disabled={this.state.paying}
                    onClick={this.payAuthMoney}
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
        {this.props.loading ? (
          <div className="mt-5 text-center" style={{ minHeight: "30vh" }}>
            <Spinner />
          </div>
        ) : (
          <>
            {this.props.bankAccount.length > 0 ? (
              <div style={{ minHeight: "20rem" }}>
                <Accordion preExpanded={["100"]}>
                  <AccordionItem uuid="100">
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        Pay with existing Account
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <ExistingCardForm
                        onSubmit={(event) =>
                          this.handleAuthSubmit(event, this.state.bankName)
                        }
                      >
                        <RadioGroup
                          name="bankAccount"
                          selectedValue={this.state.selectedValue}
                          onChange={this.handleRadioChange}
                        >
                          {this.props.bankAccount.map((account, index) => (
                            <div
                              className="d-flex align-items-center justify-content-center flex-wrap"
                              key={index}
                            >
                              <Radio value={account.auth_code} />
                              <AccountUI
                                number={account.last_digits}
                                bank={account.bank}
                              />

                              <Button
                                id="Popover"
                                type="button"
                                className="mb-lg-1 mb-md-1 mb-sm-2 ml-1"
                                onClick={this.toggleRemoveAccount}
                                disabled={
                                  this.state.selectedValue !== account.auth_code
                                }
                              >
                                &#10005;
                              </Button>
                            </div>
                          ))}
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
                            {this.state.loading ? "Please wait..." : "Load"}
                          </span>
                        </FormSubmitButton>
                      </ExistingCardForm>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem uuid="200">
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        Pay with new Account
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
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
                              {this.state.bankList.map((bank) => (
                                <option key={bank.id} value={bank.code}>
                                  {bank.name}
                                </option>
                              ))}
                            </select>
                          </FormItem>
                          <HalfColumn>
                            <FormItem className="mr-3">
                              <label>Account Number</label>

                              <input
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
                              {this.state.loading ? "Processing..." : "Load"}
                            </span>
                          </FormSubmitButton>
                        </Form>
                      ) : (
                        <div
                          className="mt-5 text-center"
                          style={{ minHeight: "30vh" }}
                        >
                          <Spinner />
                        </div>
                      )}
                    </AccordionItemPanel>
                  </AccordionItem>
                </Accordion>
              </div>
            ) : (
              <>
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
                        {this.state.bankList.map((bank) => (
                          <option key={bank.id} value={bank.code}>
                            {bank.name}
                          </option>
                        ))}
                      </select>
                    </FormItem>
                    <HalfColumn>
                      <FormItem className="mr-3">
                        <label>Account Number</label>

                        <input
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
                        {this.state.loading ? "Processing..." : "Load"}
                      </span>
                    </FormSubmitButton>
                  </Form>
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

const mapStateToProps = (state) => ({
  otpModal: state.modal.submitOTPModal,
  phoneModal: state.modal.submitPhoneModal,
  birthdayModal: state.modal.submitBirthdayModal,
  bankAccount: state.bankAccount.bankAccount,
  loading: state.bankAccount.loading,
  removingAccount: state.bankAccount.removing,
  playerData: state.player.playerData,
});

const mapDispatchToProps = {
  setChargeReference,
  fetchBankAccountData,
  removeBankAccount,
  openOTPModal,
  closeOTPModal,
  setDepositHistory,
  openBirthdayModal,
  openPhoneModal,
  closeBirthdayModal,
  closePhoneModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(BankCharge));
