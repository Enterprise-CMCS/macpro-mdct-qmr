import * as DC from "dataConstants";
import {
  simpleRate,
  partialRate,
} from "utils/testUtils/2023/validationHelpers";
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
  it("should be no errors for age 65 data with no checkbox selection", () => {
    const errors = validateDualPopInformationPM(
      [[simpleRate, simpleRate]],
      undefined,
      0,
      undefined
    );

    expect(errors.length).toBe(0);
  });
  it("should be errors for no data", () => {
    const errors = validateDualPopInformationPM([], undefined, 0, [
      DC.DENOMINATOR_INC_MEDICAID_DUAL_ELIGIBLE,
    ]);

    expect(errors.length).toBe(1);
    expect(errors[0].errorLocation).toBe("Performance Measure");
    expect(errors[0].errorMessage).toBe(
      `Individuals Dually Eligible for Medicare and Medicaid" is selected in the "Definition of Denominator" question but you are missing performance measure data for Age 65 and Older`
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
      `Individuals Dually Eligible for Medicare and Medicaid" is selected in the "Definition of Denominator" question but you are missing performance measure data for TestLabel`
    );
  });
});
