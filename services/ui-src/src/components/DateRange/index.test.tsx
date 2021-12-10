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
});
