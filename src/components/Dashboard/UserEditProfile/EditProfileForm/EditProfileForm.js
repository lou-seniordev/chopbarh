import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Spinner } from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";
import color from "../../../styles/colors";
import breakPoints from "../../../styles/breakpoints";

const EditProfileWrapper = styled.div`
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
  min-height: 40rem;

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

      @media screen and (min-color-index: 0) and(-webkit-min-device-pixel-ratio:0) {
        color: #ffffff;
      }
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

class EditProfileForm extends Component {
  state = {
    loading: false,
    name: "",
    phone: "",
    dob: "",
    sex: "",
    email: ""
  };

  componentDidMount = () => {
    if (this.props.playerData !== null) {
      const { FullName, PhoneNum, DOB, Sex, Email } = this.props.playerData;
      this.setState({
        name: FullName,
        phone: PhoneNum,
        dob: this.getDate(DOB),
        sex: Sex,
        email: Email
      });
    }
  };

  componentDidUpdate = prevProps => {
    if (this.props !== prevProps) {
      const { FullName, PhoneNum, DOB, Sex, Email } = this.props.playerData;
      this.setState({
        name: FullName,
        phone: PhoneNum,
        dob: this.getDate(DOB),
        sex: Sex,
        email: Email
      });
    }
  };

  getDate = date => {
    const month =
      Number(
        new Date(
          date
            .split("/")
            .reverse()
            .join("/")
        ).getMonth()
      ) + 1;
    return `${new Date(
      date
        .split("/")
        .reverse()
        .join("/")
    ).getFullYear()}-0${month}-${new Date(
      date
        .split("/")
        .reverse()
        .join("/")
    ).getDate()}`;
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = async  event => {
    event.preventDefault();
    this.setState({ loading: true });

    const postData = {
      FULL_NAME: this.state.name,
      DOB: this.state.dob,
      SEX: this.state.sex.split("")[0],
      EMAIL: this.state.email
    };

    postData["@class"] = ".LogEventRequest";
    postData["eventKey"] = "PLAYER_PROFILE_UPDATE";
    postData["playerId"] = this.props.id;
    const formValue = JSON.stringify(postData);

    // axios(
    //   `https://${keys.apiKeyPrefix}.gamesparks.net/rs/debug/${
    //     keys.apiKeySuffix
    //   }/LogEventRequest`,
    //   {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json"
    //     },
    //     data: formValue
    //   }
    // )
    //   .then(response => {
    //     if (response.data.error) {
    //       this.setState({ loading: false });
    //       toast.error("Profile was not updated. Please, try again");
    //     } else {
    //       this.setState({ loading: false });
    //       toast.success("Profile was successfully updated.");
    //     }
    //   })
    //   .catch(err => {
    //     this.setState({ loading: false });
    //   });
  };

  render() {
    return (
      <>
        <EditProfileWrapper>
          <Container>
            {this.props.loading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "5rem"
                }}
              >
                <Spinner />
              </div>
            ) : (
              <Form onSubmit={this.handleSubmit}>
                <HeadingTwo className="mb-4">Profile</HeadingTwo>
                <FormItem>
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={this.state.name}
                    name="name"
                    disabled
                    onChange={this.handleInputChange}
                    required
                  />
                </FormItem>
                <FormItem>
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={this.state.phone}
                    name="phone"
                    disabled
                    onChange={this.handleInputChange}
                    required
                  />
                </FormItem>
                <HalfColumn>
                  <FormItem className="mr-3">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      value={this.state.dob}
                      name="dob"
                      disabled
                      onChange={this.handleInputChange}
                      required
                      max="2010-01-01"
                    />
                  </FormItem>
                  <FormItem>
                    <label>Sex</label>
                    <select
                      value={this.state.sex}
                      name="sex"
                      disabled
                      onChange={this.handleInputChange}
                      required
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </FormItem>
                </HalfColumn>
                <FormItem>
                  <label>Email</label>
                  <input
                    type="email"
                    value={this.state.email}
                    name="email"
                    onChange={this.handleInputChange}
                    required
                  />
                </FormItem>
                <button
                  type="submit"
                  className="mr-2"
                  disabled={this.state.loading}
                >
                  <span style={{ color: "#ffffff" }}>
                    {this.state.loading ? "Saving..." : "Save"}
                  </span>
                </button>
              </Form>
            )}
          </Container>
        </EditProfileWrapper>
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
)(EditProfileForm);
