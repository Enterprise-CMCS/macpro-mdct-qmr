import {
  validateOneCatRateHigherThanOtherCatOMS,
  validateOneCatRateHigherThanOtherCatPM,
} from "./index";

import {
  generatePmCategoryRateData,
  generateOmsCategoryRateData,
  locationDictionary,
  higherRate,
  lowerRate,
  partialRate,
} from "utils/testUtils/validationHelpers";

describe("Testing Category Rate Higher Than Other Validation", () => {
  const categories = ["Test Cat 1", "Test Cat 2"];
  const expandedCategories = [
    "Test Cat 1",
    "Test Cat 2",
    "Test Cat 3",
    "Test Cat 4",
  ];
  const qualifiers = ["Test Qual 1", "Test Qual 2"];

  const baseOMSInfo = {
    categories,
    qualifiers,
    locationDictionary,
    isOPM: false,
    label: ["TestLabel"],
  };

  // PM
  describe("PM Validation", () => {
    it("should return no errors", () => {
      const data = generatePmCategoryRateData({ categories, qualifiers }, [
        higherRate,
        lowerRate,
      ]);
      const errors = validateOneCatRateHigherThanOtherCatPM(data, {
        categories,
        qualifiers,
      });

      expect(errors).toHaveLength(0);
    });

    it("should have error", () => {
      const data = generatePmCategoryRateData({ categories, qualifiers }, [
        lowerRate,
        higherRate,
      ]);
      const errors = validateOneCatRateHigherThanOtherCatPM(data, {
        categories,
        qualifiers,
      });

      expect(errors).toHaveLength(2);
      expect(errors[0].errorLocation).toBe("Performance Measure");
      expect(errors[0].errorMessage).toBe(
        `${categories[1]} Rate should not be higher than ${categories[0]} Rate for ${qualifiers[0]} Rates.`
      );
    });

    it("should NOT have error from empty rate value ", () => {
      const data = generatePmCategoryRateData({ categories, qualifiers }, [
        partialRate,
        partialRate,
      ]);
      const errors = validateOneCatRateHigherThanOtherCatPM(data, {
        categories,
        qualifiers,
      });

      expect(errors).toHaveLength(0);
    });

    it("should generate multiple error sets for increment props", () => {
      const data = generatePmCategoryRateData(
        { categories: expandedCategories, qualifiers },
        [lowerRate, higherRate, lowerRate, higherRate]
      );
      const errors = validateOneCatRateHigherThanOtherCatPM(
        data,
        {
          categories: expandedCategories,
          qualifiers,
        },
        0,
        1,
        2
      );

      expect(errors).toHaveLength(4);
      expect(errors[0].errorLocation).toBe("Performance Measure");
      expect(errors[0].errorMessage).toBe(
        `${categories[1]} Rate should not be higher than ${categories[0]} Rate for ${qualifiers[0]} Rates.`
      );
    });
  });

  // OMS
  describe("OMS Validation", () => {
    it("should return no errors", () => {
      const data = generateOmsCategoryRateData(categories, qualifiers, [
        higherRate,
        lowerRate,
      ]);
      const errors = validateOneCatRateHigherThanOtherCatOMS()({
        ...baseOMSInfo,
        rateData: data,
      });

      expect(errors).toHaveLength(0);
    });

    it("should return with no error - isOPM", () => {
      const errors = validateOneCatRateHigherThanOtherCatOMS()({
        ...baseOMSInfo,
        rateData: {},
        isOPM: true,
      });
      expect(errors).toHaveLength(0);
    });

    it("should not show last string portion when OMS has no categories", () => {
      const data = generateOmsCategoryRateData(categories, qualifiers, [
        lowerRate,
        higherRate,
      ]);
      const errors = validateOneCatRateHigherThanOtherCatOMS()({
        ...baseOMSInfo,
        rateData: data,
      });

      expect(errors).toHaveLength(2);
      expect(errors[0].errorMessage).toBe(
        `${categories[1]} Rate should not be higher than ${categories[0]} Rates.`
      );
    });

    it("should generate multi-error sets for increment prop", () => {
      const data = generateOmsCategoryRateData(expandedCategories, qualifiers, [
        lowerRate,
        higherRate,
        lowerRate,
        higherRate,
      ]);
      const errors = validateOneCatRateHigherThanOtherCatOMS(
        0,
        1,
        2
      )({
        ...baseOMSInfo,
        categories: expandedCategories,
        rateData: data,
      });

      expect(errors).toHaveLength(4);
      expect(errors[0].errorMessage).toBe(
        `${categories[1]} Rate should not be higher than ${categories[0]} Rates.`
      );
    });
  });
});
