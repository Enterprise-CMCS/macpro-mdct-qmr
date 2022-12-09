import { render, screen, within } from "@testing-library/react";

import { PreviewBanner } from "../PreviewBanner";

const watched = ["My Title", "My Description"];
const testComponent = (
  <PreviewBanner watched={watched} data-testid="preview-banner-test" />
);

describe("Test Preview Banner Item", () => {
  beforeEach(() => {
    render(testComponent);
  });

  test("Preview Banner is visible", () => {
    let element = screen.getByTestId("preview-banner-test");
    expect(element).toBeVisible();
    expect(within(element).getByText(watched[0])).toBeInTheDocument();
    expect(within(element).getByText(watched[1])).toBeInTheDocument();
  });
});
