import HelpDeskHome from "pages/HelpDesk";
import { render } from "@testing-library/react";

describe("Test Admin Home.tsx", () => {
  test("Check that the Help Desk home renders", () => {
    const { getByTestId } = render(<HelpDeskHome />);

    expect(getByTestId("help-desk-home")).toBeVisible();
  });
});
