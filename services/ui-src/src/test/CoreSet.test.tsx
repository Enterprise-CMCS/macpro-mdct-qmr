import CoreSet from "containers/CoreSet";
import { render } from "@testing-library/react";

describe("Test CoreSet.tsx", () => {
  test("Check that the contact us renders", () => {
    const { getByTestId } = render(<CoreSet />);

    expect(getByTestId("core-set")).toBeVisible();
  });
});
