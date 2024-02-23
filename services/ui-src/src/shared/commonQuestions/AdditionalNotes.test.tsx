import fireEvent from "@testing-library/user-event";
import { AdditionalNotes } from "./AdditionalNotes";
import { Reporting } from "measures/2024/shared/CommonQuestions/Reporting";
import { act, screen } from "@testing-library/react";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { useApiMock } from "utils/testUtils/useApiMock";
import { measureDescriptions } from "measures/measureDescriptions";

const measureAbbr = "AAB-AD";
const coreSet = "ACS";
const state = "AL";
const year = 2023;
const description = measureDescriptions[`${year}`][measureAbbr];

const apiData = {
  useGetMeasureValues: {
    data: {
      Item: {
        compoundKey: `${state}${year}${coreSet}${measureAbbr}`,
        coreSet,
        createdAt: 1642517935305,
        description,
        lastAltered: 1642517935305,
        lastAlteredBy: "undefined",
        measure: measureAbbr,
        state,
        status: "incomplete",
        year,
        data: {},
      },
    },
    isLoading: false,
    refetch: jest.fn(),
    isError: false,
    error: undefined,
  },
};

describe("Test AdditionalNotes component", () => {
  beforeEach(async () => {
    useApiMock(apiData);
    await act(async () => {
      renderWithHookForm([
        <Reporting
          measureName="My Test Measure"
          reportingYear="2024"
          measureAbbreviation="MTM"
        />,
        <AdditionalNotes />,
      ]);
    });
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
      "No, I am not reporting My Test Measure (MTM) for FFY 2024 quality measure reporting."
    );

    const textArea = await screen.findByLabelText(
      "Please add any additional notes or comments on the measure not otherwise captured above (text in this field is included in publicly-reported state-specific comments):"
    );

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
});
