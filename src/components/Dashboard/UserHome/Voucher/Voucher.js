import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Modal, ModalBody } from "reactstrap";
import color from "../../../styles/colors";
import { setVoucherValue } from "./actions/VoucherActions";
import { setCoinBalance } from "../../shared/actions/coinBalanceActions";

const VoucherWrapper = styled.div``;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;

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

class Voucher extends Component {
  state = {
    loading: false,
    voucherModal: false,
    voucherSuccessModal: false,
    voucher: "",
    formErrorModal: false
  };

  voucherUsedModalToggle = () => {
    this.setState({ voucherModal: !this.state.voucherModal });
  };

  formErrorModalToggle = () => {
    this.setState({ formErrorModal: !this.state.formErrorModal });
  };

  voucherSuccessModalToggle = () => {
    this.setState({ voucherSuccessModal: !this.state.voucherSuccessModal });
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  formIsValid = ({ voucher }) => {
    if (!isNaN(voucher) !== true || voucher.length !== 12) {
      return false;
    }
    return true;
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (!this.formIsValid(this.state)) {
      this.setState({ loading: false, formErrorModal: true });
      return;
    }

    const postData = {
      pin: this.state.voucher,
      reference: this.props.reference
    };

    const formValue = JSON.stringify(postData);

    console.log(formValue);

    try {
      const response = await fetch(
        "https://partners.chopbarh.com/api/voucher/use",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            apikey: "C213-E3C9-C7"
          },
          body: formValue
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        this.props.setVoucherValue(data.data.value);
        this.props.setCoinBalance(data.data.value);
        this.setState({
          loading: false,
          voucherSuccessModal: true,
          voucher: ""
        });
        this.setState({});
      } else if (response.status === 404) {
        // setVoucherUsedModal(true);
        this.setState({ voucherModal: true, voucher: "", loading: false });
      } else {
        this.setState({ loading: false });
      }
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
    }
  };

  render() {
    return (
      <VoucherWrapper className="container">
        <Modal
          isOpen={this.state.voucherModal}
          toggle={this.voucherUsedModalToggle}
          className="pt-5 mt-4"
        >
          <ModalBody className="text-center">
            <p>This Voucher has already been used</p>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.formErrorModal}
          toggle={this.formErrorModalToggle}
          className="pt-5 mt-4"
        >
          <ModalBody className="text-center">
            <p>There was an error in the form</p>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.voucherSuccessModal}
          toggle={this.voucherSuccessModalToggle}
          style={{
            marginTop: "22rem"
          }}
        >
          <ModalBody
            className="text-center"
            style={{ height: "20vh", paddingTop: "4rem" }}
          >
            <h2>Success!</h2>
            <p>The Voucher was successfully loaded</p>
          </ModalBody>
        </Modal>
        <FormWrapper onSubmit={this.handleSubmit}>
          <form>
            <FormItem>
              <label>Load Voucher</label>
            </FormItem>
            <FormItem>
              <input
                type="text"
                name="voucher"
                value={this.state.voucer}
                onChange={this.handleInputChange}
                placeholder="Voucher Code"
              />
            </FormItem>
            <button
              type="submit"
              className="ml-2 mr-2"
              disabled={this.state.loading}
            >
              <span>{this.state.loading ? "Loading..." : "Load"}</span>
            </button>
          </form>
        </FormWrapper>
      </VoucherWrapper>
    );
  }
}

const mapStateToProps = state => ({
  reference: state.auth.id
});

const mapDispatchToProps = {
  setVoucherValue,
  setCoinBalance
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Voucher);
