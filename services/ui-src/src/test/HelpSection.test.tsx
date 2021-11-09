import HelpSection from "components/HelpSection";
import { render } from "@testing-library/react";

describe("Test Header.tsx", () => {
  test("Check the main element, with classname for the help section, exists", () => {
    const { getByTestId } = render(<HelpSection />);

    expect(getByTestId("help-section")).toBeVisible();
  });
});
