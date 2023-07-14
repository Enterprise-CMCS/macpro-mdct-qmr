import fireEvent from "@testing-library/user-event";
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
    expect(
      screen.getByText(
        "If you need additional space to include comments or supplemental information, please attach further documentation below."
      )
    ).toBeInTheDocument();
  });

  it("accepts input", async () => {
    const textArea = await screen.findByLabelText(
      "Please add any additional notes or comments on the measure not otherwise captured above (state-specific comment):"
    );
    fireEvent.type(textArea, "This is the test text");
    expect(textArea).toHaveDisplayValue("This is the test text");
  });
});
