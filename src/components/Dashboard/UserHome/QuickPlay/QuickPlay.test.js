import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import QuickPlay from "./QuickPlay";

describe("Renders without Crashing", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <QuickPlay />
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
