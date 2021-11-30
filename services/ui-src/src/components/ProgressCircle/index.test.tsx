import { render, screen } from "@testing-library/react";
import { ProgressCircle } from ".";

describe("Test ProgressCircle", () => {
  test("Check that the Progress Circle renders", () => {
    const { getByText } = render(
      <ProgressCircle currentProgress={14} maxValue={20} />
    );

    expect(getByText(/14 of 20/i)).toBeVisible();
  });

  test("Check that the progress circle changes with updated prop values", () => {
    const { rerender } = render(
      <ProgressCircle currentProgress={5} maxValue={20} />
    );

    expect(screen.getByText(/5 of 20/i)).toBeVisible();

    rerender(<ProgressCircle currentProgress={12} maxValue={20} />);

    expect(screen.getByText(/12 of 20/i)).toBeVisible();
  });
});
