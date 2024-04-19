import { LabelData } from "utils";
import { validateTotalNDR, validateOMSTotalNDR } from ".";

import * as VH from "utils/testUtils/validationHelpers";

describe("Testing PM/OMS Total Validations", () => {
  describe("PM validation", () => {
    it("should return no errors", () => {
      const basePM = [VH.simpleRate, VH.simpleRate, VH.doubleRate];
      const singleResult = validateTotalNDR([basePM]);
      const multiResults = validateTotalNDR([basePM, basePM, basePM]);

      expect(singleResult.length).toBe(0);
      expect(multiResults.length).toBe(0);
    });

    it("should return numerator error", () => {
      const basePM = [VH.simpleRate, VH.simpleRate, VH.incorrectNumeratorRate];
      const singleResults = validateTotalNDR([basePM]);
      const multiResults = validateTotalNDR([basePM, basePM, basePM]);

      expect(singleResults.length).toBe(1);
      expect(multiResults.length).toBe(3);
      for (const result of [...singleResults, ...multiResults]) {
        expect(result.errorLocation).toBe("Performance Measure");
        expect(result.errorMessage).toBe(
          `${VH.incorrectNumeratorRate.label} numerator field is not equal to the sum of other numerators.`
        );
      }
    });

    it("should return denominator error", () => {
      const basePM = [
        VH.simpleRate,
        VH.simpleRate,
        VH.incorrectDenominatorRate,
      ];
      const singleResults = validateTotalNDR([basePM]);
      const multiResults = validateTotalNDR([basePM, basePM, basePM]);

      expect(singleResults.length).toBe(1);
      expect(multiResults.length).toBe(3);
      for (const result of [...singleResults, ...multiResults]) {
        expect(result.errorLocation).toBe("Performance Measure");
        expect(result.errorMessage).toBe(
          `${VH.incorrectDenominatorRate.label} denominator field is not equal to the sum of other denominators.`
        );
      }
    });

    it("should return field empty error", () => {
      const basePM = [VH.simpleRate, VH.simpleRate, VH.emptyRate];

      // single PM check
      const singleResults = validateTotalNDR([basePM]);
      const multiResults = validateTotalNDR([basePM, basePM, basePM]);

      expect(singleResults.length).toBe(1);
      expect(multiResults.length).toBe(3);
      for (const result of [...singleResults, ...multiResults]) {
        expect(result.errorLocation).toBe("Performance Measure");
        expect(result.errorMessage).toBe(
          `${VH.emptyRate.label} must contain values if other fields are filled.`
        );
      }
    });

    it("should return no errors for partial state", () => {
      const basePM = [VH.partialRate, VH.simpleRate, VH.simpleRate];
      const singleResult = validateTotalNDR([basePM]);
      const multiResults = validateTotalNDR([basePM, basePM, basePM]);

      expect(singleResult.length).toBe(0);
      expect(multiResults.length).toBe(0);
    });

    it("Error message text should match provided errorMessageFunc", () => {
      const errorMessageFunc = (qualifier: string, fieldType: string) => {
        return `Another ${qualifier} bites the ${fieldType}.`;
      };

      const basePM = [
        VH.simpleRate,
        VH.simpleRate,
        VH.incorrectDenominatorRate,
      ];
      const singleResults = validateTotalNDR(
        [basePM],
        undefined,
        undefined,
        errorMessageFunc
      );
      const multiResults = validateTotalNDR(
        [basePM, basePM, basePM],
        undefined,
        undefined,
        errorMessageFunc
      );

      expect(singleResults.length).toBe(1);
      expect(multiResults.length).toBe(3);
      for (const result of [...singleResults, ...multiResults]) {
        expect(result.errorLocation).toBe("Performance Measure");
        expect(result.errorMessage).toBe(
          errorMessageFunc(VH.incorrectDenominatorRate.label!, "Denominator")
        );
      }
    });
  });

  describe("OMS validation", () => {
    const label = ["TestLabel"];
    const noCategories: LabelData[] = [
      { id: "singleCategory", label: "singleCategory", text: "singleCategory" },
    ];
    const categories: LabelData[] = [
      { id: "test1", label: "test1", text: "test1" },
      { id: "test2", label: "test2", text: "test2" },
      { id: "test3", label: "test3", text: "test3" },
    ];
    const qualifiers: LabelData[] = [
      { id: "test1", label: "test1", text: "test1" },
      { id: "test2", label: "test2", text: "test2" },
      { id: "testTotal", label: "testTotal", text: "testTotal" },
    ];

    const locationDictionary = (s: string[]) => {
      return s[0];
    };

    const baseMultiFunctionInfo = {
      label,
      categories,
      qualifiers,
      locationDictionary,
      rateData: {},
      isOPM: false,
    };
    const baseSingleFunctionInfo = {
      label,
      categories: noCategories,
      qualifiers,
      locationDictionary,
      rateData: {},
      isOPM: false,
    };

    it("should stop if this is OPM", () => {
      const results = validateOMSTotalNDR()({
        ...baseSingleFunctionInfo,
        isOPM: true,
      });

      expect(results.length).toBe(0);
    });

    it("should return no errors", () => {
      const basePMData = [VH.simpleRate, VH.simpleRate, VH.doubleRate];

      const singleResult = validateOMSTotalNDR()({
        ...baseSingleFunctionInfo,
        rateData: VH.generateOmsQualifierRateData(
          noCategories,
          qualifiers,
          basePMData
        ),
      });
      const multiResults = validateOMSTotalNDR()({
        ...baseMultiFunctionInfo,
        rateData: VH.generateOmsQualifierRateData(
          categories,
          qualifiers,
          basePMData
        ),
      });

      expect(singleResult.length).toBe(0);
      expect(multiResults.length).toBe(0);
    });

    it("should return numerator error", () => {
      const basePMData = [
        VH.simpleRate,
        VH.simpleRate,
        VH.incorrectNumeratorRate,
      ];

      const singleResults = validateOMSTotalNDR()({
        ...baseSingleFunctionInfo,
        rateData: VH.generateOmsQualifierRateData(
          noCategories,
          qualifiers,
          basePMData
        ),
      });
      const multiResults = validateOMSTotalNDR()({
        ...baseMultiFunctionInfo,
        rateData: VH.generateOmsQualifierRateData(
          categories,
          qualifiers,
          basePMData
        ),
      });

      expect(singleResults.length).toBe(1);
      expect(multiResults.length).toBe(3);
      for (const error of [...singleResults, ...multiResults]) {
        expect(error.errorLocation).toBe(
          "Optional Measure Stratification: TestLabel"
        );
        expect(error.errorMessage).toBe(
          "Total numerator field is not equal to the sum of other numerators."
        );
      }
    });

    it("should return denominator error", () => {
      const basePMData = [
        VH.simpleRate,
        VH.simpleRate,
        VH.incorrectDenominatorRate,
      ];

      const singleResults = validateOMSTotalNDR()({
        ...baseSingleFunctionInfo,
        rateData: VH.generateOmsQualifierRateData(
          noCategories,
          qualifiers,
          basePMData
        ),
      });
      const multiResults = validateOMSTotalNDR()({
        ...baseMultiFunctionInfo,
        rateData: VH.generateOmsQualifierRateData(
          categories,
          qualifiers,
          basePMData
        ),
      });

      expect(singleResults.length).toBe(1);
      expect(multiResults.length).toBe(3);
      for (const error of [...singleResults, ...multiResults]) {
        expect(error.errorLocation).toBe(
          "Optional Measure Stratification: TestLabel"
        );
        expect(error.errorMessage).toBe(
          "Total denominator field is not equal to the sum of other denominators."
        );
      }
    });

    it("should return field empty error", () => {
      const basePMData = [VH.simpleRate, VH.simpleRate, VH.emptyRate];

      const singleResults = validateOMSTotalNDR()({
        ...baseSingleFunctionInfo,
        rateData: VH.generateOmsQualifierRateData(
          noCategories,
          qualifiers,
          basePMData
        ),
      });
      const multiResults = validateOMSTotalNDR()({
        ...baseMultiFunctionInfo,
        rateData: VH.generateOmsQualifierRateData(
          categories,
          qualifiers,
          basePMData
        ),
      });

      expect(singleResults.length).toBe(1);
      expect(multiResults.length).toBe(3);
      for (const error of [...singleResults, ...multiResults]) {
        expect(error.errorLocation).toBe(
          "Optional Measure Stratification: TestLabel"
        );
        expect(error.errorMessage).toBe(
          "Total must contain values if other fields are filled."
        );
      }
    });

    it("should return no errors for a partial state", () => {
      const basePMData = [VH.partialRate, VH.simpleRate, VH.simpleRate];

      const singleResult = validateOMSTotalNDR()({
        ...baseSingleFunctionInfo,
        rateData: VH.generateOmsQualifierRateData(
          noCategories,
          qualifiers,
          basePMData
        ),
      });
      const multiResults = validateOMSTotalNDR()({
        ...baseMultiFunctionInfo,
        rateData: VH.generateOmsQualifierRateData(
          categories,
          qualifiers,
          basePMData
        ),
      });

      expect(singleResult.length).toBe(0);
      expect(multiResults.length).toBe(0);
    });

    it("Error message text should match provided errorMessageFunc", () => {
      const errorMessageFunc = (fieldType: string, totalLabel?: string) => {
        return `Another ${fieldType} bites the ${totalLabel ?? ""}.`;
      };

      const basePMData = [
        VH.simpleRate,
        VH.simpleRate,
        VH.incorrectNumeratorRate,
      ];

      const singleResults = validateOMSTotalNDR(errorMessageFunc)({
        ...baseSingleFunctionInfo,
        rateData: VH.generateOmsQualifierRateData(
          noCategories,
          qualifiers,
          basePMData
        ),
      });
      const multiResults = validateOMSTotalNDR(errorMessageFunc)({
        ...baseMultiFunctionInfo,
        rateData: VH.generateOmsQualifierRateData(
          categories,
          qualifiers,
          basePMData
        ),
      });

      expect(singleResults.length).toBe(1);
      expect(multiResults.length).toBe(3);
      for (const error of [...singleResults, ...multiResults]) {
        expect(error.errorLocation).toBe(
          "Optional Measure Stratification: TestLabel"
        );
        expect(error.errorMessage).toBe(
          errorMessageFunc("numerator", undefined)
        );
      }
      for (const result of [...singleResults, ...multiResults]) {
        expect(result.errorLocation).toBe(
          "Optional Measure Stratification: TestLabel"
        );
        expect(result.errorMessage).toBe(
          errorMessageFunc("numerator", undefined)
        );
      }
    });
  });
});
