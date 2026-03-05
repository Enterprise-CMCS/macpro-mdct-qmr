import { ComplexValidateDualPopInformation } from ".";
import { getMeasureYear } from "utils/getMeasureYear";

jest.mock("utils/getMeasureYear");
const mockGetMeasureYear = getMeasureYear as jest.Mock;

const pmArr = [
  [
    {
      fields: [{ uid: "mockid", value: "2", label: "Age 65 and older" }],
      label: "Age 65 and older",
    },
  ],
];

const incompletePmArr = [
  [
    {
      fields: [{ uid: "mockid", value: "", label: "Age 65 and older" }],
      label: "Age 65 and older",
    },
  ],
];

describe("Test ComplexValidationDualPopInformation validation", () => {
  test("there is no error", () => {
    mockGetMeasureYear.mockReturnValue(2021);
    const error = ComplexValidateDualPopInformation(pmArr, undefined, [
      "DenominatorIncMedicareMedicaidDualEligible",
    ]);
    expect(error).toStrictEqual([]);
  });
  test("throw error when denominator includes medicare and medicaid population and data is not complete", () => {
    mockGetMeasureYear.mockReturnValue(2021);
    const error = ComplexValidateDualPopInformation(
      incompletePmArr,
      undefined,
      ["DenominatorIncMedicareMedicaidDualEligible"]
    );
    expect(error).toStrictEqual([
      {
        errorLocation: "Performance Measure",
        errorMessage:
          '"Individuals Dually Eligible for Medicare and Medicaid" is selected in the "Definition of Denominator" question but you are missing performance measure data for Age 65 and Older',
        errorType: "Warning",
      },
    ]);
  });
  test("throw error denominator does not dual eligible and data is not complete", () => {
    mockGetMeasureYear.mockReturnValue(2025);
    const error = ComplexValidateDualPopInformation(
      pmArr,
      undefined,
      undefined
    );
    expect(error).toStrictEqual([
      {
        errorLocation: "Performance Measure",
        errorMessage:
          "Information has been included in the Age 65 and Older Performance Measure but the checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is missing",
        errorType: "Warning",
      },
    ]);
  });
});
