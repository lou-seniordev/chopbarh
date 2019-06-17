import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
// import { Spinner } from "reactstrap";
// import { toast } from "react-toastify";
// import axios from "axios";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";
// import keys from "../../../../config/keys";

const ChangePinWrapper = styled.div`
  z-index: 2000;
  padding: 2rem 10rem;

  @media only screen and (max-width: ${breakPoints.small}) {
    padding: 20rem 5rem;
  }

  @media only screen and (max-width: ${breakPoints.smaller}) {
    padding: 20rem 0rem;
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
    name: ""
  };

  componentDidMount = () => {};

  componentDidUpdate = prevProps => {};

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
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
                    type="password"
                    value={this.state.name}
                    name="name"
                    disabled
                    className="mr-2"
                    onChange={this.handleInputChange}
                    required
                  />
                </FormItem>
                <FormItem>
                  <label>New Pin</label>
                  <input
                    type="password"
                    value={this.state.phone}
                    name="phone"
                    disabled
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
  loading: state.player.loading,
  playerData: state.player.playerData
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePinForm);
