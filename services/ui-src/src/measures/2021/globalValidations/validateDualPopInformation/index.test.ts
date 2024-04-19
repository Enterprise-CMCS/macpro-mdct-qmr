import * as DC from "dataConstants";
import { simpleRate, partialRate } from "utils/testUtils/2023/validationHelpers";
import { validateDualPopInformationPM } from ".";

describe("Testing Dual Population Selection Validation", () => {
  it("should be no errors", () => {
    const errors = validateDualPopInformationPM([], undefined, 0, []);

    expect(errors.length).toBe(0);
  });

  it("should be no errors - partial data", () => {
    const errors = validateDualPopInformationPM(
      [[partialRate, partialRate]],
      undefined,
      0,
      []
    );

    expect(errors.length).toBe(0);
  });

  it("should be no errors - OPM", () => {
    const errors = validateDualPopInformationPM([], [], 0, []);

    expect(errors.length).toBe(0);
  });

  it("should be errors for no checkbox selections", () => {
    const errors = validateDualPopInformationPM(
      [[simpleRate, simpleRate]],
      undefined,
      0,
      undefined
    );

    expect(errors.length).toBe(1);
    expect(errors[0].errorLocation).toBe("Performance Measure");
    expect(errors[0].errorMessage).toBe(
      `Information has been included in the Age 65 and Older Performance Measure but the checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is missing`
    );
  });

  it("should be errors for no matching checkbox selection", () => {
    const errors = validateDualPopInformationPM(
      [[simpleRate, simpleRate]],
      undefined,
      0,
      []
    );

    expect(errors.length).toBe(1);
    expect(errors[0].errorLocation).toBe("Performance Measure");
    expect(errors[0].errorMessage).toBe(
      `Information has been included in the Age 65 and Older Performance Measure but the checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is missing`
    );
  });

  it("should be errors for no matching checkbox selection - specified string", () => {
    const errors = validateDualPopInformationPM(
      [[simpleRate, simpleRate]],
      undefined,
      0,
      [],
      "TestLabel"
    );

    expect(errors.length).toBe(1);
    expect(errors[0].errorLocation).toBe("Performance Measure");
    expect(errors[0].errorMessage).toBe(
      `Information has been included in the TestLabel Performance Measure but the checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is missing`
    );
  });

  it("should be errors for no data", () => {
    const errors = validateDualPopInformationPM([], undefined, 0, [
      DC.DENOMINATOR_INC_MEDICAID_DUAL_ELIGIBLE,
    ]);

    expect(errors.length).toBe(1);
    expect(errors[0].errorLocation).toBe("Performance Measure");
    expect(errors[0].errorMessage).toBe(
      `The checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is checked but you are missing performance measure data for Age 65 and Older`
    );
  });

  it("should be errors for no data - specified string", () => {
    const errors = validateDualPopInformationPM(
      [],
      undefined,
      0,
      [DC.DENOMINATOR_INC_MEDICAID_DUAL_ELIGIBLE],
      "TestLabel"
    );

    expect(errors.length).toBe(1);
    expect(errors[0].errorLocation).toBe("Performance Measure");
    expect(errors[0].errorMessage).toBe(
      `The checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is checked but you are missing performance measure data for TestLabel`
    );
  });

  it("Error message text should match default errorMessage", () => {
    const errorArray = validateDualPopInformationPM(
      [[simpleRate, simpleRate]],
      undefined,
      0,
      undefined
    );
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(
      "Information has been included in the Age 65 and Older Performance Measure but the checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is missing"
    );
  });

  it("Error message text should match provided errorMessage", () => {
    const errorMessageFunc = (
      _dualEligible: boolean,
      errorReplacementText: string
    ) => {
      return `Another ${errorReplacementText} bites the dust`;
    };

    const errorArray = validateDualPopInformationPM(
      [[simpleRate, simpleRate]],
      undefined,
      0,
      undefined,
      undefined,
      errorMessageFunc
    );
    expect(errorArray.length).toBe(1);
    expect(errorArray[0].errorMessage).toBe(
      errorMessageFunc(true, "Age 65 and Older")
    );
  });
});
