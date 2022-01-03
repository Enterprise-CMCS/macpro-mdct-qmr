import { fireEvent, render, screen } from "@testing-library/react";
import { MeasureButtons } from "./index";

describe("Test MeasureButtons", () => {
  test("Check that the last saved text renders", () => {
    const { getByText } = render(
      <MeasureButtons
        lastSavedText="last november"
        handleSubmit={() => {}}
        handleSave={() => {}}
      />
    );

    expect(getByText(/last november/i)).toBeVisible();
  });

  it("Check the button renders an icon when last saved text is Saved Moments Ago", () => {
    render(
      <MeasureButtons
        lastSavedText="Saved Moments Ago"
        handleSubmit={() => {}}
        handleSave={() => {}}
      />
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
        handleSubmit={() => {}}
        handleSave={() => {}}
      />
    );

    const container = screen.getByTestId("last-saved-text");
    const circleCheckIcon = container.querySelector(
      "[data-testid='circle-check-icon']"
    );

    expect(circleCheckIcon).toEqual(null);
  });

  it("handleSubmit fires when a submit button is clicked", () => {
    const mockChangeFn = jest.fn();
    const { getByText } = render(
      <MeasureButtons
        lastSavedText="Saved Last November"
        handleSubmit={mockChangeFn}
        handleSave={() => {}}
      />
    );

    fireEvent.click(getByText(/Complete Measure/i));

    expect(mockChangeFn).toHaveBeenCalled();
  });
});
