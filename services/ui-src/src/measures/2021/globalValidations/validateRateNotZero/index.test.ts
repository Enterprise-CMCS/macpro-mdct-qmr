import { LabelData } from "utils";
import { validateRateNotZeroOMS, validateRateNotZeroPM } from ".";
import {
  generateOmsQualifierRateData,
  locationDictionary,
  manualZeroRate,
  manualNonZeroRate,
  simpleRate,
  partialRate,
  generateOtherPerformanceMeasureData,
} from "utils/testUtils/2023/validationHelpers";

describe("Testing Non-Zero/No Zero Numerator/Rate Validation", () => {
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
      const errors = validateRateNotZeroPM(
        [[simpleRate, simpleRate]],
        undefined,
        qualifiers
      );

      expect(errors).toHaveLength(0);
    });

    it("should have NO error for zero numerator but rate non-zero - Hybrid", () => {
      const errors = validateRateNotZeroPM(
        [],
        generateOtherPerformanceMeasureData([
          manualNonZeroRate,
          manualNonZeroRate,
          manualNonZeroRate,
        ]),
        qualifiers
      );

      expect(errors).toHaveLength(0);
    });

    it("should have error for zero rate but numerator non-zero", () => {
      const errors = validateRateNotZeroPM(
        [
          [manualZeroRate, manualZeroRate],
          [manualZeroRate, manualZeroRate],
        ],
        undefined,
        qualifiers
      );

      expect(errors).toHaveLength(1);
      expect(errors[0].errorLocation).toBe(
        `Performance Measure/Other Performance Measure`
      );
      expect(errors[0].errorMessage).toBe(
        "Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
      );
    });

    it("should have error for zero rate but numerator non-zero - OPM", () => {
      const errors = validateRateNotZeroPM(
        [],
        generateOtherPerformanceMeasureData([
          manualZeroRate,
          manualZeroRate,
          manualZeroRate,
        ]),
        qualifiers
      );

      expect(errors).toHaveLength(1);
      expect(errors[0].errorLocation).toBe(
        `Performance Measure/Other Performance Measure`
      );
      expect(errors[0].errorMessage).toBe(
        "Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
      );
    });

    it("should NOT have error from empty rate value", () => {
      const errors = validateRateNotZeroPM(
        [
          [partialRate, partialRate],
          [partialRate, partialRate],
        ],
        undefined,
        qualifiers
      );

      expect(errors).toHaveLength(0);
    });

    it("Error message text should match provided errorMessage", () => {
      const errorMessage = "Another one bites the dust.";
      const errors = validateRateNotZeroPM(
        [
          [manualZeroRate, manualZeroRate],
          [manualZeroRate, manualZeroRate],
        ],
        undefined,
        qualifiers,
        errorMessage
      );

      expect(errors).toHaveLength(1);
      expect(errors[0].errorLocation).toBe(
        `Performance Measure/Other Performance Measure`
      );
      expect(errors[0].errorMessage).toBe(errorMessage);
    });
  });

  // OMS
  describe("OMS Validation", () => {
    it("should have error for zero numerator but rate non-zero", () => {
      const data = generateOmsQualifierRateData(categories, qualifiers, [
        manualZeroRate,
        manualZeroRate,
      ]);
      const errors = validateRateNotZeroOMS()({
        ...baseOMSInfo,
        rateData: data,
      });

      expect(errors).toHaveLength(1);
      expect(errors[0].errorLocation).toContain(
        "Optional Measure Stratification: TestLabel"
      );
      expect(errors[0].errorMessage).toBe(
        "Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
      );
    });
  });

  it("Error message text should match provided errorMessage", () => {
    const errorMessage = "Another one bites the dust.";
    const data = generateOmsQualifierRateData(categories, qualifiers, [
      manualZeroRate,
      manualZeroRate,
    ]);
    const errors = validateRateNotZeroOMS(errorMessage)({
      ...baseOMSInfo,
      rateData: data,
    });

    expect(errors).toHaveLength(1);
    expect(errors[0].errorLocation).toContain(
      "Optional Measure Stratification: TestLabel"
    );
    expect(errors[0].errorMessage).toBe(errorMessage);
  });
});
