import React, { Component, memo } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import Header from "../UI/Header/Header";
import {
  SignUpWrapper,
  Container,
  HeadingTwo,
  Form,
  FormItem,
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
    chopbarh_phone: "",
    alternate_phone: "",
    address: "",
    city: "",
    type: "Individual",
    description: "",
    loading: true,
    submitting: false,
    states: [],
    error: false,
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
          state: statesResponse.data[0].info.officialName,
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

  formIsValid = ({ chopbarh_phone }) => {
    if (chopbarh_phone.length !== 11 || !isNaN(chopbarh_phone) !== true) {
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
      chopbarh_phone,
      alternate_phone,
      dob,
      address,
      type,
      description,
      city,
    } = this.state;
    // Submit to Firestore
    try {
      const { id } = await firestore.collection("super_agent").add({
        firstname,
        lastname,
        email,
        gender,
        state,
        chopbarh_phone_number: chopbarh_phone,
        alternate_phone,
        address,
        type,
        city,
        description,
        DOB: dob,
        applied_at: Date.now(),
        time: new Date().toString(),
      });

      if (id) {
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
          type: "Individual",
          chopbarh_phone: "",
          alternate_phone: "",
          address: "",
          description: "N/A",
          city: "",
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
          type: "Individual",
          chopbarh_phone: "",
          alternate_phone: "",
          address: "",
          description: "N/A",
          city: "",
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
        <Helmet title={`Chopbarh \u{2192} Chopbarh Agent Application`} />
        <Header />
        <SignUpWrapper>
          <Container>
            {this.state.loading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "5rem",
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
                      marginTop: "5rem",
                    }}
                  >
                    <p>There was an error while loading this Page</p>
                  </div>
                ) : (
                  <Form onSubmit={this.handleSubmit}>
                    <HeadingTwo className="mb-4">
                      Chopbarh Agent Application
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
                      <label>Sex</label>
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
                      <label>Type</label>
                      <select
                        value={this.state.type}
                        name="type"
                        onChange={this.handleInputChange}
                        required
                      >
                        <option value="Individual">Individual</option>
                        <option value="Business">Business</option>
                      </select>
                    </FormItem>
                    {this.state.type === "Business" && (
                      <FormItem>
                        <label>Description</label>
                        <input
                          type="textarea"
                          value={this.state.description}
                          name="description"
                          onChange={this.handleInputChange}
                          required
                        />
                      </FormItem>
                    )}
                    <FormItem>
                      <label>Chopbarh Phone Number</label>
                      <input
                        type="text"
                        value={this.state.chopbarh_phone}
                        name="chopbarh_phone"
                        onChange={this.handleInputChange}
                        required
                      />
                    </FormItem>
                    <FormItem>
                      <label>Alternate Phone Number</label>
                      <input
                        type="text"
                        value={this.state.alternate_phone}
                        name="alternate_phone"
                        onChange={this.handleInputChange}
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
                      <label>Address</label>
                      <input
                        type="text"
                        value={this.state.address}
                        name="address"
                        onChange={this.handleInputChange}
                        required
                      />
                    </FormItem>
                    <FormItem>
                      <label>City</label>
                      <input
                        type="text"
                        value={this.state.city}
                        name="city"
                        onChange={this.handleInputChange}
                        required
                      />
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
                      <span
                        style={{
                          " -webkit-text-fill-color": rgba(255, 255, 255, 1),
                          "-webkit-opacity": 1,
                          color: rgba(255, 255, 255, 1),
                        }}
                      >
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
