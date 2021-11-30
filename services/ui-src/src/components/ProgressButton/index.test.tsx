import { render, screen } from "@testing-library/react";
import { ProgressButton } from ".";

describe("Test ProgressButton", () => {
  test("Check that the Progress Button renders", () => {
    const { getByText } = render(
      <ProgressButton currentProgress={14} maxValue={20} />
    );

    expect(getByText(/14 of 20/i)).toBeVisible();
  });

  test("Check that the progress button changes with updated prop values", () => {
    const { rerender } = render(
      <ProgressButton currentProgress={5} maxValue={20} />
    );

    expect(screen.getByText(/5 of 20/i)).toBeVisible();

    rerender(<ProgressButton currentProgress={12} maxValue={20} />);

    expect(screen.getByText(/12 of 20/i)).toBeVisible();
  });
});
