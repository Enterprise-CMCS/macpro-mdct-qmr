import { render, fireEvent } from "@testing-library/react";
import * as QMR from "components";

describe("Test MonthPicker", () => {
  test("Check MonthPicker Renders", () => {
    const { getByRole } = render(<QMR.MonthPicker onChange={() => {}} />);

    expect(getByRole("button", { name: /Month Picker/i })).toBeVisible();
  });

  test("Check passed year is focused", () => {
    const { getByRole, getByText } = render(
      <QMR.MonthPicker selectedYear={1995} onChange={() => {}} />
    );

    expect(getByRole("button", { name: /Month Picker/i })).toBeVisible();
    expect(getByText("1995")).toBeVisible;
  });

  test("onChange Fires when a month is selected", () => {
    const mockChangeFn = jest.fn();
    const { getByRole } = render(
      <QMR.MonthPicker selectedYear={1995} onChange={mockChangeFn} />
    );

    fireEvent.click(getByRole("button", { name: /Month Picker/i }));
    fireEvent.click(getByRole("button", { name: /January/i }));

    expect(mockChangeFn).toHaveBeenCalled();
  });
});
