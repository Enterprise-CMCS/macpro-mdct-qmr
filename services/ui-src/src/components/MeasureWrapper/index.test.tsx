import React from "react";
import { render, screen } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { MeasureWrapper } from "./";

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

describe("Test Measure Wrapper Component", () => {
  it("renders the form component", () => {
    expect(screen.getByTestId("measure-wrapper-form")).toBeInTheDocument();
  });

  it("renders the state layout", () => {
    expect(screen.getByTestId("state-layout-container")).toBeInTheDocument();
  });
});
