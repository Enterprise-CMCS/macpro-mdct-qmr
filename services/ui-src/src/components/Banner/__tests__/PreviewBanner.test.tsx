import { render, screen } from "@testing-library/react";

import { PreviewBanner } from "../PreviewBanner";
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);
const watched = ["My Title", "My Description"];
const testComponent = <PreviewBanner watched={watched} />;

describe("Test Preview Banner Item", () => {
  beforeEach(() => {
    render(testComponent);
  });

  test("Preview Banner is visible", () => {
    expect(screen.getByText(watched[0])).toBeInTheDocument();
    expect(screen.getByText(watched[1])).toBeInTheDocument();
  });
});

describe("Test PreviewBanner accessibility", () => {
  test("Should not have basic accessibility issues", async () => {
    const { container } = render(testComponent);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
