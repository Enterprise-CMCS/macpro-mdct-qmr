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

    const result = valNumerator[0];
    expect(result.errorLocation).toBe("Performance Measure");
    expect(result.errorMessage).toBe(
      "The numerators for each diagnosis cohort should sum to the total SUD numerator."
    );
  });

  it("should return numerator sum error - sums do not match totals for engagement values", () => {
    const valNumerator = validateNDRTotalsMatchSum(pmaNumeratorEngagementSum);
    expect(valNumerator.length).toBe(1);

    const result = valNumerator[0];
    expect(result.errorLocation).toBe("Performance Measure");
    expect(result.errorMessage).toBe(
      "The numerators for each diagnosis cohort should sum to the total SUD numerator."
    );
  });

  it("should return denominator sum error - sums do not match totals for intiation values", () => {
    const valDenominators = validateNDRTotalsMatchSum(
      pmaDenominatorInitiationSum
    );
    expect(valDenominators.length).toBe(1);

    const result = valDenominators[0];
    expect(result.errorLocation).toBe("Performance Measure");
    expect(result.errorMessage).toBe(
      "The denominators for each diagnosis cohort should sum to the total SUD denominator."
    );
  });

  it("should return denominator sum error - sums do not match totals for engagement values", () => {
    const valDenominators = validateNDRTotalsMatchSum(
      pmaDenominatorEngagementSum
    );
    expect(valDenominators.length).toBe(1);

    const result = valDenominators[0];
    expect(result.errorLocation).toBe("Performance Measure");
    expect(result.errorMessage).toBe(
      "The denominators for each diagnosis cohort should sum to the total SUD denominator."
    );
  });
});
