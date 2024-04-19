import { SINGLE_CATEGORY } from "dataConstants";
import {
  validatePartialRateCompletionOMS,
  validatePartialRateCompletionPM,
} from ".";
import {
  generateOmsCategoryRateData,
  generateOtherPerformanceMeasureData,
  locationDictionary,
  simpleRate,
  partialRate,
} from "utils/testUtils/2023/validationHelpers";
import { LabelData } from "utils";

describe("Testing Partial Rate Validation", () => {
  const categories: LabelData[] = [
    { id: "Test Cat 1", label: "Test Cat 1", text: "Test Cat 1" },
    { id: "Test Cat 2", label: "Test Cat 2", text: "Test Cat 2" },
  ];
  const qualifiers: LabelData[] = [
    { id: "Test Qual 1", label: "Test Qual 1", text: "Test Qual 1" },
    { id: "Test Qual 2", label: "Test Qual 2", text: "Test Qual 2" },
  ];
  const singleCategory: LabelData = {
    label: SINGLE_CATEGORY,
    text: SINGLE_CATEGORY,
    id: SINGLE_CATEGORY,
  };
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
        `Should not have partially filled NDR sets${` for ${qualifiers[0].label}`}${`, ${categories[0].label}`}.`
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

    it("Error message text should match provided errorMessageFunc", () => {
      const errorMessageFunc = (
        multipleQuals: boolean,
        qualifier: string,
        multipleCats: boolean,
        category: string
      ) => {
        return `Another${multipleQuals} bites the ${qualifier}... dun dun dun... Another ${multipleCats} bites the ${category}`;
      };

      const errors = validatePartialRateCompletionPM(
        [
          [partialRate, partialRate],
          [partialRate, partialRate],
        ],
        undefined,
        qualifiers,
        categories,
        errorMessageFunc
      );

      expect(errors).toHaveLength(4);
      expect(errors[0].errorLocation).toBe("Performance Measure");
      expect(errors[0].errorMessage).toBe(
        errorMessageFunc(true, qualifiers[0].label, true, categories[0].label)
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
        `Should not have partially filled NDR sets${` for ${qualifiers[0].label}`}${`, ${categories[0].label}`}.`
      );
      expect(locationDictionaryJestFunc).toHaveBeenCalledWith(["TestLabel"]);
    });

    it("should have errors - singleCategory", () => {
      const locationDictionaryJestFunc = jest.fn();
      const data = generateOmsCategoryRateData([singleCategory], qualifiers, [
        partialRate,
      ]);
      const errors = validatePartialRateCompletionOMS()({
        ...baseOMSInfo,
        locationDictionary: locationDictionaryJestFunc,
        rateData: data,
        categories: [singleCategory],
      });

      expect(errors).toHaveLength(2);
      expect(errors[0].errorLocation).toContain(
        "Optional Measure Stratification:"
      );
      expect(errors[0].errorMessage).toBe(
        `Should not have partially filled NDR sets${` for ${qualifiers[0].label}`}.`
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

  it("Error message text should match provided errorMessage", () => {
    const errorMessageFunc = (
      multipleQuals: boolean,
      qualifier: string,
      multipleCats: boolean,
      category: string
    ) => {
      return `Another${multipleQuals} bites the ${qualifier}... dun dun dun... Another ${multipleCats} bites the ${category}`;
    };

    const locationDictionaryJestFunc = jest.fn();
    const data = generateOmsCategoryRateData(categories, qualifiers, [
      partialRate,
      partialRate,
    ]);
    const errors = validatePartialRateCompletionOMS(
      undefined,
      errorMessageFunc
    )({
      ...baseOMSInfo,
      locationDictionary: locationDictionaryJestFunc,
      rateData: data,
    });

    expect(errors).toHaveLength(4);
    expect(errors[0].errorLocation).toContain(
      "Optional Measure Stratification:"
    );
    expect(locationDictionaryJestFunc).toHaveBeenCalledWith(["TestLabel"]);
    expect(errors[0].errorMessage).toBe(
      errorMessageFunc(true, qualifiers[0].label, true, categories[0].label)
    );
  });
});
