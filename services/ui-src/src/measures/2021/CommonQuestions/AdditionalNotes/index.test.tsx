import { AdditionalNotes } from ".";
import { screen } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";

describe("Test AdditionalNotes component", () => {
  beforeEach(() => {
    renderWithHookForm(<AdditionalNotes />);
  });

  it("component renders", () => {
    expect(
      screen.getByText("Additional Notes/Comments on the measure (optional)")
    ).toBeInTheDocument();
  });
});
