import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { CombinedRatesPage } from "views";
expect.extend(toHaveNoViolations);

describe("Test Combined Rates Page", () => {
  it("renders", () => {
    render(<CombinedRatesPage />);
    expect(screen.getByText("TBD")).toBeVisible();
  });
  it("passes a11y tests", async () => {
    const { container } = render(<CombinedRatesPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
