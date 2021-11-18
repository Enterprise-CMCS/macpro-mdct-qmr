import BOHome from "pages/BOHome";
import { render } from "@testing-library/react";

describe("Test BOHome.tsx", () => {
  test("Check that the BO home renders", () => {
    const { getByTestId } = render(<BOHome />);

    expect(getByTestId("bo-home")).toBeVisible();
  });
});
