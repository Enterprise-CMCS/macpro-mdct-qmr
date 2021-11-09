import Measure from "containers/Measure";
import { render } from "@testing-library/react";

describe("Test measure.tsx", () => {
  test("Check that the measure renders", () => {
    const { getByTestId } = render(<Measure />);

    expect(getByTestId("measure")).toBeVisible();
  });
});
