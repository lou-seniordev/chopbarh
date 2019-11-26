import React, { Component, memo } from "react";
import { Helmet } from "react-helmet";
import Header from "../UI/Header/Header";
import {
  SignUpWrapper,
  Container,
  HeadingTwo,
  Form,
  FormItem
} from "../styles/SignUpStyles";
import { Spinner } from "reactstrap";

class SuperAgentApplication extends Component {
  state = {
    firstname: "",
    lastname: "",
    dob: "",
    state: "",
    email: "",
    gender: "",
    phone: "",
    loading: true,
    submitting: false,
    states: null
  };

  componentDidMount = async () => {
    const statesRequest = await fetch(
      "http://locationsng-api.herokuapp.com/api/v1/states"
    );
    const statesResponse = await statesRequest.json();

    this.setState({ loading: false, states: statesResponse });
  };

  //   TODO: Handle Error State too

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    // vValidate form here and submit
  };

  render() {
    return (
      <>
        <Helmet title={`Chopbarh \u{2192} Sign Up`} />
        <Header />
        <SignUpWrapper>
          <Container>
            {this.state.loading ? (
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
              <Form>
                <HeadingTwo className="mb-4">
                  Super Agent Application
                </HeadingTwo>
                <FormItem>
                  <label>First Name</label>
                  <input
                    type="text"
                    value={this.state.firstname}
                    name="name"
                    onChange={this.handleInputChange}
                    required
                  />
                </FormItem>
                <FormItem>
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={this.state.lastname}
                    name="name"
                    onChange={this.handleInputChange}
                    required
                  />
                </FormItem>
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
                <FormItem>
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={this.state.phone}
                    name="phone"
                    onChange={this.handleInputChange}
                    required
                  />
                </FormItem>
                <FormItem className="mr-3">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    value={this.state.dob}
                    name="dob"
                    onChange={this.handleInputChange}
                    required
                    max="2000-01-01"
                  />
                </FormItem>
                <FormItem>
                  <label>Gender</label>
                  <select
                    value={this.state.gender}
                    name="gender"
                    onChange={this.handleInputChange}
                    required
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </FormItem>
                <FormItem>
                  <label>State</label>
                  <select
                    value={this.state.state}
                    name="state"
                    onChange={this.handleInputChange}
                    required
                  >
                    {this.state.states.map(state => (
                      <option key={state.name} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </FormItem>
                <button type="submit" className="mr-2">
                  <span>Submit</span>
                </button>
              </Form>
            )}
          </Container>
        </SignUpWrapper>
      </>
    );
  }
}

export default memo(SuperAgentApplication);
