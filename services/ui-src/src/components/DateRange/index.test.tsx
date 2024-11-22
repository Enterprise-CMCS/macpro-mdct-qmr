import { DateRange } from ".";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";

describe("Test DateRange", () => {
  test("Check DateRange Renders", () => {
    const screen = renderWithHookForm(<DateRange name="testComponent" />);

    expect(screen.getByText(/Start Date/i)).toBeInTheDocument();
  });
});
