import StateHome from "containers/StateHome";
import { render } from "@testing-library/react";

describe("Test StateHome.tsx", () => {
  test("Check that the State home renders", () => {
    const { getByTestId } = render(<StateHome />);

    expect(getByTestId("state-home")).toBeVisible();
  });
});
