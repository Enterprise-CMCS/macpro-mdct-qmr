import fireEvent from "@testing-library/user-event";
import { AdditionalNotes } from ".";
import { Reporting } from "../Reporting";
import { screen } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";

describe("Test AdditionalNotes component", () => {
  beforeEach(() => {
    renderWithHookForm([
      <Reporting
        measureName="My Test Measure"
        reportingYear="2023"
        measureAbbreviation="MTM"
      />,
      <AdditionalNotes />,
    ]);
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
      "Please add any additional notes or comments on the measure not otherwise captured above (text in this field is included in publicly-reported state-specific comments):"
    );
    fireEvent.type(textArea, "This is the test text");
    expect(textArea).toHaveDisplayValue("This is the test text");
  });

  it("input is deleted when measure reporting radio option is changed", async () => {
    const reportingNo = await screen.findByLabelText(
      "No, I am not reporting My Test Measure (MTM) for FFY 2023 quality measure reporting."
    );

    const textArea = await screen.findByLabelText(
      "Please add any additional notes or comments on the measure not otherwise captured above (text in this field is included in publicly-reported state-specific comments):"
    );

    fireEvent.click(reportingNo);
    fireEvent.type(textArea, "This is the test text");
    expect(textArea).toHaveDisplayValue("This is the test text");

    // change reporting radio button option from no to yes
    const reportingYes = await screen.findByLabelText(
      "Yes, I am reporting My Test Measure (MTM) for FFY 2023 quality measure reporting."
    );

    fireEvent.click(reportingYes);
    expect(textArea).toHaveDisplayValue("");
  });
});
