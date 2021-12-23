import React from "react";
import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { MeasureWrapper } from "./";

describe("Test Measure Wrapper Component", () => {
  beforeEach(() => {
    const div = React.createElement("div");
    render(
      <RouterWrappedComp>
        <MeasureWrapper
          measure={div}
          name="testing"
          year="2021"
          measureId="AMMAD"
        />
      </RouterWrappedComp>
    );
  });
  it("renders the form component", () => {
    expect(screen.getByTestId("measure-wrapper-form")).toBeInTheDocument();
  });

  it("renders the state layout", () => {
    expect(screen.getByTestId("state-layout-container")).toBeInTheDocument();
  });
});
