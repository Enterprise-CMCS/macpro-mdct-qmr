import fireEvent from "@testing-library/user-event";
import { AdditionalNotes } from "./AdditionalNotes";
import { Reporting } from "./Reporting";
import { screen } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import SharedContext from "shared/SharedContext";
import { commonQuestionsLabel as commonQuestionsLabels2024 } from "labels/2024/commonQuestionsLabel";
import { commonQuestionsLabel as commonQuestionsLabels2023 } from "labels/2023/commonQuestionsLabel";
import { usePathParams } from "hooks/api/usePathParams";

jest.mock("hooks/api/usePathParams");
const mockUsePathParams = usePathParams as jest.Mock;

const isReportingTextAreaLabel =
  "Please add any additional notes or comments on the measure not otherwise captured above (text in this field is included in publicly-reported state-specific comments):";
const isNotReportingTextAreaLabel =
  "Please add any additional notes or comments on the measure not otherwise captured above:";

describe("Test AdditionalNotes component for 2024", () => {
  beforeEach(() => {
    mockUsePathParams.mockReturnValue({ year: "2024" });
    renderWithHookForm(
      <SharedContext.Provider value={commonQuestionsLabels2024}>
        <Reporting
          measureName="My Test Measure"
          reportingYear="2024"
          measureAbbreviation="MTM"
        />
        ,
        <AdditionalNotes />
      </SharedContext.Provider>
    );
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
    const textArea = await screen.findByLabelText(isReportingTextAreaLabel);
    fireEvent.type(textArea, "This is the test text");
    expect(textArea).toHaveDisplayValue("This is the test text");
  });

  it("input is deleted when measure reporting radio option is changed", async () => {
    const reportingNo = await screen.findByLabelText(
      "No, I am not reporting My Test Measure (MTM) for FFY 2024 quality measure reporting."
    );

    const textArea = await screen.findByLabelText(isReportingTextAreaLabel);

    fireEvent.click(reportingNo);
    fireEvent.type(textArea, "This is the test text");
    expect(textArea).toHaveDisplayValue("This is the test text");

    // change reporting radio button option from no to yes
    const reportingYes = await screen.findByLabelText(
      "Yes, I am reporting My Test Measure (MTM) for FFY 2024 quality measure reporting."
    );

    fireEvent.click(reportingYes);
    expect(textArea).toHaveDisplayValue("");
  });

  it("shows different text if you are not reporting", async () => {
    expect(screen.getByLabelText(isReportingTextAreaLabel)).toBeInTheDocument();

    const reportingNo = await screen.findByLabelText(
      "No, I am not reporting My Test Measure (MTM) for FFY 2024 quality measure reporting."
    );

    fireEvent.click(reportingNo);
    expect(
      screen.getByLabelText(isNotReportingTextAreaLabel)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(isReportingTextAreaLabel)
    ).not.toBeInTheDocument();

    // change reporting radio button option from no to yes
    const reportingYes = await screen.findByLabelText(
      "Yes, I am reporting My Test Measure (MTM) for FFY 2024 quality measure reporting."
    );

    fireEvent.click(reportingYes);
    expect(screen.getByLabelText(isReportingTextAreaLabel)).toBeInTheDocument();
    expect(
      screen.queryByText(isNotReportingTextAreaLabel)
    ).not.toBeInTheDocument();
  });
});

describe("Test AdditionalNotes component for 2023", () => {
  beforeEach(() => {
    mockUsePathParams.mockReturnValue({ year: "2023" });
    renderWithHookForm(
      <SharedContext.Provider value={commonQuestionsLabels2023}>
        <Reporting
          measureName="My Test Measure"
          reportingYear="2023"
          measureAbbreviation="MTM"
        />
        ,
        <AdditionalNotes />
      </SharedContext.Provider>
    );
  });

  it("shows the same text regardless of reporting status", async () => {
    expect(screen.getByLabelText(isReportingTextAreaLabel)).toBeInTheDocument();

    const reportingNo = await screen.findByLabelText(
      "No, I am not reporting My Test Measure (MTM) for FFY 2023 quality measure reporting."
    );

    fireEvent.click(reportingNo);
    // should show the same text
    expect(screen.getByLabelText(isReportingTextAreaLabel)).toBeInTheDocument();
    expect(
      screen.queryByText(isNotReportingTextAreaLabel)
    ).not.toBeInTheDocument();

    // change reporting radio button option from no to yes
    const reportingYes = await screen.findByLabelText(
      "Yes, I am reporting My Test Measure (MTM) for FFY 2023 quality measure reporting."
    );

    fireEvent.click(reportingYes);
    // should show the same text
    expect(screen.getByLabelText(isReportingTextAreaLabel)).toBeInTheDocument();
    expect(
      screen.queryByText(isNotReportingTextAreaLabel)
    ).not.toBeInTheDocument();
  });
});
