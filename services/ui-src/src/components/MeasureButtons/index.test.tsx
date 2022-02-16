import { render, screen } from "@testing-library/react";
import { MeasureButtons } from "./index";

describe("Test MeasureButtons", () => {
  it("Check the button renders an icon when last saved text is Saved Moments Ago", () => {
    render(
      <MeasureButtons handleSave={() => {}} lastAltered={1643771392904} />
    );

    const container = screen.getByTestId("last-saved-text");
    const circleCheckIcon = container.querySelector(
      "[data-testid='circle-check-icon']"
    );

    expect(circleCheckIcon).toBeVisible();
  });
});
