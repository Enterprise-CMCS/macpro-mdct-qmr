import {
  validateNumeratorLessThanDenominatorOMS,
  validateNumeratorsLessThanDenominatorsPM,
} from "./index";

import {
  generateOmsCategoryRateData,
  locationDictionary,
  badNumeratorRate,
  simpleRate,
  partialRate,
  generateOtherPerformanceMeasureData,
} from "utils/testUtils/validationHelpers";

describe("Testing Numerator Less Than Denominator", () => {
  const categories = ["Test Cat 1", "Test Cat 2"];
  const qualifiers = ["Test Qual 1", "Test Qual 2"];

  const baseOMSInfo = {
    categories,
    qualifiers,
    locationDictionary,
    isOPM: false,
    label: ["TestLabel"],
  };

  // PM
  describe("PM/OPM Validation", () => {
    it("should return NO errors - PM", () => {
      const errors = validateNumeratorsLessThanDenominatorsPM(
        [[simpleRate, simpleRate]],
        undefined,
        qualifiers
      );

      expect(errors).toHaveLength(0);
    });

    it("should have error - PM", () => {
      const errors = validateNumeratorsLessThanDenominatorsPM(
        [[badNumeratorRate, badNumeratorRate]],
        undefined,
        qualifiers
      );

      expect(errors).toHaveLength(1);
      expect(errors[0].errorLocation).toBe(
        "Performance Measure/Other Performance Measure"
      );
      expect(errors[0].errorMessage).toBe(
        `Numerators must be less than Denominators for all applicable performance measures`
      );
    });

    it("should NOT have error from empty rate value", () => {
      const errors = validateNumeratorsLessThanDenominatorsPM(
        [[partialRate, partialRate]],
        generateOtherPerformanceMeasureData([partialRate, partialRate]),
        qualifiers
      );

      expect(errors).toHaveLength(0);
    });

    it("should return NO errors - OPM", () => {
      const errors = validateNumeratorsLessThanDenominatorsPM(
        [],
        generateOtherPerformanceMeasureData([simpleRate, simpleRate]),
        qualifiers
      );

      expect(errors).toHaveLength(0);
    });

    it("should have error - OPM", () => {
      const errors = validateNumeratorsLessThanDenominatorsPM(
        [],
        generateOtherPerformanceMeasureData([
          badNumeratorRate,
          badNumeratorRate,
        ]),
        qualifiers
      );

      expect(errors).toHaveLength(1);
      expect(errors[0].errorLocation).toBe(
        "Performance Measure/Other Performance Measure"
      );
      expect(errors[0].errorMessage).toBe(
        `Numerators must be less than Denominators for all applicable performance measures`
      );
    });
  });

  // OMS
  describe("OMS Validation", () => {
    it("should return NO errors", () => {
      const data = generateOmsCategoryRateData(categories, qualifiers, [
        simpleRate,
        simpleRate,
      ]);
      const errors = validateNumeratorLessThanDenominatorOMS()({
        ...baseOMSInfo,
        rateData: data,
      });

      expect(errors).toHaveLength(0);
    });

    it("should have errors with qualifier in message", () => {
      const locationDictionaryJestFunc = jest.fn();
      const data = generateOmsCategoryRateData(categories, qualifiers, [
        badNumeratorRate,
        badNumeratorRate,
      ]);
      const errors = validateNumeratorLessThanDenominatorOMS()({
        ...baseOMSInfo,
        locationDictionary: locationDictionaryJestFunc,
        rateData: data,
      });

      expect(errors).toHaveLength(4);
      expect(errors[0].errorLocation).toContain(
        "Optional Measure Stratification:"
      );
      expect(locationDictionaryJestFunc).toHaveBeenCalledWith([
        "TestLabel",
        qualifiers[0],
      ]);
    });
  });
});
