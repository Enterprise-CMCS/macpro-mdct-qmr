import { DateRange } from ".";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import userEvent from "@testing-library/user-event";

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
    userEvent.type(monthLabel, "01");
    userEvent.type(yearLabel, "202");
    const errorMessage = screen.getByText(
      "Please enter start date year in YYYY-format"
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
