import { SINGLE_CATEGORY } from "dataConstants";
import {
  validateOneQualRateHigherThanOtherQualOMS,
  validateOneQualRateHigherThanOtherQualPM,
} from ".";

import {
  generatePmQualifierRateData,
  generateOmsQualifierRateData,
  locationDictionary,
  higherRate,
  lowerRate,
  partialRate,
} from "utils/testUtils/2023/validationHelpers";
import { LabelData } from "utils";

jest.mock("utils/getLabelText", () => ({
  isLegacyLabel: () => true,
}));

describe("Testing Qualifier Rate Higher Than Other Validation", () => {
  const categories: LabelData[] = [
    { id: "Test Cat 1", label: "Test Cat 1", text: "Test Cat 1" },
    { id: "Test Cat 2", label: "Test Cat 2", text: "Test Cat 2" },
  ];
  const qualifiers: LabelData[] = [
    { id: "Test Qual 1", label: "Test Qual 1", text: "Test Qual 1" },
    { id: "Test Qual 2", label: "Test Qual 2", text: "Test Qual 2" },
  ];
  const singleCat: LabelData[] = [
    {
      label: SINGLE_CATEGORY,
      text: SINGLE_CATEGORY,
      id: SINGLE_CATEGORY,
    },
  ];
  const noCat: LabelData[] = [];

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
      const data = generatePmQualifierRateData({ categories, qualifiers }, [
        higherRate,
        lowerRate,
      ]);
      const errors = validateOneQualRateHigherThanOtherQualPM(data, {
        categories,
        qualifiers,
      });

      expect(errors).toHaveLength(0);
    });

    it("should have error", () => {
      const data = generatePmQualifierRateData({ categories, qualifiers }, [
        lowerRate,
        higherRate,
      ]);
      const errors = validateOneQualRateHigherThanOtherQualPM(data, {
        categories,
        qualifiers,
      });

      expect(errors).toHaveLength(2);
      expect(errors[0].errorLocation).toBe("Performance Measure");
      expect(errors[0].errorMessage).toBe(
        `${qualifiers[1].label} rate must be less than or equal to ${qualifiers[0].label} rate within ${categories[0].label}.`
      );
    });

    it("should have error - single category", () => {
      const data = generatePmQualifierRateData(
        { categories: noCat, qualifiers },
        [lowerRate, higherRate]
      );
      const errors = validateOneQualRateHigherThanOtherQualPM(data, {
        categories: noCat,
        qualifiers,
      });

      expect(errors).toHaveLength(1);
      expect(errors[0].errorLocation).toBe("Performance Measure");
      expect(errors[0].errorMessage).toBe(
        `${qualifiers[1].label} rate must be less than or equal to ${qualifiers[0].label} rate.`
      );
    });

    it("should NOT have error from empty rate value ", () => {
      const data = generatePmQualifierRateData({ categories, qualifiers }, [
        partialRate,
        partialRate,
      ]);
      const errors = validateOneQualRateHigherThanOtherQualPM(data, {
        categories,
        qualifiers,
      });

      expect(errors).toHaveLength(0);
    });

    it("Error message text should match provided errorMessageFunc", () => {
      const errorMessageFunc = (
        lowQual: string,
        highQual: string,
        _notSingleCategory: boolean,
        category: string
      ) => {
        return `Another ${lowQual} bites the ${highQual} and the ${category}.`;
      };

      const data = generatePmQualifierRateData({ categories, qualifiers }, [
        lowerRate,
        higherRate,
      ]);
      const errors = validateOneQualRateHigherThanOtherQualPM(
        data,
        {
          categories,
          qualifiers,
        },
        undefined,
        undefined,
        errorMessageFunc
      );

      expect(errors).toHaveLength(2);
      expect(errors[0].errorLocation).toBe("Performance Measure");
      expect(errors[0].errorMessage).toBe(
        errorMessageFunc(
          qualifiers[1].label,
          qualifiers[0].label,
          false,
          categories[0].label
        )
      );
    });
  });

  // OMS
  describe("OMS Validation", () => {
    it("should return no errors", () => {
      const data = generateOmsQualifierRateData(categories, qualifiers, [
        higherRate,
        lowerRate,
      ]);
      const errors = validateOneQualRateHigherThanOtherQualOMS()({
        ...baseOMSInfo,
        rateData: data,
      });

      expect(errors).toHaveLength(0);
    });

    it("should return with no error - isOPM", () => {
      const errors = validateOneQualRateHigherThanOtherQualOMS()({
        ...baseOMSInfo,
        rateData: {},
        isOPM: true,
      });
      expect(errors).toHaveLength(0);
    });

    it("should not show last string portion when OMS has no categories", () => {
      const data = generateOmsQualifierRateData(singleCat, qualifiers, [
        lowerRate,
        higherRate,
      ]);
      const errors = validateOneQualRateHigherThanOtherQualOMS()({
        ...baseOMSInfo,
        categories: singleCat,
        rateData: data,
      });

      expect(errors).toHaveLength(1);
      expect(errors[0].errorMessage).toBe(
        `${qualifiers?.[1].label} rate must be less than or equal to ${qualifiers?.[0].label} rate.`
      );
    });
  });

  it("Error message text should match provided errorMessageFunc", () => {
    const errorMessageFunc = (
      lowQual: string,
      highQual: string,
      _notSingleCategory: boolean,
      category: string
    ) => {
      return `Another ${lowQual} bites the ${highQual} and the ${category}.`;
    };

    const data = generateOmsQualifierRateData(singleCat, qualifiers, [
      lowerRate,
      higherRate,
    ]);
    const errors = validateOneQualRateHigherThanOtherQualOMS(
      undefined,
      undefined,
      errorMessageFunc
    )({
      ...baseOMSInfo,
      categories: singleCat,
      rateData: data,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0].errorMessage).toBe(
      errorMessageFunc(
        qualifiers[1].label,
        qualifiers[0].label,
        false,
        singleCat[0].label
      )
    );
  });
});
