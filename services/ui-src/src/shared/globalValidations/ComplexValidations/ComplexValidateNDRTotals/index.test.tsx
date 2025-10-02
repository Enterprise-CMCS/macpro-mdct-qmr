import { ComplexValidateNDRTotalsOMS, ComplexValidateNDRTotals } from ".";
import {
  complexQualifiers,
  complexNDRFormula,
} from "utils/testUtils/validationHelpers";

describe("Testing Complex NDR Totals Validation", () => {
  const rates = [
    {
      fields: [
        {
          value: "2",
          label: "Number of Enrollee Months",
        },
        {
          value: "3",
          label: "Number of Short-Term Admissions",
        },
        {
          value: "1500.0",
          label: "Short-Term Admissions per 1,000 Enrollee Months",
        },
        {
          value: "4",
          label: "Number of Medium-Term Admissions",
        },
        {
          value: "2000.0",
          label: "Medium-Term Admissions per 1,000 Enrollee Months",
        },
        {
          value: "2",
          label: "Number of Long-Term Admissions",
        },
        {
          value: "1000.0",
          label: "Long-Term Admissions per 1,000 Enrollee Months",
        },
      ],
      label: "Ages 18 to 64",
    },
    {
      label: "Total (Age 18 and older)",
      fields: [
        {
          value: "2",
          label: "Number of Enrollee Months",
        },
        {
          value: 3,
          label: "Number of Short-Term Admissions",
        },
        {
          value: "1500.0",
          label: "Short-Term Admissions per 1,000 Enrollee Months",
        },
        {
          value: 4,
          label: "Number of Medium-Term Admissions",
        },
        {
          value: "2000.0",
          label: "Medium-Term Admissions per 1,000 Enrollee Months",
        },
        {
          value: 2,
          label: "Number of Long-Term Admissions",
        },
        {
          value: "1000.0",
          label: "Long-Term Admissions per 1,000 Enrollee Months",
        },
      ],
      isTotal: true,
    },
  ];

  const omsRates = {
    Total: {
      singleCategory: [
        {
          label: "singleCategory",
          fields: [
            {
              label: "Number of Enrollee Months",
              value: "3",
            },
            {
              label: "Number of Short-Term Admissions",
              value: "3",
            },
            {
              label: "Short-Term Admissions per 1,000 Enrollee Months",
              value: "1000",
            },
            {
              label: "Number of Medium-Term Admissions",
              value: "3",
            },
            {
              label: "Medium-Term Admissions per 1,000 Enrollee Months",
              value: "1000",
            },
            {
              label: "Number of Long-Term Admissions",
              value: "3",
            },
            {
              label: "Long-Term Admissions per 1,000 Enrollee Months",
              value: "1000",
            },
          ],
          isTotal: true,
        },
      ],
    },
    Ages18to64: {
      singleCategory: [
        {
          fields: [
            {
              value: "3",
              label: "Number of Enrollee Months",
            },
            {
              value: "3",
              label: "Number of Short-Term Admissions",
            },
            {
              value: "1000.0",
              label: "Short-Term Admissions per 1,000 Enrollee Months",
            },
            {
              value: "3",
              label: "Number of Medium-Term Admissions",
            },
            {
              value: "1000.0",
              label: "Medium-Term Admissions per 1,000 Enrollee Months",
            },
            {
              value: "3",
              label: "Number of Long-Term Admissions",
            },
            {
              value: "1000.0",
              label: "Long-Term Admissions per 1,000 Enrollee Months",
            },
          ],
          isTotal: true,
          label: "Ages 18 to 64",
        },
      ],
    },
  };

  describe("PM/OPM Validation", () => {
    it("should return NO errors", () => {
      const errors = ComplexValidateNDRTotals(
        [rates],
        complexQualifiers,
        complexNDRFormula
      );
      expect(errors).toHaveLength(0);
    });
    it("should have errors", () => {
      const errorRates = [...rates];
      errorRates[1].fields[0].value = 5;
      const errors = ComplexValidateNDRTotals(
        [errorRates],
        complexQualifiers,
        complexNDRFormula
      );
      expect(errors).toHaveLength(1);
      expect(errors[0].errorLocation).toBe(
        "Performance Measure Total - Number of Enrollee Months"
      );
      expect(errors[0].errorMessage).toBe(
        `Total Number of Enrollee Months is not equal to the sum of other \"Number of Enrollee Months\" fields in Number of Enrollee Months section.`
      );
    });
    it("should have errors when total is not filled when qualifiers are filled", () => {
      const emptyTotalRates = [...rates];
      emptyTotalRates[1].fields.forEach((field) => {
        field.value = "";
      });
      const errors = ComplexValidateNDRTotals(
        [emptyTotalRates],
        complexQualifiers,
        complexNDRFormula
      );
      expect(errors).toHaveLength(1);
      expect(errors[0].errorLocation).toBe(
        "Performance Measure Total - Number of Enrollee Months"
      );
      expect(errors[0].errorMessage).toBe(
        `Total Number of Enrollee Months must contain values if other fields are filled.`
      );
    });
  });

  describe("OMS Validation", () => {
    it("should return NO errors", () => {
      const errors = ComplexValidateNDRTotalsOMS(
        omsRates,
        [],
        complexNDRFormula,
        `Optional Measure Stratification: Total`
      );
      expect(errors).toHaveLength(0);
    });
    it("should have errors, no categories", () => {
      omsRates.Total.singleCategory[0].fields[0].value = "1";
      const errors = ComplexValidateNDRTotalsOMS(
        omsRates,
        [],
        complexNDRFormula,
        `Optional Measure Stratification: Total`
      );
      expect(errors).toHaveLength(1);
      expect(errors[0].errorLocation).toBe(
        "Optional Measure Stratification: Total - "
      );
      expect(errors[0].errorMessage).toBe(
        `Total Number of Enrollee Months is not equal to the sum of other \"Number of Enrollee Months\" fields in  section.`
      );
    });
    it("should have errors, with categories", () => {
      omsRates.Total.singleCategory[0].fields[0].value = "1";
      const errors = ComplexValidateNDRTotalsOMS(
        omsRates,
        [
          {
            id: "singleCategory",
            label: "singleCategory",
            text: "singleCategory",
          },
        ],
        complexNDRFormula,
        `Optional Measure Stratification: Total`
      );
      expect(errors).toHaveLength(1);
      expect(errors[0].errorLocation).toBe(
        "Optional Measure Stratification: Total - singleCategory"
      );
      expect(errors[0].errorMessage).toBe(
        `Total Number of Enrollee Months is not equal to the sum of other \"Number of Enrollee Months\" fields in singleCategory section..`
      );
    });
  });
});
