import { HelpDesk } from "./index";
import { render } from "@testing-library/react";

describe("Test Admin Home.tsx", () => {
  test("Check that the Help Desk home renders", () => {
    const { getByTestId } = render(<HelpDesk />);

    expect(getByTestId("help-desk-home")).toBeVisible();
  });
});
