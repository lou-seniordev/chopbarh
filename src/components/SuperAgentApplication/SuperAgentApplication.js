import React, { Component, memo } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import Header from "../UI/Header/Header";
import {
  SignUpWrapper,
  Container,
  HeadingTwo,
  Form,
  FormItem
} from "../styles/SignUpStyles";
import { Spinner } from "reactstrap";
import { firestore } from "../../firebase";

class SuperAgentApplication extends Component {
  state = {
    firstname: "",
    lastname: "",
    dob: "",
    state: "",
    email: "",
    gender: "Male",
    phone: "",
    loading: true,
    submitting: false,
    states: [],
    error: false
  };

  componentDidMount = async () => {
    try {
      const statesRequest = await fetch(
        "https://nigerian-states-info.herokuapp.com/api/v1/states"
      );
      const statesResponse = await statesRequest.json();

      if (statesResponse.data) {
        this.setState({
          loading: false,
          states: statesResponse.data,
          state: statesResponse.data[0].info.officialName
        });
      } else {
        this.setState({ loading: false, error: true });
        toast.error("Page could not be loaded");
      }
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  formIsValid = ({ phone }) => {
    if (phone.length !== 11 || !isNaN(phone) !== true) {
      return false;
    }
    return true;
  };

  handleSubmit = async event => {
    event.preventDefault();

    // Validate form here and submit
    if (!this.formIsValid(this.state)) {
      toast.error("Form is not Valid");
      return;
    }

    this.setState({ submitting: true });

    const {
      firstname,
      lastname,
      email,
      gender,
      state,
      phone,
      dob
    } = this.state;
    // Submit to Firestore
    try {
      const ref = await firestore.collection("super_agent").add({
        firstname,
        lastname,
        email,
        gender,
        state,
        phone_number: phone,
        DOB: dob
      });

      if (ref.id) {
        toast.success(
          "Your application has been sent. You will receive a feedback soon."
        );
        this.setState({
          submitting: false,
          firstname: "",
          lastname: "",
          dob: "",
          state: "",
          email: "",
          gender: "Male",
          phone: ""
        });
      } else {
        toast.error("Your application was not sent. Please try again later.");
        this.setState({
          submitting: false,
          firstname: "",
          lastname: "",
          dob: "",
          state: "",
          email: "",
          gender: "Male",
          phone: ""
        });
      }
    } catch (err) {
      toast.error(
        "There was an error during the submission. Please try again later."
      );
      this.setState({ submitting: false });
    }
  };

  render() {
    return (
      <>
        <Helmet title={`Chopbarh \u{2192} Super Agent Application`} />
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
              <>
                {!this.state.states.length ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "5rem"
                    }}
                  >
                    <p>There was an error while loading this Page</p>
                  </div>
                ) : (
                  <Form onSubmit={this.handleSubmit}>
                    <HeadingTwo className="mb-4">
                      Super Agent Application
                    </HeadingTwo>
                    <FormItem>
                      <label>First Name</label>
                      <input
                        type="text"
                        value={this.state.firstname}
                        name="firstname"
                        onChange={this.handleInputChange}
                        required
                      />
                    </FormItem>
                    <FormItem>
                      <label>Last Name</label>
                      <input
                        type="text"
                        value={this.state.lastname}
                        name="lastname"
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
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
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
                          <option
                            key={state.Name}
                            value={state.info.officialName}
                          >
                            {state.info.officialName}
                          </option>
                        ))}
                      </select>
                    </FormItem>
                    <button
                      type="submit"
                      className="mr-2"
                      disabled={this.state.submitting}
                    >
                      <span>
                        {this.state.submitting ? "Please wait..." : "Submit"}
                      </span>
                    </button>
                  </Form>
                )}
              </>
            )}
          </Container>
        </SignUpWrapper>
      </>
    );
  }
}

export default memo(SuperAgentApplication);
