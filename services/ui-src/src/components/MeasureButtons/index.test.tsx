import { render, screen } from "@testing-library/react";
import { MeasureButtons } from "./index";

describe("Test MeasureButtons", () => {
  test("Check that the last saved text renders", () => {
    const { getByText } = render(
      <MeasureButtons lastSavedText="last november" handleSave={() => {}} />
    );

    expect(getByText(/last november/i)).toBeVisible();
  });

  it("Check the button renders an icon when last saved text is Saved Moments Ago", () => {
    render(
      <MeasureButtons lastSavedText="Saved Moments Ago" handleSave={() => {}} />
    );

    const container = screen.getByTestId("last-saved-text");
    const circleCheckIcon = container.querySelector(
      "[data-testid='circle-check-icon']"
    );

    expect(circleCheckIcon).toBeVisible();
  });

  it("Check the button doesnt render icon when last saved text is something else", () => {
    render(
      <MeasureButtons
        lastSavedText="Saved Last November"
        handleSave={() => {}}
      />
    );

    const container = screen.getByTestId("last-saved-text");
    const circleCheckIcon = container.querySelector(
      "[data-testid='circle-check-icon']"
    );

    expect(circleCheckIcon).toEqual(null);
  });
});
