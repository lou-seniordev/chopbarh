import React, { Component, memo } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import color from "../../../styles/colors";
import {
  setVoucherValue,
  setVoucherHistory
} from "../../../../store/actions/voucherActions";
import { setCoinBalance } from "../../../../store/actions/coinBalanceActions";

const VoucherWrapper = styled.div``;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.center ? "center" : "flex-start")};

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
    align-self: ${props => (props.center ? "center" : "flex-start")};

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
    display: ${props => (props.noHeader ? "none" : "block")};
  }

  input {
    color: #8d8e8d;
    width: ${props => (props.fullWidth ? "100%" : "30rem")};
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

const Button = styled.button`
  all: unset;
  padding: 0.5rem 1.3rem;
  margin: 0 0.2rem;
  transform: skew(-20deg);
  display: inline-block;
  transition: all 0.2s;
  color: ${color.colorWhite};
  background: ${color.colorPrimary};
  font-size: 1.3rem;
  z-index: 200;
  align-self: ${props => (props.center ? "center" : "flex-start")};

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
`;

class Voucher extends Component {
  state = {
    loading: false,
    voucher: "",
    voucherModal: false,
    voucherValue: "",
    voucherLoading: false
  };

  toggleVoucherModal = () => {
    this.setState({ voucherModal: !this.state.voucherModal });
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  formIsValid = ({ voucher }) => {
    if (
      !isNaN(voucher.split(" ").join("")) !== true ||
      voucher.split(" ").join("").length !== 16
    ) {
      return false;
    }
    return true;
  };

  handleLoadVoucher = async () => {
    this.setState({ voucherLoading: true });
    const payload = {
      pin: this.state.voucher.split(" ").join(""),
      by: this.props.reference
    };
    try {
      const response = await fetch(
        "https://partners.chopbarh.com/ng/api/voucher/use",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            apikey: "6DB6-5936-88"
          },
          body: JSON.stringify(payload)
        }
      );
      const data = await response.json();

      if (data.data) {
        toast.success(`Voucher was successfully loaded`);
        const datePaid = new Date().toISOString();
        const payload = {
          ...data.data,
          transaction_date: datePaid,
          paid_at: datePaid
        };
        this.props.setVoucherValue(data.data.value);
        this.props.setCoinBalance(data.data.value);
        this.props.setVoucherHistory(payload);
        this.setState({
          loading: false,
          voucherLoading: false,
          voucherModal: false,
          voucher: ""
        });
      } else {
        this.setState({
          voucher: "",
          loading: false,
          voucherLoading: false,
          voucherModal: false
        });
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again");
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (!this.formIsValid(this.state)) {
      this.setState({ loading: false });
      // toast.error(`Voucher is not valid`);
      return;
    }

    const postData = {
      pin: this.state.voucher.split(" ").join("")
    };

    const formValue = JSON.stringify(postData);

    try {
      const response = await fetch(
        "https://partners.chopbarh.com/ng/api/voucher/query",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            apikey: "6DB6-5936-88"
          },
          body: formValue
        }
      );
      const data = await response.json();

      if (data.data) {
        this.setState({
          loading: false,
          voucherModal: true,
          voucherValue: data.data.value
        });
      } else {
        this.setState({ loading: false, voucher: "" });
        toast.error(data.message);
      }
    } catch (err) {
      this.setState({ loading: false, voucher: "" });
      toast.error(`Something went wrong`);
    }
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.state.voucherModal}
          toggle={this.toggleVoucherModal}
          style={{
            top: "50%",
            transform: "translateY(-50%)"
          }}
        >
          <ModalBody className="text-center" style={{ minHeight: "7rem" }}>
            <ModalHeader toggle={this.toggleVoucherModal} />
            <p>Load &#8358;{this.state.voucherValue} Voucher?</p>
            <Button
              onClick={this.handleLoadVoucher}
              disabled={this.state.voucherLoading}
            >
              <span style={{ color: "#ffffff" }}>
                {this.state.voucherLoading ? "Loading..." : "Load"}
              </span>
            </Button>
          </ModalBody>
        </Modal>
        <VoucherWrapper className="container p-0">
          <FormWrapper onSubmit={this.handleSubmit} center={this.props.center}>
            <FormItem noHeader={this.props.noHeader}>
              <label>Load Voucher</label>
            </FormItem>
            <FormItem fullWidth={this.props.fullWidth}>
              <NumberFormat
                format="#### #### #### ####"
                name="voucher"
                value={this.state.voucher}
                onChange={this.handleInputChange}
                placeholder="Voucher Code"
              />
            </FormItem>
            <button
              type="submit"
              className="ml-2 mr-2"
              center={this.props.center}
              disabled={
                this.state.loading ||
                this.state.voucher.split(" ").join("").length !== 16
              }
            >
              <span style={{ color: "#ffffff" }}>
                {this.state.loading ? "Loading..." : "Load"}
              </span>
            </button>
          </FormWrapper>
        </VoucherWrapper>
      </>
    );
  }
}

const mapStateToProps = state => ({
  reference: state.auth.id
});

const mapDispatchToProps = {
  setVoucherValue,
  setCoinBalance,
  setVoucherHistory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(Voucher));
