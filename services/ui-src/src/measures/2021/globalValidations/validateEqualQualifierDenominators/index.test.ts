import { LabelData } from "utils";
import {
  validateEqualQualifierDenominatorsOMS,
  validateEqualQualifierDenominatorsPM,
} from ".";

import {
  generateOmsCategoryRateData,
  locationDictionary,
  doubleRate,
  simpleRate,
  partialRate,
} from "utils/testUtils/validationHelpers";

jest.mock("utils/getLabelText", () => ({
  isLegacyLabel: () => true,
}));

describe("Testing Equal Qualifier Denominators Across Category Validation", () => {
  const categories: LabelData[] = [
    { id: "Test Cat 1", label: "Test Cat 1", text: "Test Cat 1" },
    { id: "Test Cat 2", label: "Test Cat 2", text: "Test Cat 2" },
  ];
  const qualifiers: LabelData[] = [
    { id: "Test Qual 1", label: "Test Qual 1", text: "Test Qual 1" },
    { id: "Test Qual 2", label: "Test Qual 2", text: "Test Qual 2" },
  ];
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
      const errors = validateEqualQualifierDenominatorsPM(
        [[simpleRate, simpleRate]],
        qualifiers
      );

      expect(errors).toHaveLength(0);
    });

    it("should have error", () => {
      const errors = validateEqualQualifierDenominatorsPM(
        [
          [simpleRate, simpleRate],
          [doubleRate, doubleRate],
        ],
        qualifiers
      );

      expect(errors).toHaveLength(2);
      expect(errors[0].errorLocation).toBe("Performance Measure");
      expect(errors[0].errorMessage).toBe(
        `Denominators must be the same for each category of performance measures for ${qualifiers[0].label}`
      );
    });

    it("should NOT have error from empty rate value", () => {
      const errors = validateEqualQualifierDenominatorsPM(
        [
          [partialRate, partialRate],
          [partialRate, partialRate],
        ],
        qualifiers
      );

      expect(errors).toHaveLength(0);
    });

    it("Error message text should match provided errorMessage", () => {
      const errorMessage = "Another one bites the dust";
      const errorArray = validateEqualQualifierDenominatorsPM(
        [
          [simpleRate, simpleRate],
          [doubleRate, doubleRate],
        ],
        qualifiers,
        errorMessage
      );

      expect(errorArray).toHaveLength(2);
      expect(errorArray[0].errorMessage).toBe(errorMessage);
      expect(errorArray[1].errorMessage).toBe(errorMessage);
    });

    it("Error message text should match provided errorMessageFunc", () => {
      const errorMessageFunc = (qualifier: string) => {
        return `Another ${qualifier} bites the dust.`;
      };
      const errorArray = validateEqualQualifierDenominatorsPM(
        [
          [simpleRate, simpleRate],
          [doubleRate, doubleRate],
        ],
        qualifiers,
        undefined,
        errorMessageFunc
      );

      expect(errorArray).toHaveLength(2);
      expect(errorArray[0].errorMessage).toBe(
        errorMessageFunc(qualifiers[0].label)
      );
      expect(errorArray[1].errorMessage).toBe(
        errorMessageFunc(qualifiers[1].label)
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
      const errors = validateEqualQualifierDenominatorsOMS()({
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
      const errors = validateEqualQualifierDenominatorsOMS()({
        ...baseOMSInfo,
        rateData: data,
        isOPM: true,
      });

      expect(errors).toHaveLength(0);
    });

    it("should have errors", () => {
      const locationDictionaryJestFunc = jest.fn();
      const data = generateOmsCategoryRateData(categories, qualifiers, [
        simpleRate,
        doubleRate,
      ]);
      const errors = validateEqualQualifierDenominatorsOMS()({
        ...baseOMSInfo,
        locationDictionary: locationDictionaryJestFunc,
        rateData: data,
      });

      expect(errors).toHaveLength(2);
      expect(errors[0].errorLocation).toContain(
        "Optional Measure Stratification:"
      );
      expect(locationDictionaryJestFunc).toHaveBeenCalledWith([
        "TestLabel",
        qualifiers[0].label,
      ]);
    });
  });

  it("Error message text should match provided errorMessage", () => {
    const locationDictionaryJestFunc = jest.fn();
    const errorMessage = "Another one bites the dust";
    const data = generateOmsCategoryRateData(categories, qualifiers, [
      simpleRate,
      doubleRate,
    ]);
    const errors = validateEqualQualifierDenominatorsOMS(errorMessage)({
      ...baseOMSInfo,
      locationDictionary: locationDictionaryJestFunc,
      rateData: data,
    });

    expect(errors).toHaveLength(2);
    expect(errors[0].errorLocation).toContain(
      "Optional Measure Stratification:"
    );
    expect(errors[0].errorMessage).toBe(errorMessage);
  });
});
