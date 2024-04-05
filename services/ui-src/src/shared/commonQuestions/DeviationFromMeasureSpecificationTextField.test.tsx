import { renderWithHookForm } from "utils";
import { DeviationFromMeasureSpec } from "./DeviationFromMeasureSpecificationTextField";
import { fireEvent, screen } from "@testing-library/react";
import commonQuestionsLabel from "labels/2024/commonQuestionsLabel";
import SharedContext from "shared/SharedContext";

describe("Test DeviationFromMeasureSpec Component", () => {
  beforeEach(() => {
    renderWithHookForm(
      <SharedContext.Provider value={commonQuestionsLabel}>
        <DeviationFromMeasureSpec />
      </SharedContext.Provider>
    );
  });

  it("component renders", () => {
    expect(
      screen.getByText("Variations from Measure Specifications")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Did your calculation of the measure vary from the measure specification in any way?"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Yes, the calculation of the measure varies from the measure specification."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "No, the calculation of the measure does not vary from the measure specification in any way."
      )
    ).toBeInTheDocument();
  });

  it("radio buttons are checkable", () => {
    const radioButtons = screen.getAllByRole("radio");
    expect(radioButtons).toHaveLength(2);

    radioButtons.forEach((radio) => {
      expect(radio).not.toBeChecked();
      fireEvent.click(radio);
      expect(radio).toBeChecked();
    });
  });

  it("textbox is shown when user selected yes", () => {
    //by default, there should not be a textbox active on the page
    expect(
      screen.queryByRole("textbox", {
        name: "Explain the variation(s) ( text in this field is included in publicly-reported state-specific comments ):",
      })
    ).not.toBeInTheDocument();
    //simulate user clicking yes to trigger the textarea to show
    const radioButtonYes = screen.getByRole("radio", {
      name: "Yes, the calculation of the measure varies from the measure specification.",
    });
    fireEvent.click(radioButtonYes);
    //look for the textfield and check that it's in the doc
    const textarea = screen.getByRole("textbox", {
      name: "Explain the variation(s) ( text in this field is included in publicly-reported state-specific comments ):",
    });
    expect(textarea).toBeInTheDocument();
  });
});
