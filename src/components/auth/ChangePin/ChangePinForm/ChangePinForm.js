import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import NumberFormat from "react-number-format";
// import { Spinner } from "reactstrap";
import { toast } from "react-toastify";
// import axios from "axios";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";
import keys from "../../../../config/keys";

const ChangePinWrapper = styled.div`
  z-index: 2000;
  padding: 2rem 10rem;

  @media only screen and (max-width: ${breakPoints.small}) {
    padding: 2rem 5rem;
  }

  @media only screen and (max-width: ${breakPoints.smaller}) {
    padding: 2rem 0rem;
  }
`;

const Container = styled.div`
  margin: 2rem auto;
  width: 60vw;
  background: #fff;
  padding: 4rem 10rem;
  box-shadow: 0px 18px 31px 0px rgba(214, 207, 214, 0.83);
  min-height: 25rem;

  @media only screen and (max-width: ${breakPoints.mediumLite}) {
    padding: 4rem 5rem;
  }

  @media only screen and (max-width: ${breakPoints.small}) {
    width: 80vw;
    padding: 4rem 1rem;
  }
`;

const HeadingTwo = styled.h2`
  font-size: 2.5rem;
  color: ${color.colorPrimary};
  font-weight: bold;
`;

const Form = styled.form`
  position: relative;

  button {
    all: unset;
    padding: 0.5rem 1.3rem;
    display: inline-block;
    position: absolute;
    left: 50%;
    transform: skew(-20deg) translateX(-50%);
    transition: all 0.2s;
    color: ${color.colorWhite};
    background: ${color.colorPrimary};
    font-size: 1.3rem;
    z-index: 200;

    @media only screen and (max-width: ${breakPoints.mediumLite}) {
      font-size: 1.1rem;
    }

    span {
      display: inline-block;
      transform: skew(20deg);
      color: #fff;
    }

    &:hover {
      transform: translateY(-3px) skew(-20deg) translateX(-50%);
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

  input,
  select {
    color: #8d8e8d;
    width: 100%;
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

const HalfColumn = styled.div`
  display: flex;

  @media only screen and (max-width: ${breakPoints.large}) {
    flex-direction: column;
  }

  div {
    width: 50%;

    @media only screen and (max-width: ${breakPoints.large}) {
      width: 100%;
    }
  }
`;

class ChangePinForm extends Component {
  state = {
    loading: false,
    oldPin: "",
    newPin: ""
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  formIsValid = ({ oldPin, newPin }) => {
    if (
      oldPin.length !== 4 ||
      !isNaN(oldPin) !== true ||
      newPin.length !== 4 ||
      !isNaN(newPin) !== true
    ) {
      return false;
    }
    return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (!this.formIsValid(this.state)) {
      this.setState({ loading: false });
      toast.error("Pleae fill form fields correctly");
      return;
    }

    const newState = { ...this.state };
    const formState = {
      NEW: newState.newPin,
      OLD: newState.oldPin,
      playerId: this.props.id
    };
    formState["@class"] = ".LogEventRequest";
    // formState["eventKey"] = "REGISTER_CHANGE_PASSWORD";
    const formValue = JSON.stringify(formState);

    fetch(
      `https://${keys.apiKeyPrefix}.gamesparks.net/rs/debug/${
        keys.apiKeySuffix
      }/LogEventRequest`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: formValue
      }
    )
      .then(response => response.json())
      .then(data => {
        console.log(data, Object.values(data.error));
        // if (
        //   Object.values(data.error).length ||
        //   Object.values(data.scriptData).length
        // ) {
        //   toast.error("Password was not reset successfully");
        //   this.setState({ oldPin: "", newPin: "", loading: false });
        // } else {
        //   toast.success("Password was reset successfully");
        // }
      })
      .catch(err => {
        toast.error("Something went wrong.");
      });
  };

  render() {
    return (
      <>
        <ChangePinWrapper>
          <Container>
            <Form onSubmit={this.handleSubmit}>
              <HeadingTwo className="mb-4">Change Pin</HeadingTwo>
              <HalfColumn>
                <FormItem>
                  <label>Old Pin</label>
                  <input
                    minLength="4"
                    maxLength="4"
                    type="password"
                    value={this.state.oldPin}
                    name="oldPin"
                    className="mr-2"
                    onChange={this.handleInputChange}
                    required
                  />
                </FormItem>
                <FormItem>
                  <label>New Pin</label>
                  <input
                    minLength="4"
                    maxLength="4"
                    type="password"
                    value={this.state.newPin}
                    name="newPin"
                    className="ml-lg-2"
                    onChange={this.handleInputChange}
                    required
                  />
                </FormItem>
              </HalfColumn>
              <button
                type="submit"
                className="mr-2"
                disabled={this.state.loading}
              >
                <span>{this.state.loading ? "Plaese wait..." : "Change"}</span>
              </button>
            </Form>
          </Container>
        </ChangePinWrapper>
      </>
    );
  }
}

const mapStateToProps = state => ({
  id: state.auth.id,
  loading: state.player.loading
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePinForm);
