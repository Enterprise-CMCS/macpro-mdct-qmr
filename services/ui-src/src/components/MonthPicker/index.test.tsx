import { render, fireEvent, waitFor } from "@testing-library/react";
import * as QMR from "components";

describe("Test MonthPicker", () => {
  test("Check MonthPicker Renders", () => {
    const { getByRole } = render(
      <QMR.MonthPickerCalendar onChange={() => {}} />
    );

    expect(getByRole("button", { name: /Month Picker/i })).toBeVisible();
  });

  test("Check passed year is focused", () => {
    const { getByRole, getByText } = render(
      <QMR.MonthPickerCalendar selectedYear={"1995"} onChange={() => {}} />
    );

    expect(getByRole("button", { name: /Month Picker/i })).toBeVisible();
    expect(getByText("1995")).toBeVisible;
  });

  test("onChange Fires when a month is selected", async () => {
    const mockChangeFn = jest.fn();
    const { getByRole, findByRole } = render(
      <QMR.MonthPickerCalendar selectedYear={"1995"} onChange={mockChangeFn} />
    );

    fireEvent.click(getByRole("button", { name: /Month Picker/i }));
    const button = await findByRole("button", { name: /January/i });
    fireEvent.click(button);

    expect(mockChangeFn).toHaveBeenCalled();
  });

  test("Locked Year Picker has no year toggle buttons", async () => {
    const { getByRole, queryByLabelText } = render(
      <QMR.MonthPickerCalendar yearLocked={true} onChange={() => {}} />
    );

    fireEvent.click(getByRole("button", { name: /Month Picker/i }));
    await waitFor(() => {
      expect(queryByLabelText(/Previous Year/i)).not.toBeInTheDocument();
    });
  });
});
