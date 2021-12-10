import { render } from "@testing-library/react";
import { DateRange } from ".";
import { TestWrapper } from "components/TestWrapper";
import { useCustomRegister } from "hooks/useCustomRegister";

const TestDateRange = () => {
  return (
    <TestWrapper>
      <DateRange {...useCustomRegister("test-comp")} />
    </TestWrapper>
  );
};

describe("Test DateRange", () => {
  test("Check DateRange Renders", () => {
    const screen = render(<TestDateRange />);

    expect(screen.getByText(/Start Date/i)).toBeVisible();
  });

  test("Check that input labels get rendered correctly", () => {
    const screen = render(<TestDateRange />);

    expect(screen.getByLabelText(/month/i)).toBeVisible();
    expect(screen.getByLabelText(/year/i)).toBeVisible();
  });
});
