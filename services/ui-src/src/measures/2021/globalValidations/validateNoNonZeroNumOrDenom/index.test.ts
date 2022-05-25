import * as DC from "dataConstants";
import {
  validateRateZeroOMS,
  validateRateNotZeroOMS,
  validateNoNonZeroNumOrDenomPM,
} from "./index";

import { testFormData } from "../testHelpers/_testFormData";

import {
  generateOmsQualifierRateData,
  locationDictionary,
  manualZeroRate,
  manualNonZeroRate,
  simpleRate,
  partialRate,
  generateOtherPerformanceMeasureData,
} from "utils/testUtils/validationHelpers";

describe("Testing Non-Zero/No Zero Numerator/Rate Validation", () => {
  const categories = ["Test Cat 1", "Test Cat 2"];
  const qualifiers = ["Test Qual 1", "Test Qual 2"];

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
      const errors = validateNoNonZeroNumOrDenomPM(
        [[simpleRate, simpleRate]],
        undefined,
        qualifiers,
        { ...testFormData }
      );

      expect(errors).toHaveLength(0);
    });

    it("should have error for zero numerator but rate non-zero", () => {
      const errors = validateNoNonZeroNumOrDenomPM(
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
      const errors = validateNoNonZeroNumOrDenomPM(
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
      const errors = validateNoNonZeroNumOrDenomPM(
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

    it("should have error for zero rate but numerator non-zero", () => {
      const errors = validateNoNonZeroNumOrDenomPM(
        [
          [manualZeroRate, manualZeroRate],
          [manualZeroRate, manualZeroRate],
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
        "Rate should not be 0 if numerator and denominator are not 0. If the calculated rate is less than 0.5, disregard this validation."
      );
    });

    it("should have error for zero rate but numerator non-zero - OPM", () => {
      const errors = validateNoNonZeroNumOrDenomPM(
        [],
        generateOtherPerformanceMeasureData([
          manualZeroRate,
          manualZeroRate,
          manualZeroRate,
        ]),
        qualifiers,
        { ...testFormData }
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
      const errors = validateNoNonZeroNumOrDenomPM(
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
  });

  // OMS
  describe("OMS Validation", () => {
    it("should return NO errors", () => {
      const data = generateOmsQualifierRateData(categories, qualifiers, [
        simpleRate,
        simpleRate,
      ]);
      const errors = [
        ...validateRateZeroOMS({
          ...baseOMSInfo,
          rateData: data,
        }),
        ...validateRateZeroOMS({
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
      const errors = validateRateZeroOMS({
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

    it("should have error for zero numerator but rate non-zero", () => {
      const data = generateOmsQualifierRateData(categories, qualifiers, [
        manualZeroRate,
        manualZeroRate,
      ]);
      const errors = validateRateNotZeroOMS({
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
});
