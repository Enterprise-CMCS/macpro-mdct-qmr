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
import { LabelData } from "utils";

describe("Testing Qualifier Denominator Higher Than Other Validation", () => {
  const categories = [
    { label: "TestCat1", text: "TestCat1", id: "TestCat1" },
    { label: "TestCat2", text: "TestCat2", id: "TestCat2" },
  ];
  const qualifiers = [
    { label: "TestQual1", text: "TestQual1", id: "TestQual1" },
    { label: "TestQual2", text: "TestQual2", id: "TestQual2" },
  ];
  const singleCat = [
    { label: SINGLE_CATEGORY, text: SINGLE_CATEGORY, id: SINGLE_CATEGORY },
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
        `${qualifiers[1].label} denominator must be less than or equal to ${qualifiers[0].label} denominator.`
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
        `${qualifiers[1].label} denominator must be less than or equal to ${qualifiers[0].label} denominator.`
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
        errorMessageFunc(qualifiers[1].label, qualifiers[0].label)
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
        `${qualifiers?.[1].label} denominator must be less than or equal to ${qualifiers?.[0].label} denominator.`
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
      errorMessageFunc(qualifiers?.[1].label, qualifiers?.[0].label)
    );
  });
});
