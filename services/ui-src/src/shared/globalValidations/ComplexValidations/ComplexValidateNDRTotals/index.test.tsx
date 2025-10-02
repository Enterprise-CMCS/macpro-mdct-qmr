import { ComplexValidateNDRTotalsOMS, ComplexValidateNDRTotals } from ".";
import {
  complexQualifiers,
  complexNDRFormula,
} from "utils/testUtils/validationHelpers";

const qualifierData = [
  {
    id: "Ages18to64",
    label: "Ages 18 to 64",
    value: ["2", "3", "1500.0", "4", "2000.0", "2", "100.0"],
  },
  {
    id: "Total",
    label: "Total (Age 18 and older)",
    value: ["2", "3", "1500.0", "4", "2000.0", "2", "100.0"],
    isTotal: true,
  },
];

const generateRates = () => {
  return qualifierData.map((data) => {
    return {
      fields: complexQualifiers.map((qual, index) => {
        return { label: qual.label, value: data.value[index] };
      }),
      label: data.label,
      isTotal: data.isTotal,
    };
  });
};

const generateOMSRates = () => {
  return {
    Ages18to64: {
      singleCategory: [
        {
          label: qualifierData[0].label,
          fields: complexQualifiers.map((qual, index) => {
            return { label: qual.label, value: qualifierData[0].value[index] };
          }),
        },
      ],
    },
    Total: {
      singleCategory: [
        {
          label: qualifierData[1].label,
          fields: complexQualifiers.map((qual, index) => {
            return { label: qual.label, value: qualifierData[1].value[index] };
          }),
          isTotal: true,
        },
      ],
    },
  };
};

describe("Testing Complex NDR Totals Validation", () => {
  const rates = generateRates();
  const omsRates = generateOMSRates();

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
      errorRates[1].fields[0].value = "5";
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
        `Total Number of Enrollee Months is not equal to the sum of other \"Number of Enrollee Months\" fields in singleCategory section.`
      );
    });
  });
});
