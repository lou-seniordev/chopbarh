import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import UserNavigation from "./UserNavigation";

describe("Renders without Crashing", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <UserNavigation />
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
