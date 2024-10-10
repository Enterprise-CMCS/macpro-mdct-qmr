import * as DC from "dataConstants";
import { validateRateZeroOMS, validateRateZeroPM } from ".";
import { testFormData } from "./../testHelpers/_testFormData";

import {
  generateOmsQualifierRateData,
  locationDictionary,
  manualNonZeroRate,
  simpleRate,
  partialRate,
  generateOtherPerformanceMeasureData,
} from "utils/testUtils/validationHelpers";

describe("Testing Non-Zero/No Zero Numerator/Rate Validation", () => {
  const categories = [
    { label: "Test Cat 1", text: "Test Cat 1", id: "Test Cat 1" },
    { label: "Test Cat 2", text: "Test Cat 2", id: "Test Cat 2" },
  ];
  const qualifiers = [
    { label: "Test Qual 1", text: "Test Qual 1", id: "Test Qual 1" },
    { label: "Test Qual 2", text: "Test Qual 2", id: "Test Qual 2" },
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
      const errors = validateRateZeroPM(
        [[simpleRate, simpleRate]],
        undefined,
        qualifiers,
        { ...testFormData }
      );

      expect(errors).toHaveLength(0);
    });

    it("should have error for zero numerator but rate non-zero", () => {
      const errors = validateRateZeroPM(
        [
          [manualNonZeroRate, manualNonZeroRate],
          [manualNonZeroRate, manualNonZeroRate],
        ],
        undefined,
        qualifiers,
        { ...testFormData }
      );

      expect(errors).toHaveLength(1);
      expect(errors[0].errorLocation).toBe(
        `Performance Measure/Other Performance Measure`
      );
      expect(errors[0].errorMessage).toBe(
        "Manually entered rate should be 0 if numerator is 0"
      );
    });

    it("should have error for zero numerator but rate non-zero - OPM", () => {
      const errors = validateRateZeroPM(
        [],
        generateOtherPerformanceMeasureData([
          manualNonZeroRate,
          manualNonZeroRate,
          manualNonZeroRate,
        ]),
        qualifiers,
        { ...testFormData }
      );

      expect(errors).toHaveLength(1);
      expect(errors[0].errorLocation).toBe(
        `Performance Measure/Other Performance Measure`
      );
      expect(errors[0].errorMessage).toBe(
        "Manually entered rate should be 0 if numerator is 0"
      );
    });

    it("should have NO error for zero numerator but rate non-zero - Hybrid", () => {
      const errors = validateRateZeroPM(
        [],
        generateOtherPerformanceMeasureData([
          manualNonZeroRate,
          manualNonZeroRate,
          manualNonZeroRate,
        ]),
        qualifiers,
        {
          ...testFormData,
          DataSource: [DC.HYBRID_ADMINSTRATIVE_AND_MEDICAL_RECORDS_DATA],
        }
      );

      expect(errors).toHaveLength(0);
    });

    it("should NOT have error from empty rate value", () => {
      const errors = validateRateZeroPM(
        [
          [partialRate, partialRate],
          [partialRate, partialRate],
        ],
        undefined,
        qualifiers,
        testFormData
      );

      expect(errors).toHaveLength(0);
    });

    it("Error message text should match provided errorMessage", () => {
      const errorMessage = "Another one bites the dust.";
      const errors = validateRateZeroPM(
        [
          [manualNonZeroRate, manualNonZeroRate],
          [manualNonZeroRate, manualNonZeroRate],
        ],
        undefined,
        qualifiers,
        { ...testFormData },
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
    it("should return NO errors", () => {
      const data = generateOmsQualifierRateData(categories, qualifiers, [
        simpleRate,
        simpleRate,
      ]);
      const errors = [
        ...validateRateZeroOMS()({
          ...baseOMSInfo,
          rateData: data,
        }),
        ...validateRateZeroOMS()({
          ...baseOMSInfo,
          rateData: data,
        }),
      ];

      expect(errors).toHaveLength(0);
    });

    it("should have error for zero rate but numerator non-zero", () => {
      const data = generateOmsQualifierRateData(categories, qualifiers, [
        manualNonZeroRate,
        manualNonZeroRate,
      ]);
      const errors = validateRateZeroOMS()({
        ...baseOMSInfo,
        rateData: data,
      });

      expect(errors).toHaveLength(1);
      expect(errors[0].errorLocation).toContain(
        "Optional Measure Stratification: TestLabel"
      );
      expect(errors[0].errorMessage).toBe(
        "Manually entered rate should be 0 if numerator is 0"
      );
    });
  });

  it("Error message text should match provided errorMessage", () => {
    const errorMessage = "Another one bites the dust.";
    const data = generateOmsQualifierRateData(categories, qualifiers, [
      manualNonZeroRate,
      manualNonZeroRate,
    ]);
    const errors = validateRateZeroOMS(errorMessage)({
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
