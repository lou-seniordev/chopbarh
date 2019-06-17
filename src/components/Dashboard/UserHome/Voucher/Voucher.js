import React, { Component, memo } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";
import color from "../../../styles/colors";
import { setVoucherValue } from "../../../../store/actions/voucherActions";
import { setCoinBalance } from "../../../../store/actions/coinBalanceActions";

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
    voucher: ""
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

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (!this.formIsValid(this.state)) {
      this.setState({ loading: false });
      // toast.error(`Voucher is not valid`);
      return;
    }

    const postData = {
      pin: this.state.voucher.split(" ").join(""),
      by: this.props.reference
    };

    const formValue = JSON.stringify(postData);

    try {
      const response = await fetch(
        "https://cors-anywhere.herokuapp.com/https://partners.chopbarh.com/ng/api/voucher/use",
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
      if (response.status === 200) {
        toast.success(`Voucher was successfully loaded`);
        this.props.setVoucherValue(data.data.value);
        this.props.setCoinBalance(data.data.value);
        this.setState({
          loading: false,
          voucher: ""
        });
      } else if (response.status === 404) {
        this.setState({ voucher: "", loading: false });
        toast.error(data.message);
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
      <VoucherWrapper className="container pl-0">
        <FormWrapper onSubmit={this.handleSubmit}>
          <form>
            <FormItem>
              <label>Load Voucher</label>
            </FormItem>
            <FormItem>
              {/* <input
                type="text"
                name="voucher"
                value={this.state.voucher}
                onChange={this.handleInputChange}
                placeholder="Voucher Code"
              /> */}
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
              disabled={
                this.state.loading ||
                this.state.voucher.split(" ").join("").length !== 16
              }
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
)(memo(Voucher));
