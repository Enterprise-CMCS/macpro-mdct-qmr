import { waitFor, fireEvent } from "@testing-library/react";
import { DateRange } from ".";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";

describe("Test DateRange", () => {
  test("Check DateRange Renders", () => {
    const screen = renderWithHookForm(<DateRange name="testComponent" />);

    expect(screen.getByText(/Start Date/i)).toBeInTheDocument();
  });

  test("Check that input labels get rendered correctly", () => {
    const screen = renderWithHookForm(<DateRange name="testComponent" />);

    expect(screen.getAllByLabelText(/month/i)[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText(/year/i)[0]).toBeInTheDocument();
  });

  test("Check that a year with incorrect format will throw an error", () => {
    const screen = renderWithHookForm(<DateRange name="testComponent" />);

    const monthLabel = screen.getAllByLabelText(/month/i)[0];
    const yearLabel = screen.getAllByLabelText(/year/i)[0];
    fireEvent.change(monthLabel, { target: { value: "01" } });
    fireEvent.change(yearLabel, { target: { value: "202" } });
    const errorMessage = screen.getByText(
      "Please enter start date year in YYYY-format"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("Check that error disapears when user inputs correct date", () => {
    const screen = renderWithHookForm(<DateRange name="testComponent" />);

    const monthLabel = screen.getAllByLabelText(/month/i)[0];
    const yearLabel = screen.getAllByLabelText(/year/i)[0];
    fireEvent.change(monthLabel, { target: { value: "01" } });
    fireEvent.change(yearLabel, { target: { value: "2022" } });
    expect(
      screen.queryByText("Please enter start date year in YYYY-format")
    ).not.toBeInTheDocument();
  });

  test("Check that error appears when user inputs a start date after the end date", () => {
    const screen = renderWithHookForm(<DateRange name="testComponent" />);

    const startMonthLabel = screen.getAllByLabelText(/month/i)[0];
    const yearLabel = screen.getAllByLabelText(/year/i)[0];
    const endMonthLabel = screen.getAllByLabelText(/month/i)[1];
    const endYearLabel = screen.getAllByLabelText(/year/i)[1];
    fireEvent.change(startMonthLabel, { target: { value: "01" } });
    fireEvent.change(yearLabel, { target: { value: "2023" } });
    fireEvent.change(endMonthLabel, { target: { value: "02" } });
    fireEvent.change(endYearLabel, { target: { value: "2022" } });
    waitFor(() => {
      expect(
        screen.queryByText("Start Date must be before the End Date")
      ).toBeInTheDocument();
    });
  });

  test("Check that error appears when start date is a date in the future", () => {
    const screen = renderWithHookForm(<DateRange name="testComponent" />);
    const startMonthLabel = screen.getAllByLabelText(/month/i)[0];
    const yearLabel = screen.getAllByLabelText(/year/i)[0];
    fireEvent.change(startMonthLabel, { target: { value: "01" } });
    fireEvent.change(yearLabel, { target: { value: "2080" } });
    expect(
      screen.queryByText("Start date cannot be a future date")
    ).toBeInTheDocument();
  });

  test("Check that error appears when end date is a date in the future", () => {
    const screen = renderWithHookForm(<DateRange name="testComponent" />);

    const endMonthLabel = screen.getAllByLabelText(/month/i)[1];
    const endYearLabel = screen.getAllByLabelText(/year/i)[1];
    fireEvent.change(endMonthLabel, { target: { value: "02" } });
    fireEvent.change(endYearLabel, { target: { value: "2080" } });
    expect(
      screen.queryByText("End date cannot be a future date")
    ).toBeInTheDocument();
  });
});
