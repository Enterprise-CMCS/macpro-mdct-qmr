import { render, screen } from "@testing-library/react";
import { createElement } from "react";
import { RouterWrappedComp } from "utils/testing";
import { MeasureWrapper } from "./";
import { useApiMock } from "utils/testUtils/useApiMock";

describe("Test Measure Wrapper Component", () => {
  beforeEach(() => {
    const div = createElement("div");
    useApiMock({});
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
});
