import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import UserHeader from "./UserHeader";

describe("Renders without Crashing", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <UserHeader />
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
