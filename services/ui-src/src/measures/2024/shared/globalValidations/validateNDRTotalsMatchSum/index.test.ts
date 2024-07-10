import {
  pmaNumeratorInitiationSum,
  pmaDenominatorInitiationSum,
  pmaNumeratorEngagementSum,
  pmaDenominatorEngagementSum,
  pmaCorrectSums,
} from "./validationHelpers";
import { validateNDRTotalsMatchSum } from ".";

describe("Testing PM Total vs Sum validations", () => {
  it("should return no errors - all sums match total values", () => {
    const bothNumDenCorrect = validateNDRTotalsMatchSum(pmaCorrectSums);
    expect(bothNumDenCorrect.length).toBe(0);
  });

  it("should return numerator sum error - sums do not match totals for initiation values", () => {
    const valNumerator = validateNDRTotalsMatchSum(pmaNumeratorInitiationSum);

    expect(valNumerator.length).toBe(1);
    for (const result of [...valNumerator]) {
      expect(result.errorLocation).toBe("Performance Measure");
      expect(result.errorMessage).toBe(
        "Numerators must be the sum for each category of performance measures"
      );
    }
  });

  it("should return numerator sum error - sums do not match totals for engagement values", () => {
    const valNumerator = validateNDRTotalsMatchSum(pmaNumeratorEngagementSum);

    expect(valNumerator.length).toBe(1);
    for (const result of [...valNumerator]) {
      expect(result.errorLocation).toBe("Performance Measure");
      expect(result.errorMessage).toBe(
        "Numerators must be the sum for each category of performance measures"
      );
    }
  });

  it("should return denominator sum error - sums do not match totals for intiation values", () => {
    const valDenominators = validateNDRTotalsMatchSum(
      pmaDenominatorInitiationSum
    );

    expect(valDenominators.length).toBe(1);
    for (const result of [...valDenominators]) {
      expect(result.errorLocation).toBe("Performance Measure");
      expect(result.errorMessage).toBe(
        "Denominators must be the sum for each category of performance measures"
      );
    }
  });

  it("should return denominator sum error - sums do not match totals for engagement values", () => {
    const valDenominators = validateNDRTotalsMatchSum(
      pmaDenominatorEngagementSum
    );

    expect(valDenominators.length).toBe(1);
    for (const result of [...valDenominators]) {
      expect(result.errorLocation).toBe("Performance Measure");
      expect(result.errorMessage).toBe(
        "Denominators must be the sum for each category of performance measures"
      );
    }
  });
});
