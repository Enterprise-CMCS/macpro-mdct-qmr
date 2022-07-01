import * as DC from "dataConstants";
import { validateDualPopInformationPM } from "./index";
import { simpleRate, partialRate } from "utils/testUtils/validationHelpers";

describe("Testing Dual Population Selection Validation", () => {
  test("should be no errors", () => {
    const errors = validateDualPopInformationPM([], undefined, 0, []);

    expect(errors.length).toBe(0);
  });

  test("should be no errors - partial data", () => {
    const errors = validateDualPopInformationPM(
      [[partialRate, partialRate]],
      undefined,
      0,
      []
    );

    expect(errors.length).toBe(0);
  });

  test("should be no errors - OPM", () => {
    const errors = validateDualPopInformationPM([], [], 0, []);

    expect(errors.length).toBe(0);
  });

  test("should be errors for no checkbox selections", () => {
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

  test("should be errors for no matching checkbox selection", () => {
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

  test("should be errors for no matching checkbox selection - specified string", () => {
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

  test("should be errors for no data", () => {
    const errors = validateDualPopInformationPM([], undefined, 0, [
      DC.DENOMINATOR_INC_MEDICAID_DUAL_ELIGIBLE,
    ]);

    expect(errors.length).toBe(1);
    expect(errors[0].errorLocation).toBe("Performance Measure");
    expect(errors[0].errorMessage).toBe(
      `The checkmark for (Denominator Includes Medicare and Medicaid Dually-Eligible population) is checked but you are missing performance measure data for Age 65 and Older`
    );
  });

  test("should be errors for no data - specified string", () => {
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

  // custom errorMessage
  test("Error message text should match default errorMessage", () => {
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

  test("Error message text should match provided errorMessage", () => {
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
      "Another Age 65 and Older bites the dust"
    );
  });
});
