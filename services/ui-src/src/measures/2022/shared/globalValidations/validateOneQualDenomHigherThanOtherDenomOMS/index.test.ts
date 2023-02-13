import { SINGLE_CATEGORY } from "dataConstants";
import {
  validateOneQualDenomHigherThanOtherDenomOMS,
  validateOneQualDenomHigherThanOtherDenomPM,
} from ".";

import {
  generatePmQualifierRateData,
  generateOmsQualifierRateData,
  locationDictionary,
  doubleRate,
  simpleRate,
  partialRate,
} from "utils/testUtils/validationHelpers";

describe("Testing Qualifier Denominator Higher Than Other Validation", () => {
  const categories = ["Test Cat 1", "Test Cat 2"];
  const qualifiers = ["Test Qual 1", "Test Qual 2"];
  const singleCat = [SINGLE_CATEGORY];
  const noCat: string[] = [];

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
        doubleRate,
        simpleRate,
      ]);
      const errors = validateOneQualDenomHigherThanOtherDenomPM(data, {
        categories,
        qualifiers,
      });

      expect(errors).toHaveLength(0);
    });

    it("should have error", () => {
      const data = generatePmQualifierRateData({ categories, qualifiers }, [
        simpleRate,
        doubleRate,
      ]);
      const errors = validateOneQualDenomHigherThanOtherDenomPM(data, {
        categories,
        qualifiers,
      });

      expect(errors).toHaveLength(2);
      expect(errors[0].errorLocation).toBe("Performance Measure");
      expect(errors[0].errorMessage).toBe(
        `${qualifiers[1]} denominator must be less than or equal to ${qualifiers[0]} denominator.`
      );
    });

    it("should have error - single category", () => {
      const data = generatePmQualifierRateData(
        { categories: noCat, qualifiers },
        [simpleRate, doubleRate]
      );
      const errors = validateOneQualDenomHigherThanOtherDenomPM(data, {
        categories: noCat,
        qualifiers,
      });

      expect(errors).toHaveLength(1);
      expect(errors[0].errorLocation).toBe("Performance Measure");
      expect(errors[0].errorMessage).toBe(
        `${qualifiers[1]} denominator must be less than or equal to ${qualifiers[0]} denominator.`
      );
    });

    it("should NOT have error from empty rate value ", () => {
      const data = generatePmQualifierRateData({ categories, qualifiers }, [
        partialRate,
        partialRate,
      ]);
      const errors = validateOneQualDenomHigherThanOtherDenomPM(data, {
        categories,
        qualifiers,
      });

      expect(errors).toHaveLength(0);
    });

    it("Error message text should match provided errorMessageFunc", () => {
      const errorMessageFunc = (lowerQual: string, higherQual: string) => {
        return `Another ${lowerQual} bites the ${higherQual}.`;
      };

      const data = generatePmQualifierRateData(
        { categories: noCat, qualifiers },
        [simpleRate, doubleRate]
      );
      const errors = validateOneQualDenomHigherThanOtherDenomPM(
        data,
        {
          categories: noCat,
          qualifiers,
        },
        undefined,
        undefined,
        errorMessageFunc
      );

      expect(errors).toHaveLength(1);
      expect(errors[0].errorLocation).toBe("Performance Measure");
      expect(errors[0].errorMessage).toBe(
        errorMessageFunc(qualifiers[1], qualifiers[0])
      );
    });
  });

  // OMS
  describe("OMS Validation", () => {
    it("should return no errors", () => {
      const data = generateOmsQualifierRateData(categories, qualifiers, [
        doubleRate,
        simpleRate,
      ]);
      const errors = validateOneQualDenomHigherThanOtherDenomOMS()({
        ...baseOMSInfo,
        rateData: data,
      });

      expect(errors).toHaveLength(0);
    });

    it("should return with no error - isOPM", () => {
      const errors = validateOneQualDenomHigherThanOtherDenomOMS()({
        ...baseOMSInfo,
        rateData: {},
        isOPM: true,
      });
      expect(errors).toHaveLength(0);
    });

    it("should not show last string portion when OMS has no categories", () => {
      const data = generateOmsQualifierRateData(singleCat, qualifiers, [
        simpleRate,
        doubleRate,
      ]);
      const errors = validateOneQualDenomHigherThanOtherDenomOMS()({
        ...baseOMSInfo,
        categories: singleCat,
        rateData: data,
      });

      expect(errors).toHaveLength(1);
      expect(errors[0].errorMessage).toBe(
        `${qualifiers?.[1]} denominator must be less than or equal to ${qualifiers?.[0]} denominator.`
      );
    });
  });

  it("Error message text should match provided errorMessageFunc", () => {
    const errorMessageFunc = (lowerQual: string, higherQual: string) => {
      return `Another ${lowerQual} bites the ${higherQual}.`;
    };
    const data = generateOmsQualifierRateData(singleCat, qualifiers, [
      simpleRate,
      doubleRate,
    ]);
    const errors = validateOneQualDenomHigherThanOtherDenomOMS(
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
      errorMessageFunc(qualifiers?.[1], qualifiers?.[0])
    );
  });
});
