import { LabelData } from "utils";
import {
  validateEqualCategoryDenominatorsOMS,
  validateEqualCategoryDenominatorsPM,
} from ".";

import {
  generateOmsCategoryRateData,
  locationDictionary,
  doubleRate,
  simpleRate,
  partialRate,
  generatePmQualifierRateData,
} from "utils/testUtils/validationHelpers";

describe("Testing Equal Denominators For All Qualifiers Validation", () => {
  const noCat: LabelData[] = [];
  const categories = [
    { label: "TestCat1", text: "TestCat1", id: "TestCat1" },
    { label: "TestCat2", text: "TestCat2", id: "TestCat2" },
  ];
  const qualifiers = [
    { label: "TestQual1", text: "TestQual1", id: "TestQual1" },
    { label: "TestQual2", text: "TestQual2", id: "TestQual2" },
  ];
  const pmd = { categories, qualifiers };

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
      const errors = validateEqualCategoryDenominatorsPM(
        generatePmQualifierRateData(pmd, [simpleRate, simpleRate]),
        categories,
        qualifiers
      );

      expect(errors).toHaveLength(0);
    });

    it("should have error", () => {
      const errors = validateEqualCategoryDenominatorsPM(
        generatePmQualifierRateData(pmd, [simpleRate, doubleRate]),
        categories,
        qualifiers
      );

      expect(errors).toHaveLength(1);
      expect(errors[0].errorList).toHaveLength(2);
      expect(errors[0].errorLocation).toBe("Performance Measure");
      expect(errors[0].errorMessage).toBe(
        `The following categories must have the same denominator:`
      );
      expect(errors[0].errorList).toContain(categories[0].label);
      expect(errors[0].errorList).toContain(categories[1].label);
    });

    it("should have error, with qualifiers listed", () => {
      const errors = validateEqualCategoryDenominatorsPM(
        generatePmQualifierRateData({ qualifiers, categories: noCat }, [
          simpleRate,
          doubleRate,
        ]),
        noCat,
        qualifiers
      );

      expect(errors).toHaveLength(1);
      expect(errors[0].errorList).toHaveLength(2);
      expect(errors[0].errorLocation).toBe("Performance Measure");
      expect(errors[0].errorMessage).toBe(
        `The following categories must have the same denominator:`
      );
      expect(errors[0].errorList).toContain(qualifiers[0].label);
      expect(errors[0].errorList).toContain(qualifiers[1].label);
    });

    it("should NOT have error from empty rate value", () => {
      const errors = validateEqualCategoryDenominatorsPM(
        generatePmQualifierRateData(pmd, [partialRate, partialRate]),
        categories,
        qualifiers
      );

      expect(errors).toHaveLength(0);
    });

    it("Error message text should match provided errorMessage", () => {
      const errorMessage = "Another one bites the dust.";
      const errorArray = validateEqualCategoryDenominatorsPM(
        generatePmQualifierRateData({ qualifiers, categories: noCat }, [
          simpleRate,
          doubleRate,
        ]),
        noCat,
        qualifiers,
        errorMessage
      );
      expect(errorArray.length).toBe(1);
      expect(errorArray[0].errorMessage).toBe(errorMessage);
    });
  });

  // OMS
  describe("OMS Validation", () => {
    it("should return NO errors", () => {
      const data = generateOmsCategoryRateData(categories, qualifiers, [
        simpleRate,
        simpleRate,
      ]);
      const errors = validateEqualCategoryDenominatorsOMS()({
        ...baseOMSInfo,
        rateData: data,
      });

      expect(errors).toHaveLength(0);
    });

    it("should return no errors if OPM", () => {
      const data = generateOmsCategoryRateData(categories, qualifiers, [
        simpleRate,
        simpleRate,
      ]);
      const errors = validateEqualCategoryDenominatorsOMS()({
        ...baseOMSInfo,
        rateData: data,
        isOPM: true,
      });

      expect(errors).toHaveLength(0);
    });

    it("should have errors, list qualifiers", () => {
      const locationDictionaryJestFunc = jest.fn();
      const data = generateOmsCategoryRateData(categories, qualifiers, [
        simpleRate,
        doubleRate,
      ]);
      const errors = validateEqualCategoryDenominatorsOMS()({
        ...baseOMSInfo,
        locationDictionary: locationDictionaryJestFunc,
        rateData: data,
      });

      expect(errors).toHaveLength(1);
      expect(errors[0].errorLocation).toContain(
        "Optional Measure Stratification:"
      );
      expect(errors[0].errorMessage).toBe(
        `The following categories must have the same denominator:`
      );
      expect(errors[0].errorList).toContain(categories[0].label);
      expect(errors[0].errorList).toContain(categories[1].label);
      expect(locationDictionaryJestFunc).toHaveBeenCalledWith(["TestLabel"]);
    });
  });

  it("Error message text should match provided errorMessage", () => {
    const errorMessage = "Another one bites the dust.";
    const locationDictionaryJestFunc = jest.fn();
    const data = generateOmsCategoryRateData(categories, qualifiers, [
      simpleRate,
      doubleRate,
    ]);
    const errors = validateEqualCategoryDenominatorsOMS(errorMessage)({
      ...baseOMSInfo,
      locationDictionary: locationDictionaryJestFunc,
      rateData: data,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0].errorLocation).toContain(
      "Optional Measure Stratification:"
    );
    expect(errors[0].errorMessage).toBe(errorMessage);
  });
});
