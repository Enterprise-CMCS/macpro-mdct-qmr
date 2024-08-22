import {
  validateOneCatRateHigherThanOtherCatOMS,
  validateOneCatRateHigherThanOtherCatPM,
} from ".";

import {
  generatePmCategoryRateData,
  generateOmsCategoryRateData,
  locationDictionary,
  higherRate,
  lowerRate,
  partialRate,
} from "utils/testUtils/validationHelpers";

describe("Testing Category Rate Higher Than Other Validation", () => {
  const categories = [
    { label: "TestCat1", text: "TestCat1", id: "TestCat1" },
    { label: "TestCat2", text: "TestCat2", id: "TestCat2" },
  ];
  const expandedCategories = [
    { label: "TestCat1", text: "TestCat1", id: "TestCat1" },
    { label: "TestCat2", text: "TestCat2", id: "TestCat2" },
    { label: "TestCat3", text: "TestCat3", id: "TestCat3" },
    { label: "TestCat4", text: "TestCat4", id: "TestCat4" },
  ];
  const qualifiers = [
    { label: "TestQual1", text: "TestQual1", id: "TestQual1" },
    { label: "TestQual2", text: "TestQual2", id: "TestQual2" },
  ];

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
        `${categories[1].label} Rate should not be higher than ${categories[0].label} Rate for ${qualifiers[0].label} Rates.`
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
        `${categories[1].label} Rate should not be higher than ${categories[0].label} Rate for ${qualifiers[0].label} Rates.`
      );
    });

    it("Error message text should match provided errorMessage", () => {
      const errorMessageFunc = (
        highCat: string,
        lowCat: string,
        qualifier: string
      ) => {
        return `Another ${lowCat} bites the ${highCat} and the ${qualifier}.`;
      };

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
        2,
        errorMessageFunc
      );

      expect(errors).toHaveLength(4);
      expect(errors[0].errorLocation).toBe("Performance Measure");
      expect(errors[0].errorMessage).toBe(
        errorMessageFunc(
          categories[0].label,
          categories[1].label,
          qualifiers[0].label
        )
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
        `${categories[1].label} Rate should not be higher than ${categories[0].label} Rates.`
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
        `${categories[1].label} Rate should not be higher than ${categories[0].label} Rates.`
      );
    });
  });

  it("Error message text should match provided errorMessage", () => {
    const errorMessageFunc = (highCat: string, lowCat: string) => {
      return `Another ${lowCat} bites the ${highCat}.`;
    };
    const data = generateOmsCategoryRateData(categories, qualifiers, [
      lowerRate,
      higherRate,
    ]);
    const errors = validateOneCatRateHigherThanOtherCatOMS(
      undefined,
      undefined,
      undefined,
      errorMessageFunc
    )({
      ...baseOMSInfo,
      rateData: data,
    });

    expect(errors).toHaveLength(2);
    expect(errors[0].errorMessage).toBe(
      errorMessageFunc(categories[0].label, categories[1].label)
    );
  });
});
