import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  state = {
    error: null
  };

  componentDidCatch = error => {
    this.setState({ error });
  };

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <div>
          <h2 style={{ textAlign: "center" }}>
            {" "}
            Something went wrong. We're working on it
          </h2>
        </div>
      );
    }

    return <div>{this.props.children}</div>;
  }
}
