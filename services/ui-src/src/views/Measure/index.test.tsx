import { Measure } from "./index";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

describe("Test measure.tsx", () => {
  test("Check that the measure renders", () => {
    const result = render(
      <Router>
        <Measure />
      </Router>
    );

    expect(result.getByTestId("measure")).toBeVisible();
  });
});
