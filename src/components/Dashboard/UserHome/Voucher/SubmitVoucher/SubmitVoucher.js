import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Modal, ModalBody } from "reactstrap";
import color from "../../../styles/colors";

const VoucherWrapper = styled.div`
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

class SubmitVoucher extends Component {
  state = {
    loading: false,
    voucherModal: false,
    voucher: ""
  };

  voucherUsedModalToggle = () => {
    this.setState({ voucherModal: !this.state.voucherModal });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (!this.formIsValid(this.state)) {
      this.setState({ loading: false });
      return;
    }

    const postData = {
      serial: this.state.voucher
    };

    // formState.values["by"] = localStorage.getItem("chopbarh-id")
    //   ? localStorage.getItem("chopbarh-id")
    //   : null;
    const formValue = JSON.stringify(postData);

    try {
      const response = await fetch(
        "https://private-anon-f26b43aaeb-chopbarhapi.apiary-mock.com/api/secured/vouchers/value",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            apiKey: "C213-E3C9-C7"
            //Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU1ODEwNjc2MzA1YjhlYzgwZjkxYzE2ZjBjYWE0NTU3MGYyYWQxMTA3OGFkMzdkZmZhYWM1YzE1OTA3MjA2NmUxMGUxZmQ0NTY2YzdhZWY1In0.eyJhdWQiOiIxIiwianRpIjoiZTU4MTA2NzYzMDViOGVjODBmOTFjMTZmMGNhYTQ1NTcwZjJhZDExMDc4YWQzN2RmZmFhYzVjMTU5MDcyMDY2ZTEwZTFmZDQ1NjZjN2FlZjUiLCJpYXQiOjE1NTUxMTczODksIm5iZiI6MTU1NTExNzM4OSwiZXhwIjoxNTg2NzM5Nzg5LCJzdWIiOiIwNzVkOTM4MC05MTdmLTExZTgtYmQ4Yy1kNzU0YTJlOTlhMjMiLCJzY29wZXMiOltdfQ.SjLzlUTJZ5Aa9T7XhVkWDRLqk87iO1AvNdmA1_G7KODpQmaOoIsAXLB9DmuYijxfOejFIa89kwzHOM5S5IUNUOddyDtUR0Cb8l94igllauLHINOyihJ4rW04xEdGLpobyssSXUiwEjtu1q6HCHOrdQx-3AM6h9zYBPH047nTjyUUmq3d3eFIKC_s7A1rYr5hHCgJQk8-AYJrca8v_qhvTyB_XX48Van2K1-e8BSIskC_5R14946S7x1B83dKC96zac8tHCqtt6rdhF32JyJgnn-OQe9y2QjqGPXF0i3oLvAr1Y2AWTkul3wqkOQ4gmiD77TOFDlnXslCuNw1nYgNJlfLwuvVa9UuG-3bODC8zKhhPjDkJkEEiz3umGYJ7MluDP2WfAwYjkaEFpfTVy6lNJT91h0AHpRiNUZzW5FBKboXDStm8r7n9caOsQ2vyOfPZOZ53Hyc4skAL5wX47-Yr6zN3Keb9d3MnpHKZ9EbXpoFyMys4FBy5BMtER3fFH4GA2RROevpBYdxRenwMyVl39aQKVRaVQHxVPoYA7voMQuVY1iI-nykJpjhoJNsNsNiKE2P0x3bLxQxCCVuSujzJ-zByd8HP-GIwzn-zh1BvFWA9-5EF7qcnso7ttrXgrF4FuSwCH1y4YSaWu3l0LgyJ3K4pCtKl6FKiU0ttrsLNIE`
          },
          body: formValue
        }
      );
      const data = await response.json();
      console.log(data, response.status);
      if (response.status === 200) {
        this.props.setVoucherValue(data.data.value);
        this.setState({ loading: false });
        // Open the modal here
        // const value = data.data.value;
      } else if (response.status === 422) {
        // setVoucherUsedModal(true);
        this.setState({ loading: false });
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
        <div className="d-flex">
          <button className="ml-2 mr-2" disabled={this.state.loading}>
            <span>{this.state.loading ? "Loading..." : "Load"}</span>
          </button>
          <button className="ml-2 mr-2" disabled={this.state.loading}>
            <span>{"Cancel"}</span>
          </button>
        </div>
      </VoucherWrapper>
    );
  }
}

const mapDispatchToProps = {};

export default connect(
  null,
  mapDispatchToProps
)(SubmitVoucher);
