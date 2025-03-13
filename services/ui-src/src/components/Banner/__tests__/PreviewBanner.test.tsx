import { render, screen } from "@testing-library/react";

import { PreviewBanner } from "../PreviewBanner";
import { toHaveNoViolations } from "jest-axe";
import axe from "@ui-src/axe-helper";
expect.extend(toHaveNoViolations);
const watched = ["My Title", "My Description", "My Link"];
const testComponent = <PreviewBanner watched={watched} />;

jest.mock("react-hook-form", () => ({
  useFormContext: () => ({
    getValues: jest.fn().mockReturnValue({
      bannerTitle: watched[0],
      bannerDescription: watched[1],
      bannerLink: watched[2],
    }),
  }),
}));

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
