import { renderWithHookForm } from "utils";
import { DeviationFromMeasureSpec } from "./DeviationFromMeasureSpecificationCheckboxes";
import { fireEvent, screen } from "@testing-library/react";

describe("Test DeviationFromMeasureSpec Component", () => {
  beforeEach(() => {
    renderWithHookForm(
      <DeviationFromMeasureSpec categories={[]}></DeviationFromMeasureSpec>
    );
  });

  it("component renders", () => {
    expect(
      screen.getByText("Deviations from Measure Specifications")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Did your calculation of the measure deviate from the measure specification in any way?"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Yes, the calculation of the measure deviates from the measure specification."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "No, the calculation of the measure does not deviate from the measure specification in any way."
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

  it("No checkboxes are shown when user selects yes and no N/D/R is filled", () => {
    //simulate user clicking yes to trigger the textarea to show
    const radioButtonYes = screen.getByRole("radio", {
      name: "Yes, the calculation of the measure deviates from the measure specification.",
    });
    fireEvent.click(radioButtonYes);
    const checkboxes = screen.queryAllByRole("checkbox");
    expect(checkboxes).toHaveLength(0);
  });
});
