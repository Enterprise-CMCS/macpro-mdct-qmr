import { SINGLE_CATEGORY } from "dataConstants";
import {
  validatePartialRateCompletionOMS,
  validatePartialRateCompletionPM,
} from "./index";
import {
  generateOmsCategoryRateData,
  generateOtherPerformanceMeasureData,
  locationDictionary,
  simpleRate,
  partialRate,
} from "utils/testUtils/validationHelpers";

describe("Testing Partial Rate Validation", () => {
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
    it("should return NO errors", () => {
      const errors = validatePartialRateCompletionPM(
        [[simpleRate, simpleRate]],
        undefined,
        qualifiers,
        categories
      );

      expect(errors).toHaveLength(0);
    });

    it("should return NO errors - OPM", () => {
      const errors = validatePartialRateCompletionPM(
        [],
        generateOtherPerformanceMeasureData([simpleRate, simpleRate]),
        qualifiers,
        categories
      );

      expect(errors).toHaveLength(0);
    });

    it("should have error", () => {
      const errors = validatePartialRateCompletionPM(
        [
          [partialRate, partialRate],
          [partialRate, partialRate],
        ],
        undefined,
        qualifiers,
        categories
      );

      expect(errors).toHaveLength(4);
      expect(errors[0].errorLocation).toBe("Performance Measure");
      expect(errors[0].errorMessage).toBe(
        `Should not have partially filled NDR sets${` at ${qualifiers[0]}`}${`, ${categories[0]}`}.`
      );
    });

    it("should have error - OPM", () => {
      const errors = validatePartialRateCompletionPM(
        [],
        generateOtherPerformanceMeasureData([partialRate, partialRate]),
        qualifiers,
        categories
      );

      expect(errors).toHaveLength(6);
      expect(errors[0].errorLocation).toBe("Other Performance Measure");
      expect(errors[0].errorMessage).toBe(
        `Should not have partially filled NDR sets.`
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
      const errors = validatePartialRateCompletionOMS()({
        ...baseOMSInfo,
        rateData: data,
      });

      expect(errors).toHaveLength(0);
    });

    it("should return NO errors - OPM", () => {
      const data = generateOmsCategoryRateData(categories, qualifiers, [
        simpleRate,
        simpleRate,
      ]);
      const errors = validatePartialRateCompletionOMS()({
        ...baseOMSInfo,
        rateData: data,
        isOPM: true,
      });

      expect(errors).toHaveLength(0);
    });

    it("should have errors", () => {
      const locationDictionaryJestFunc = jest.fn();
      const data = generateOmsCategoryRateData(categories, qualifiers, [
        partialRate,
        partialRate,
      ]);
      const errors = validatePartialRateCompletionOMS()({
        ...baseOMSInfo,
        locationDictionary: locationDictionaryJestFunc,
        rateData: data,
      });

      expect(errors).toHaveLength(4);
      expect(errors[0].errorLocation).toContain(
        "Optional Measure Stratification:"
      );
      expect(errors[0].errorMessage).toBe(
        `Should not have partially filled NDR sets${` at ${qualifiers[0]}`}${`, ${categories[0]}`}.`
      );
      expect(locationDictionaryJestFunc).toHaveBeenCalledWith(["TestLabel"]);
    });

    it("should have errors - singleCategory", () => {
      const locationDictionaryJestFunc = jest.fn();
      const data = generateOmsCategoryRateData([SINGLE_CATEGORY], qualifiers, [
        partialRate,
      ]);
      const errors = validatePartialRateCompletionOMS()({
        ...baseOMSInfo,
        locationDictionary: locationDictionaryJestFunc,
        rateData: data,
        categories: [SINGLE_CATEGORY],
      });

      expect(errors).toHaveLength(2);
      expect(errors[0].errorLocation).toContain(
        "Optional Measure Stratification:"
      );
      expect(errors[0].errorMessage).toBe(
        `Should not have partially filled NDR sets${` at ${qualifiers[0]}`}.`
      );
      expect(locationDictionaryJestFunc).toHaveBeenCalledWith(["TestLabel"]);
    });

    it("should have errors - OPM", () => {
      const locationDictionaryJestFunc = jest.fn();
      const data = generateOmsCategoryRateData(categories, qualifiers, [
        partialRate,
        partialRate,
      ]);
      const errors = validatePartialRateCompletionOMS()({
        ...baseOMSInfo,
        locationDictionary: locationDictionaryJestFunc,
        rateData: data,
        isOPM: true,
      });

      expect(errors).toHaveLength(4);
      expect(errors[0].errorLocation).toContain(
        "Optional Measure Stratification:"
      );
      expect(errors[0].errorMessage).toBe(
        `Should not have partially filled NDR sets.`
      );
      expect(locationDictionaryJestFunc).toHaveBeenCalledWith(["TestLabel"]);
    });
  });
});

// TODO: Test for custom errorMessage
